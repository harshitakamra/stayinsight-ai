from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base


# ==========================
# REVIEW MODEL
# ==========================

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    guest = Column(String, nullable=False)
    review = Column(String, nullable=False)
    sentiment = Column(String, nullable=False)


# ==========================
# USER MODEL
# ==========================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    hashed_password = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )