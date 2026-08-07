const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.JWT_SECRET || "stayinsight_secret_key_week8";
const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  if (!fs.existsSync(REVIEWS_FILE)) fs.writeFileSync(REVIEWS_FILE, JSON.stringify([]));
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8") || "[]");
  } catch (e) {
    return [];
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// CORS setup
const rawOrigins = (process.env.CORS_ALLOWED_ORIGINS || "http://localhost:5173").split(",").map(s => s.trim()).filter(Boolean);

function originAllowed(origin) {
  if (!origin) return true; // non-browser clients
  if (origin.includes("vercel.app") || origin.includes("localhost") || origin.includes("127.0.0.1")) return true;
  for (const o of rawOrigins) {
    if (o.includes("*")) {
      const regex = new RegExp("^" + o.replace(/\*/g, ".*").replace(/https?:\/\//, "(https?:\\/\\/)") + "$", "i");
      if (regex.test(origin)) return true;
    } else if (o === origin) {
      return true;
    }
  }
  return false;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} | Origin: ${req.headers.origin || "No Origin"}`);
  next();
});

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && originAllowed(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  }
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Simple persistence backed by JSON files (keeps repo self-contained)
ensureDataFiles();

function seedDemo() {
  const users = readJson(USERS_FILE);
  if (!users.find(u => u.email === "demo@stayinsight.ai")) {
    const hashed = bcrypt.hashSync("demo12345", 10);
    users.push({ id: 1, email: "demo@stayinsight.ai", hashed_password: hashed, created_at: new Date().toISOString() });
    writeJson(USERS_FILE, users);
  }

  const reviews = readJson(REVIEWS_FILE);
  if (!reviews || reviews.length === 0) {
    const sample = [
      { id: 1, guest: "Harshita Sharma", review: "Loved the ambient lighting, super clean room, and helpful concierge service!", sentiment: "Positive" },
      { id: 2, guest: "Aryan Verma", review: "Great central location near major attractions and very quick room service.", sentiment: "Positive" },
      { id: 3, guest: "Sarah Jenkins", review: "Great host, spotlessly clean rooms, and beautiful mountain view location!", sentiment: "Positive" },
    ];
    writeJson(REVIEWS_FILE, sample);
  }
}

seedDemo();

function generateToken(email) {
  return jwt.sign({ sub: email }, SECRET_KEY, { expiresIn: '30m' });
}

function verifyTokenFromHeader(req) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth) return null;
  const parts = auth.split(' ');
  if (parts.length !== 2) return null;
  const token = parts[1];
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload.sub;
  } catch (e) {
    return null;
  }
}

app.get('/', (req, res) => res.json({ message: 'StayInsight AI API', status: 'ok' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Register
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ detail: 'email and password required' });
  const users = readJson(USERS_FILE);
  if (users.find(u => u.email === email)) return res.status(400).json({ detail: 'Email already registered' });
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const hashed = bcrypt.hashSync(password, 10);
  const user = { id, email, hashed_password: hashed, created_at: new Date().toISOString() };
  users.push(user);
  writeJson(USERS_FILE, users);
  return res.status(201).json({ id: user.id, email: user.email });
});

// Login (supports form-encoded and JSON)
app.post('/login', (req, res) => {
  const username = req.body.username || req.body.email;
  const password = req.body.password;
  if (!username || !password) return res.status(400).json({ detail: 'username and password required' });
  const users = readJson(USERS_FILE);
  const user = users.find(u => u.email === username);
  if (!user) return res.status(401).json({ detail: 'Invalid email or password' });
  if (!bcrypt.compareSync(password, user.hashed_password)) return res.status(401).json({ detail: 'Invalid email or password' });
  const token = generateToken(user.email);
  return res.json({ access_token: token, token_type: 'bearer' });
});

// Get current user
app.get('/users/me', (req, res) => {
  const email = verifyTokenFromHeader(req);
  if (!email) return res.status(401).json({ detail: 'Unauthorized' });
  const users = readJson(USERS_FILE);
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ detail: 'User not found' });
  return res.json({ id: user.id, email: user.email });
});

// Reviews
app.get('/reviews', (req, res) => {
  const email = verifyTokenFromHeader(req);
  if (!email) return res.status(401).json({ detail: 'Unauthorized' });
  const reviews = readJson(REVIEWS_FILE);
  return res.json(reviews);
});

app.get('/reviews/stats', (req, res) => {
  const email = verifyTokenFromHeader(req);
  if (!email) return res.status(401).json({ detail: 'Unauthorized' });
  const reviews = readJson(REVIEWS_FILE);
  const total = reviews.length;
  const pos = reviews.filter(r => r.sentiment && r.sentiment.toLowerCase() === 'positive').length;
  const neu = reviews.filter(r => r.sentiment && r.sentiment.toLowerCase() === 'neutral').length;
  const neg = reviews.filter(r => r.sentiment && r.sentiment.toLowerCase() === 'negative').length;
  const recs = [];
  if (neg > 0) recs.push('Address room check-in speed and AC climate control based on recent negative feedback.');
  if (neu > 0) recs.push('Upgrade breakfast options and enhance soundproofing in street-facing rooms.');
  if (pos > 0) recs.push('Highlight host hospitality and scenic views in promotional marketing.');
  if (!recs.length) recs.push('Maintain high guest satisfaction and encourage more guest reviews.');
  return res.json({ total_reviews: total, positive_reviews: pos, neutral_reviews: neu, negative_reviews: neg, themes: ['Host','Location','Cleanliness','Food','Service','Comfort'], ai_recommendations: recs });
});

app.post('/reviews', (req, res) => {
  const email = verifyTokenFromHeader(req);
  if (!email) return res.status(401).json({ detail: 'Unauthorized' });
  const { guest, review, sentiment } = req.body;
  if (!guest || !review || !sentiment) return res.status(400).json({ detail: 'guest, review and sentiment required' });
  const reviews = readJson(REVIEWS_FILE);
  const id = reviews.length ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
  const entry = { id, guest, review, sentiment };
  reviews.unshift(entry);
  writeJson(REVIEWS_FILE, reviews);
  return res.status(201).json(entry);
});

app.put('/reviews/:id', (req, res) => {
  const email = verifyTokenFromHeader(req);
  if (!email) return res.status(401).json({ detail: 'Unauthorized' });
  const id = Number(req.params.id);
  const { guest, review, sentiment } = req.body;
  const reviews = readJson(REVIEWS_FILE);
  const idx = reviews.findIndex(r => r.id === id);
  if (idx === -1) return res.status(404).json({ detail: 'Review not found' });
  reviews[idx] = { id, guest, review, sentiment };
  writeJson(REVIEWS_FILE, reviews);
  return res.json(reviews[idx]);
});

app.delete('/reviews/:id', (req, res) => {
  const email = verifyTokenFromHeader(req);
  if (!email) return res.status(401).json({ detail: 'Unauthorized' });
  const id = Number(req.params.id);
  let reviews = readJson(REVIEWS_FILE);
  const idx = reviews.findIndex(r => r.id === id);
  if (idx === -1) return res.status(404).json({ detail: 'Review not found' });
  reviews = reviews.filter(r => r.id !== id);
  writeJson(REVIEWS_FILE, reviews);
  return res.status(204).send();
});

// Simple AI analyze heuristic
function analyzeText(review_text) {
  const text = (review_text || '').toLowerCase();
  const positive = ["excellent","great","amazing","wonderful","perfect","love","friendly","clean","quick","helpful"];
  const negative = ["bad","poor","slow","late","noisy","dirty","small","worst","problem","delay"];
  const score = positive.reduce((acc,w)=> acc + (text.includes(w)?1:0),0) - negative.reduce((acc,w)=> acc + (text.includes(w)?1:0),0);
  let sentiment = 'Neutral'; if (score>=1) sentiment='Positive'; else if (score<=-1) sentiment='Negative';
  const sentiment_score = Math.min(Math.max(0.5 + score*0.15,0.0),1.0);
  const theme_keywords = { Cleanliness:['clean','dirty','spotless','messy'], Service:['service','staff','concierge','helpful','friendly'], Location:['location','near','central','area','street'], Food:['breakfast','food','restaurant','dining'], Comfort:['comfortable','cozy','bed','room','ac'] };
  const themes = Object.keys(theme_keywords).filter(t => theme_keywords[t].some(k => text.includes(k)));
  if (!themes.length) themes.push('Overall');
  const recommendations = [];
  if (sentiment==='Positive') recommendations.push('Keep highlighting guest service and room quality in your messaging.');
  if (sentiment==='Negative') recommendations.push('Investigate recurring issues in service, cleanliness, or amenities immediately.');
  if (sentiment==='Neutral') recommendations.push('Monitor guest feedback for recurring improvement opportunities.');
  if (themes.includes('Location')) recommendations.push('Promote proximity to local attractions and transportation.');
  if (themes.includes('Food')) recommendations.push('Consider menu improvements or breakfast package promotions.');
  if (!recommendations.length) recommendations.push('Continue collecting reviews and use feedback to refine guest experience.');
  const summary = review_text.length <= 220 ? review_text : review_text.slice(0,220).trim() + '...';
  const suggested_reply = `Thanks for your review! We appreciate your feedback about ${themes.join(', ').toLowerCase()}. We are glad you found our service ${sentiment.toLowerCase()} and look forward to making your next stay even better.`;
  return { sentiment, sentiment_score, themes, summary, action_items: recommendations, suggested_reply };
}

app.post('/ai/analyze', (req, res) => {
  const email = verifyTokenFromHeader(req);
  if (!email) return res.status(401).json({ detail: 'Unauthorized' });
  const { review_text } = req.body;
  if (!review_text) return res.status(400).json({ detail: 'review_text required' });
  return res.json(analyzeText(review_text));
});

app.listen(PORT, () => {
  console.log(`🚀 StayInsight AI Backend (Node) running on port ${PORT}`);
});