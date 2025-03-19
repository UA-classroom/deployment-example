import json
import secrets
from datetime import datetime, timedelta, timezone

import requests
from app.api.v1.core.models import PasswordResetToken, User
from app.settings import settings
from sqlalchemy import select
from sqlalchemy.orm import Session


def get_user_by_email(session: Session, email: str) -> User:
    """Get a user by email"""
    return session.scalars(select(User).where(User.email == email)).first()


def generate_password_reset_token(user_id: int, db: Session) -> str:
    """
    Generate a secure random token for password reset and store it in the database
    """
    # Generate a secure token
    token = secrets.token_urlsafe(32)

    # Create and store the token
    reset_token = PasswordResetToken(token=token, user_id=user_id)

    db.add(reset_token)
    db.commit()

    return token


def verify_password_reset_token(token: str, db: Session) -> User | None:
    """
    Verify a password reset token and return the associated user if valid

    Returns None if:
    - Token doesn't exist
    - Token has already been used
    - Token has expired
    """
    # Calculate expiry time
    expiry_minutes = settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES
    expiry_time = datetime.now(timezone.utc) - timedelta(minutes=expiry_minutes)

    # Find the token in the database
    db_token = db.scalars(
        select(PasswordResetToken).where(
            PasswordResetToken.token == token,
            PasswordResetToken.created >= expiry_time,
            PasswordResetToken.used == False,
        )
    ).first()

    if not db_token:
        return None

    return db_token.user


def invalidate_password_reset_token(token: str, db: Session) -> bool:
    """Mark a password reset token as used"""
    db_token = db.scalars(
        select(PasswordResetToken).where(PasswordResetToken.token == token)
    ).first()

    if not db_token:
        return False

    db_token.used = True
    db.commit()
    return True


def send_password_reset_email(email: str, token: str):
    """Send a password reset email using Postmark API"""
    reset_url = f"{settings.FRONTEND_BASE_URL}/reset-password?token={token}"

    message = {
        "From": "tobias@utvecklarakademin.se",  # Update with your sender email
        "To": email,
        "Subject": "Password Reset Request",
        "HtmlBody": f'''
            <h2>Password Reset Request</h2>
            <p>You have requested to reset your password.</p>
            <p>Please click on the link below to reset your password:</p>
            <p><a href="{reset_url}">Reset Password</a></p>
            <p>This link will expire in {settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES // 60} hour(s).</p>
            <p>If you did not request this password reset, please ignore this email.</p>
        ''',
        "MessageStream": "outbound",
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": settings.POSTMARK_TOKEN,
    }

    try:
        print("SENDING MAIL:")
        response = requests.post(
            "https://api.postmarkapp.com/email",
            headers=headers,
            data=json.dumps(message),
        )
        response.raise_for_status()
        print(f"Email sent to {email}: {response.status_code}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"Failed to send email to {email}: {e}")
        return False
