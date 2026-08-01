# StayInsight AI

## Project Overview

## Features

## Tech Stack

## Database Used

## Why PostgreSQL?

## Project Structure

## Database Schema

(Add schema image here)

## API Endpoints

GET /reviews

POST /reviews

PUT /reviews/{id}

DELETE /reviews/{id}

## Database Setup

1. Create Supabase project
2. Create reviews table
3. Copy DATABASE_URL
4. Add into backend/.env

## Running the Project

Frontend

npm install
npm run dev

Backend

cd backend
uvicorn main:app --reload

## Week 9 Deployment Checklist

### Frontend deployment (Vercel)
- Create a Vercel project from the GitHub repository.
- Set the root directory to the repository root where `package.json` and `vite.config.js` live.
- Use `npm run build` as the build command and `dist` as the output directory.
- Add an environment variable:
  - `VITE_API_URL` = `https://<your-render-backend-url>`
- If you want to preview locally with the Render host, Vite now allows `stayinsight-ai-new.onrender.com` in `vite.config.js`.

### Backend deployment (Render)
- Deploy the `backend` folder as a Node web service.
- Use `npm install` as the build command.
- Use `npm start` as the start command.
- Add environment variables:
  - `JWT_SECRET`
  - `CORS_ALLOWED_ORIGINS` = `https://<your-vercel-frontend-url>`

### Live URLs
- Frontend URL: add your Vercel URL here
- Backend URL: add your Render URL here

### Known limitations on free tier
- Render free tier may spin down after inactivity, so the first request can take 30–60 seconds.
- Vercel and Render free plans may have cold-start delays for the backend and frontend assets.