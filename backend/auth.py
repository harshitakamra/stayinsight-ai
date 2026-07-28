from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

import crud
import schemas

from database import get_db
from security import verify_password, create_access_token


# ==========================
# Register User
# ==========================

def register_user(
    user: schemas.UserCreate,
    db: Session
):
    existing = crud.get_user_by_email(
        db,
        user.email
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return crud.create_user(db, user)


# ==========================
# Login User (OAuth2)
# ==========================

def login_user(
    form_data: OAuth2PasswordRequestForm,
    db: Session
):
    db_user = crud.get_user_by_email(
        db,
        form_data.username
    )

    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(
        form_data.password,
        db_user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }