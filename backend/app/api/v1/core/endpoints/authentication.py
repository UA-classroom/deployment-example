from typing import Annotated

from app.api.v1.core.models import Token, User
from app.api.v1.core.schemas import (
    PasswordResetConfirmSchema,
    PasswordResetRequestSchema,
    TokenSchema,
    UserOutSchema,
    UserRegisterSchema,
)
from app.db_setup import get_db
from app.email import (
    generate_password_reset_token,
    get_user_by_email,
    invalidate_password_reset_token,
    send_password_reset_email,
    verify_password_reset_token,
)
from app.security import (
    create_database_token,
    get_current_token,
    hash_password,
    verify_password,
)
from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import ValidationError
from sqlalchemy import delete, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

router = APIRouter(tags=["auth"], prefix="/auth")


@router.post("/user/create", status_code=status.HTTP_201_CREATED)
def register_user(
    user: UserRegisterSchema, db: Session = Depends(get_db)
) -> UserOutSchema:
    # TODO ADD VALIDATION TO CREATION OF PASSWORD
    hashed_password = hash_password(user.password)
    # We exclude password from the validated pydantic model since the field/column is called hashed_password, we add that manually
    new_user = User(
        **user.model_dump(exclude={"password"}), hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    return new_user


@router.post("/token")
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
) -> TokenSchema:
    # Keep in mind that without the response model or return schema
    # we would expose the hashed password, which absolutely cannot happen
    # Perhaps better to use .only or select the columns explicitly
    user = (
        db.execute(
            select(User).where(User.email == form_data.username),
        )
        .scalars()
        .first()
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User does not exist",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Passwords do not match",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_database_token(user_id=user.id, db=db)
    return {"access_token": access_token.token, "token_type": "bearer"}


@router.delete("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    current_token: Token = Depends(get_current_token),
    db: Session = Depends(get_db),
):
    db.execute(delete(Token).where(Token.token == current_token.token))
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/password-reset/request", status_code=status.HTTP_200_OK)
def request_password_reset(
    reset_request: PasswordResetRequestSchema,
    db: Session = Depends(get_db),
):
    """
    Request a password reset email

    This endpoint sends a password reset link to the user's email.
    """
    user = get_user_by_email(session=db, email=reset_request.email)
    if not user:
        # We return success even if the email doesn't exist for security reasons
        return {
            "message": "If the email exists in our system, a password reset link has been sent"
        }

    token = generate_password_reset_token(user_id=user.id, db=db)
    send_password_reset_email(reset_request.email, token)

    return {
        "message": "If the email exists in our system, a password reset link has been sent"
    }


# @router.post("/password-reset/request", status_code=status.HTTP_200_OK)
# def request_password_reset(
#     reset_request: PasswordResetRequestSchema,
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db),
# ):
#     """
#     Request a password reset email

#     This endpoint sends a password reset link to the user's email.
#     """
#     user = get_user_by_email(session=db, email=reset_request.email)
#     if not user:
#         # We return success even if the email doesn't exist for security reasons
#         return {
#             "message": "If the email exists in our system, a password reset link has been sent"
#         }

#     token = generate_password_reset_token(user_id=user.id, db=db)
#     background_tasks.add_task(send_password_reset_email, reset_request.email, token)

#     return {
#         "message": "If the email exists in our system, a password reset link has been sent"
#     }


@router.post("/password-reset/confirm", status_code=status.HTTP_200_OK)
def confirm_password_reset(
    reset_confirm: PasswordResetConfirmSchema, db: Session = Depends(get_db)
):
    """
    Confirm password reset

    This endpoint validates the token and updates the user's password.
    """
    user = verify_password_reset_token(token=reset_confirm.token, db=db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token"
        )

    # Basic password validation
    if len(reset_confirm.new_password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long",
        )

    # Update the user's password
    user.hashed_password = hash_password(reset_confirm.new_password)

    # Mark the token as used
    invalidate_password_reset_token(reset_confirm.token, db)

    db.commit()

    return {"message": "Password has been reset successfully"}
