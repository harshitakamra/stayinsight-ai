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

### Frontend deployment
- Create a Vercel project from the GitHub repository.
- Set the root directory to the frontend root if needed.
- Add the environment variable VITE_API_URL with your deployed backend URL.

### Backend deployment
- Deploy the backend folder to Render.
- Use the build/start commands appropriate for the service.
- Add environment variables such as DATABASE_URL, JWT_SECRET, and CORS_ALLOWED_ORIGINS.

### Live URLs
- Frontend URL: add your Vercel URL here
- Backend URL: add your Render URL here

### Known limitations on free tier
- Render free tier may spin down after inactivity, so the first request can take 30–60 seconds.
- Vercel and Render free plans may have cold-start delays for the backend and frontend assets.