from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
)
from sqlalchemy.orm import Session

import crud
import models
import schemas

from auth import register_user, login_user
from database import engine, get_db
from security import verify_token

# ==========================================
# Create Database Tables
# ==========================================

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="StayInsight AI API")

# ==========================================
# OAuth2
# ==========================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Authentication Dependency
# ==========================================

def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    email = verify_token(token)

    if email is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return email

# ==========================================
# Home
# ==========================================

@app.get("/")
def home():
    return {
        "message": "Welcome to StayInsight AI API"
    }

# ==========================================
# Register
# ==========================================

@app.post("/register")
def register(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    return register_user(
        user,
        db
    )

# ==========================================
# Login (OAuth2)
# ==========================================

@app.post(
    "/login",
    response_model=schemas.Token
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    return login_user(
        form_data,
        db
    )

# ==========================================
# Reviews
# ==========================================

@app.get(
    "/reviews",
    response_model=list[schemas.Review]
)
def get_reviews(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud.get_reviews(db)


@app.get(
    "/reviews/{review_id}",
    response_model=schemas.Review
)
def get_review(
    review_id: int,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    review = crud.get_review(
        db,
        review_id
    )

    if review is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return review


@app.post(
    "/reviews",
    response_model=schemas.Review
)
def create_review(
    review: schemas.ReviewCreate,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud.create_review(
        db,
        review
    )


@app.put(
    "/reviews/{review_id}",
    response_model=schemas.Review
)
def update_review(
    review_id: int,
    review: schemas.ReviewUpdate,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    updated = crud.update_review(
        db,
        review_id,
        review
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return updated


@app.delete("/reviews/{review_id}")
def delete_review(
    review_id: int,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    deleted = crud.delete_review(
        db,
        review_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return {
        "message": "Review deleted successfully"
    }


# Ensure seed reviews exist
with Session(engine) as session:
    crud.seed_initial_reviews_if_empty(session)


@app.get("/users/me", response_model=schemas.UserResponse)
def get_user_profile(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = crud.get_user_by_email(db, current_user)
    if not user:
        # Fallback response for valid token
        return schemas.UserResponse(id=1, email=current_user)
    return user


@app.get("/reviews/stats", response_model=schemas.ReviewStats)
def get_stats(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud.get_review_stats(db)


@app.get("/reviews/search/")
def search_reviews(
    query: str,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    reviews = crud.get_reviews(db)

    result = [
        review
        for review in reviews
        if query.lower() in review.review.lower()
        or query.lower() in review.guest.lower()
        or query.lower() in review.sentiment.lower()
    ]

    return result


@app.post("/ai/analyze", response_model=schemas.AIAnalyzeResponse)
def analyze_review_ai(
    payload: schemas.AIAnalyzeRequest,
    current_user: str = Depends(get_current_user)
):
    text = payload.review_text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Review text cannot be empty.")

    lower = text.lower()
    
    # Sentiment calculation heuristics
    pos_words = ["great", "excellent", "amazing", "wonderful", "clean", "love", "good", "friendly", "helpful", "beautiful", "best", "perfect", "enjoyed"]
    neg_words = ["poor", "bad", "dirty", "terrible", "noisy", "slow", "broken", "delayed", "horrible", "awful", "cold", "rudely", "disappointed"]
    
    pos_count = sum(1 for w in pos_words if w in lower)
    neg_count = sum(1 for w in neg_words if w in lower)

    if pos_count > neg_count:
        sentiment = "Positive"
        score = min(0.95, 0.65 + pos_count * 0.1)
    elif neg_count > pos_count:
        sentiment = "Negative"
        score = max(0.15, 0.45 - neg_count * 0.1)
    else:
        sentiment = "Neutral"
        score = 0.50

    # Theme extraction
    themes = []
    if any(w in lower for w in ["host", "staff", "owner", "service", "help"]):
        themes.append("Host & Staff")
    if any(w in lower for w in ["location", "place", "view", "beach", "near"]):
        themes.append("Location")
    if any(w in lower for w in ["clean", "tidy", "spotless", "dirty"]):
        themes.append("Cleanliness")
    if any(w in lower for w in ["food", "breakfast", "dinner", "coffee", "restaurant"]):
        themes.append("Food & Dining")
    if any(w in lower for w in ["bed", "ac", "room", "shower", "noisy", "wifi"]):
        themes.append("Room Comfort")

    if not themes:
        themes = ["General Hospitality"]

    # Summary & Action items
    if sentiment == "Positive":
        summary = f"Guest expressed high satisfaction regarding {', '.join(themes)}."
        action_items = [
            "Maintain current high service standards.",
            "Consider asking guest to post a public review on Google / Tripadvisor."
        ]
        suggested_reply = "Dear Guest, thank you so much for your wonderful review! We are delighted you enjoyed your stay and look forward to welcoming you back soon."
    elif sentiment == "Negative":
        summary = f"Guest highlighted issues regarding {', '.join(themes)}."
        action_items = [
            "Investigate mentioned issues with maintenance/housekeeping team.",
            "Send an apology note and partial voucher or complimentary perk."
        ]
        suggested_reply = "Dear Guest, we sincerely apologize for your experience. We take your feedback very seriously and are addressing these issues immediately to improve our stay quality."
    else:
        summary = f"Guest offered balanced feedback regarding {', '.join(themes)}."
        action_items = [
            "Review specific guest recommendations for small amenities or service speed.",
            "Follow up with guest for further suggestions."
        ]
        suggested_reply = "Dear Guest, thank you for taking the time to share your feedback! We appreciate your suggestions and will use them to refine our guest experience."

    return schemas.AIAnalyzeResponse(
        sentiment=sentiment,
        sentiment_score=score,
        themes=themes,
        summary=summary,
        action_items=action_items,
        suggested_reply=suggested_reply
    )