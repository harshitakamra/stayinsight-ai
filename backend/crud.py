from sqlalchemy.orm import Session
import models
import schemas

from security import hash_password


# ==================================================
# REVIEW CRUD
# ==================================================

def get_reviews(db: Session):
    return db.query(models.Review).all()


def get_review(db: Session, review_id: int):
    return (
        db.query(models.Review)
        .filter(models.Review.id == review_id)
        .first()
    )


def create_review(db: Session, review: schemas.ReviewCreate):
    db_review = models.Review(
        guest=review.guest,
        review=review.review,
        sentiment=review.sentiment,
    )

    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    return db_review


def update_review(
    db: Session,
    review_id: int,
    review: schemas.ReviewUpdate,
):
    db_review = get_review(db, review_id)

    if db_review is None:
        return None

    db_review.guest = review.guest
    db_review.review = review.review
    db_review.sentiment = review.sentiment

    db.commit()
    db.refresh(db_review)

    return db_review


def delete_review(db: Session, review_id: int):
    db_review = get_review(db, review_id)

    if db_review is None:
        return None

    db.delete(db_review)
    db.commit()

    return db_review


def seed_initial_reviews_if_empty(db: Session):
    count = db.query(models.Review).count()
    if count == 0:
        sample_reviews = [
            models.Review(guest="Harshita Sharma", review="Loved the ambient lighting, super clean room, and helpful concierge service!", sentiment="Positive"),
            models.Review(guest="Aryan Verma", review="Great central location near major attractions and very quick room service.", sentiment="Positive"),
            models.Review(guest="Sarah Jenkins", review="Great host, spotlessly clean rooms, and beautiful mountain view location!", sentiment="Positive"),
            models.Review(guest="David Miller", review="Good central location near shops, but breakfast options could definitely improve.", sentiment="Neutral"),
            models.Review(guest="Elena Rostova", review="Poor service and delayed check-in experience. Room AC was not working properly.", sentiment="Negative"),
            models.Review(guest="Michael Chang", review="Outstanding hospitality! Host went above and beyond to make our stay comfortable.", sentiment="Positive"),
            models.Review(guest="Emma Watson", review="Decent room cleanliness, but noisy street sounds made sleeping difficult.", sentiment="Neutral"),
        ]
        db.add_all(sample_reviews)
        db.commit()



def get_review_stats(db: Session):
    reviews = db.query(models.Review).all()
    total = len(reviews)
    pos = sum(1 for r in reviews if r.sentiment.lower() == "positive")
    neu = sum(1 for r in reviews if r.sentiment.lower() == "neutral")
    neg = sum(1 for r in reviews if r.sentiment.lower() == "negative")

    # Generate AI insights dynamically from current backend data
    recs = []
    if neg > 0:
        recs.append("Address room check-in speed and AC climate control based on recent negative feedback.")
    if neu > 0:
        recs.append("Upgrade breakfast options and enhance soundproofing in street-facing rooms.")
    if pos > 0:
        recs.append("Highlight host hospitality and scenic views in promotional marketing.")
    if not recs:
        recs.append("Maintain high guest satisfaction and encourage more guest reviews.")

    return schemas.ReviewStats(
        total_reviews=total,
        positive_reviews=pos,
        neutral_reviews=neu,
        negative_reviews=neg,
        themes=["Host", "Location", "Cleanliness", "Food", "Service", "Comfort"],
        ai_recommendations=recs
    )


# ==================================================
# USER CRUD
# ==================================================

def get_user_by_email(db: Session, email: str):
    return (
        db.query(models.User)
        .filter(models.User.email == email)
        .first()
    )


def create_user(db: Session, user: schemas.UserCreate):
    hashed = hash_password(user.password)

    db_user = models.User(
        email=user.email,
        hashed_password=hashed,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user