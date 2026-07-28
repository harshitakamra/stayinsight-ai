from pydantic import BaseModel, EmailStr


# ==========================
# REVIEW SCHEMAS
# ==========================

class ReviewBase(BaseModel):
    guest: str
    review: str
    sentiment: str


class ReviewCreate(ReviewBase):
    pass


class ReviewUpdate(ReviewBase):
    pass


class Review(ReviewBase):
    id: int

    class Config:
        from_attributes = True


# ==========================
# USER SCHEMAS
# ==========================

class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True


# ==========================
# JWT TOKEN SCHEMAS
# ==========================

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


# ==========================
# AI & STATS SCHEMAS
# ==========================

class AIAnalyzeRequest(BaseModel):
    review_text: str


class AIAnalyzeResponse(BaseModel):
    sentiment: str
    sentiment_score: float
    themes: list[str]
    summary: str
    action_items: list[str]
    suggested_reply: str


class ReviewStats(BaseModel):
    total_reviews: int
    positive_reviews: int
    neutral_reviews: int
    negative_reviews: int
    themes: list[str]
    ai_recommendations: list[str]