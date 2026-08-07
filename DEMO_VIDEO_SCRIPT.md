# StayInsight AI — 5-Minute Capstone Demo Video Script & Outline

This guide provides a script and minute-by-minute breakdown for recording your **Deliverable 2: Demo Video (5 minutes)** for Week 10 capstone submission.

---

## ⏱️ Video Timestamp Overview (Target Duration: 4:30 to 5:30 mins)

| Time | Section | Topic / What to Show |
|---|---|---|
| **0:00 - 0:30** (30s) | **Introduction** | App purpose, problem statement & target audience |
| **0:30 - 2:30** (2m) | **Core Flow Walkthrough** | Landing page → Register / Login → Dashboard & CRUD operations |
| **2:30 - 3:30** (1m) | **AI Feature Demo** | AI Analyzer Studio: sentiment classification, key themes & reply generator |
| **3:30 - 4:30** (1m) | **Code Walkthrough** | Project structure, Express API, JWT middleware & React architecture |
| **4:30 - 5:00** (30s) | **Wrap-Up & Conclusion** | Key learnings across 10 weeks & future improvements |

---

## 🎙️ Word-for-Word Script & Actions

### Section 1: Introduction (0:00 - 0:30)
- **On Screen**: Open the live deployed Vercel URL in your browser ([StayInsight AI Live App](https://stayinsight-65yv3dhms-harshitakamras-projects.vercel.app)).
- **Script**:
  > *"Hello everyone! My name is Harshita Kamra, and today I am excited to present **StayInsight AI**, my capstone full-stack project developed during the 10-week TBI-GEU AI Full-Stack Web Development internship.
  >
  > StayInsight AI is designed for hotel managers and vacation rental hosts. In the hospitality industry, manually sifting through guest reviews to extract actionable feedback is time-consuming. StayInsight AI automates this process by transforming raw guest feedback into structured analytics, sentiment breakdowns, and automated reply suggestions using AI."*

---

### Section 2: Core Flow Walkthrough (0:30 - 2:30)
- **On Screen**:
  1. Show the **Landing Page** hero banner, stats, and feature highlights.
  2. Click **Login**, demonstrate entering credentials (`demo@stayinsight.ai` / `demo12345`) or registering a new user.
  3. Navigate to the **Dashboard**.
  4. Show the metric cards: Total Reviews, Positive, Neutral, Negative.
  5. Click **+ Add Guest Review** modal, fill in guest name ("Alex Morgan"), feedback text ("Great stay! Clean rooms and friendly staff."), and submit.
  6. Show the live list updating with the new review.
  7. Demonstrate **Search & Filter**: Type "clean" into the search bar, then click the "Positive" filter tab.
  8. Click **Edit** and **Delete** on a review card to showcase full CRUD functionality.

- **Script**:
  > *"Let me walk you through the core flow of the application. On our landing page, users get an immediate overview of StayInsight AI.
  >
  > Next, we log in using secure JWT authentication. Once authenticated, we land on the **Analytics Dashboard**. Here, hotel managers can monitor live stats like total review count and positive vs. negative sentiment distribution.
  >
  > Adding a review is seamless: when a host enters feedback from a recent guest, it is saved directly to our backend API. We can also filter reviews by sentiment or search for specific keywords like 'cleanliness' or 'location'."*

---

### Section 3: AI Feature Demo (2:30 - 3:30)
- **On Screen**:
  1. Scroll to the **AI Sentiment & Theme Analyzer Studio** section on the Dashboard.
  2. Paste a sample review into the textarea: *"The location was great and room was clean, but check-in was very slow and AC was noisy."*
  3. Click **🤖 Run AI Sentiment & Theme Analysis**.
  4. Highlight the instant results: Sentiment badge ("Neutral"), themes ("Location", "Cleanliness", "Comfort"), action items, and the auto-generated response draft.

- **Script**:
  > *"Now, let’s check out our flagship feature: the **AI Review Sentiment & Theme Analyzer**.
  >
  > When I input a complex guest review — for instance, a guest praising the clean room but complaining about slow check-in and noise — our AI engine immediately analyzes the text.
  >
  > It classifies the overall sentiment as Neutral, flags specific themes like Cleanliness, Location, and Comfort, provides action items for hotel staff, and even drafts a professional response that the host can copy and send back to the guest!"*

---

### Section 4: Code Tour (3:30 - 4:30)
- **On Screen**: Switch to VS Code repository view.
  1. Open folder structure showing `src/` and `backend/`.
  2. Open `backend/server.js` and highlight lines 215-244 (`app.post('/ai/analyze')`).
  3. Open `src/pages/Dashboard.jsx` or `src/components/AIAnalyzer.jsx` to show React component structure and Axios interceptors.

- **Script**:
  > *"Taking a quick look under the hood: our project follows a modular full-stack structure.
  >
  > On the backend, built with Express and Node.js, we have our `/ai/analyze` endpoint. It processes incoming review text, evaluates key sentiment indicators, extracts category themes, and returns structured JSON responses. We enforce security using JWT tokens and CORS origin filtering.
  >
  > On the frontend, React 19 with Vite and Tailwind CSS handles rendering with custom state management, dark mode context, and glassmorphism styling."*

---

### Section 5: Wrap-Up & Conclusion (4:30 - 5:00)
- **On Screen**: Switch back to the live app landing page or GitHub repo.
- **Script**:
  > *"To summarize: over the past 10 weeks, I built StayInsight AI from setup and DB schema design to auth, AI integration, responsive UI polish, and cloud deployment on Vercel and Render.
  >
  > Thank you to the mentors and TBI-GEU team for this incredible learning experience. The live demo and repository links are in the description below!"*

---

## 📹 Recording Instructions
1. Record video using **Loom** (loom.com), **OBS Studio**, or Windows Game Bar (`Win + Alt + R`).
2. Keep video between **4:30 and 5:30 minutes**.
3. Upload to YouTube as **Unlisted** (Not Private, Not Public).
4. Copy the YouTube link and update the link in `README.md` before submitting the Week 10 Google Form.
