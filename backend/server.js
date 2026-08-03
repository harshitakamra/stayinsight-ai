const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 8000;
const SECRET_KEY =
  process.env.JWT_SECRET || "stayinsight_secret_key_week8";

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://stayinsight-gnomqm3lw-harshitakamras-projects.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.path} | Origin: ${req.headers.origin || "No Origin"}`
  );
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 StayInsight AI Backend running on port ${PORT}`);
});