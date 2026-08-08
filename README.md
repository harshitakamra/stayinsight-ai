# StayInsight AI — AI-Powered Hotel & Hospitality Review Analytics Platform

An end-to-end full-stack web platform for hotel managers and hosts to collect guest feedback, perform real-time AI sentiment & theme analysis, and receive automated action items and response recommendations.

---

## 🔗 Live Deployment Links

- **Frontend Application (Vercel)**: [https://stayinsight-65yv3dhms-harshitakamras-projects.vercel.app](https://stayinsight-65yv3dhms-harshitakamras-projects.vercel.app)
- **Backend API Service (Render)**: [https://stayinsight-ai-new.onrender.com](https://stayinsight-ai-new.onrender.com)

---

## ✨ Features

- **Guest Review CRUD Management**: Create, read, update, and delete guest reviews with ratings and sentiment tags.
- **AI Sentiment & Theme Analyzer**: Instant analysis of review text into Positive, Neutral, or Negative sentiment, extracting key themes (*Cleanliness, Service, Location, Food, Comfort*).
- **Automated AI Recommendations**: Generates actionable hospitality recommendations and tailored guest reply drafts for review responses.
- **Analytics Metrics Dashboard**: Visual breakdown of total reviews, positive/neutral/negative percentage ratios, and smart insight cards.
- **Real-Time Search & Filtering**: Instant full-text search across guest names and review text with one-click sentiment filter tabs.
- **JWT Authentication & Security**: Secure user registration, password hashing (`bcrypt`), and token-based API authorization (`JWT`).
- **Dark Mode & Responsive UI**: Seamless dark/light theme switching with smooth transitions and mobile-optimized navigation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **HTTP Client**: Axios with JWT Interceptors

### Backend
- **Runtime**: Node.js + Express.js
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **CORS & Middleware**: Express CORS with dynamic origin matching

### Deployment
- **Frontend**: Vercel
- **Backend**: Render

---

## ⚙️ Running the Project

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```

---

## 📑 API Endpoints

- `GET /health` — API status check
- `POST /register` — Register new user
- `POST /login` — Authenticate and receive JWT token
- `GET /users/me` — Get logged-in user profile
- `GET /reviews` — Get guest reviews
- `POST /reviews` — Add new review
- `PUT /reviews/:id` — Update review
- `DELETE /reviews/:id` — Delete review
- `GET /reviews/stats` — Get review analytics & sentiment summary
- `POST /ai/analyze` — Run AI sentiment & theme analysis
