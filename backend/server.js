const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8000;
const SECRET_KEY = "stayinsight_secret_key_week8";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-Memory & File Database Storage
let users = [
  { id: 1, email: "admin@stayinsight.ai", password: "password123" }
];

let reviews = [
  { id: 1, guest: "Harshita Sharma", review: "Loved the ambient lighting, super clean room, and helpful concierge service!", sentiment: "Positive" },
  { id: 2, guest: "Aryan Verma", review: "Great central location near major attractions and very quick room service.", sentiment: "Positive" },
  { id: 3, guest: "Sarah Jenkins", review: "Great host, spotlessly clean rooms, and beautiful mountain view location!", sentiment: "Positive" },
  { id: 4, guest: "David Miller", review: "Good central location near shops, but breakfast options could definitely improve.", sentiment: "Neutral" },
  { id: 5, guest: "Elena Rostova", review: "Poor service and delayed check-in experience. Room AC was not working properly.", sentiment: "Negative" },
  { id: 6, guest: "Michael Chang", review: "Outstanding hospitality! Host went above and beyond to make our stay comfortable.", sentiment: "Positive" },
  { id: 7, guest: "Emma Watson", review: "Decent room cleanliness, but noisy street sounds made sleeping difficult.", sentiment: "Neutral" },
];

let nextId = 8;


// Helper: Authenticate JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ detail: "Token missing" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ detail: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to StayInsight AI API (Node/Express Backend)" });
});

// Register
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ detail: "Email and password are required" });
  }

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ detail: "User already registered" });
  }

  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  res.json({ id: newUser.id, email: newUser.email });
});

// Login
app.post("/login", (req, res) => {
  const email = req.body.username || req.body.email;
  const password = req.body.password;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    // Auto-create demo user for smooth testing
    users.push({ id: users.length + 1, email, password });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "24h" });
  res.json({ access_token: token, token_type: "bearer" });
});

// Current User Profile
app.get("/users/me", authenticateToken, (req, res) => {
  res.json({ id: 1, email: req.user.email });
});

// Get Reviews
app.get("/reviews", authenticateToken, (req, res) => {
  res.json(reviews);
});

// Get Review Stats
app.get("/reviews/stats", authenticateToken, (req, res) => {
  const total = reviews.length;
  const pos = reviews.filter((r) => r.sentiment.toLowerCase() === "positive").length;
  const neu = reviews.filter((r) => r.sentiment.toLowerCase() === "neutral").length;
  const neg = reviews.filter((r) => r.sentiment.toLowerCase() === "negative").length;

  const recs = [];
  if (neg > 0) recs.append ? recs.push("Address room check-in speed and AC climate control based on negative reviews.") : recs.push("Address room check-in speed and AC climate control.");
  if (neu > 0) recs.push("Upgrade breakfast options and enhance soundproofing in street-facing rooms.");
  if (pos > 0) recs.push("Highlight host hospitality and scenic views in promotional marketing.");
  if (recs.length === 0) recs.push("Maintain high guest satisfaction.");

  res.json({
    total_reviews: total,
    positive_reviews: pos,
    neutral_reviews: neu,
    negative_reviews: neg,
    themes: ["Host", "Location", "Cleanliness", "Food", "Service", "Comfort"],
    ai_recommendations: recs,
  });
});

// Get Single Review
app.get("/reviews/:id", authenticateToken, (req, res) => {
  const item = reviews.find((r) => r.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ detail: "Review not found" });
  res.json(item);
});

// Create Review
app.post("/reviews", authenticateToken, (req, res) => {
  const { guest, review, sentiment } = req.body;
  if (!guest || !review) {
    return res.status(400).json({ detail: "Guest name and review text required" });
  }

  const newReview = {
    id: nextId++,
    guest,
    review,
    sentiment: sentiment || "Positive",
  };
  reviews.unshift(newReview);
  res.json(newReview);
});

// Update Review
app.put("/reviews/:id", authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return res.status(404).json({ detail: "Review not found" });

  const { guest, review, sentiment } = req.body;
  reviews[index] = { ...reviews[index], guest, review, sentiment };
  res.json(reviews[index]);
});

// Delete Review
app.delete("/reviews/:id", authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return res.status(404).json({ detail: "Review not found" });

  const deleted = reviews.splice(index, 1);
  res.json({ message: "Review deleted successfully", deleted: deleted[0] });
});

// Search Reviews
app.get("/reviews/search/", authenticateToken, (req, res) => {
  const q = (req.query.query || "").toLowerCase();
  const filtered = reviews.filter(
    (r) =>
      r.guest.toLowerCase().includes(q) ||
      r.review.toLowerCase().includes(q) ||
      r.sentiment.toLowerCase().includes(q)
  );
  res.json(filtered);
});

// AI Analyze Endpoint
app.post("/ai/analyze", authenticateToken, (req, res) => {
  const text = (req.body.review_text || "").trim();
  if (!text) return res.status(400).json({ detail: "Review text cannot be empty" });

  const lower = text.toLowerCase();
  const posWords = ["great", "excellent", "amazing", "wonderful", "clean", "love", "good", "friendly", "helpful", "beautiful", "best", "perfect"];
  const negWords = ["poor", "bad", "dirty", "terrible", "noisy", "slow", "broken", "delayed", "horrible", "awful", "cold"];

  const posCount = posWords.filter((w) => lower.includes(w)).length;
  const negCount = negWords.filter((w) => lower.includes(w)).length;

  let sentiment = "Neutral";
  let score = 0.5;

  if (posCount > negCount) {
    sentiment = "Positive";
    score = Math.min(0.95, 0.65 + posCount * 0.1);
  } else if (negCount > posCount) {
    sentiment = "Negative";
    score = Math.max(0.15, 0.45 - negCount * 0.1);
  }

  const themes = [];
  if (["host", "staff", "owner", "service", "help"].some((w) => lower.includes(w))) themes.push("Host & Staff");
  if (["location", "place", "view", "beach", "near"].some((w) => lower.includes(w))) themes.push("Location");
  if (["clean", "tidy", "spotless", "dirty"].some((w) => lower.includes(w))) themes.push("Cleanliness");
  if (["food", "breakfast", "dinner", "coffee"].some((w) => lower.includes(w))) themes.push("Food & Dining");
  if (["bed", "ac", "room", "shower", "noisy"].some((w) => lower.includes(w))) themes.push("Room Comfort");
  if (themes.length === 0) themes.push("General Hospitality");

  let summary = "";
  let action_items = [];
  let suggested_reply = "";

  if (sentiment === "Positive") {
    summary = `Guest expressed high satisfaction regarding ${themes.join(", ")}.`;
    action_items = [
      "Maintain current high service standards.",
      "Encourage guest to leave a public review on Google / TripAdvisor."
    ];
    suggested_reply = "Dear Guest, thank you so much for your wonderful review! We are delighted you enjoyed your stay and look forward to welcoming you back soon.";
  } else if (sentiment === "Negative") {
    summary = `Guest highlighted operational issues regarding ${themes.join(", ")}.`;
    action_items = [
      "Investigate reported issue with housekeeping/maintenance team immediately.",
      "Send a personal apology and offer a complimentary stay voucher."
    ];
    suggested_reply = "Dear Guest, we sincerely apologize for your experience. We take your feedback very seriously and are addressing these issues immediately to improve our service.";
  } else {
    summary = `Guest provided balanced feedback regarding ${themes.join(", ")}.`;
    action_items = [
      "Review specific guest feedback to refine daily service quality.",
      "Follow up with guest for further suggestions."
    ];
    suggested_reply = "Dear Guest, thank you for taking the time to share your feedback! We appreciate your suggestions and will use them to refine our guest experience.";
  }

  res.json({
    sentiment,
    sentiment_score: score,
    themes,
    summary,
    action_items,
    suggested_reply,
  });
});

app.listen(PORT, () => {
  console.log(`StayInsight AI Backend running live at http://localhost:${PORT}`);
});
