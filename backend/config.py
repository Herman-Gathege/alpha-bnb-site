import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
DATABASE_URL = os.getenv("DATABASE_URL")


def fix_postgres_url(url):
    """
    Render/Heroku provide postgres:// which SQLAlchemy rejects.
    Render Postgres ALSO requires SSL connections.
    """
    if not url:
        return url

    # Fix deprecated prefix
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)

    # Force SSL for Render Postgres
    if "sslmode=" not in url:
        if "?" in url:
            url += "&sslmode=require"
        else:
            url += "?sslmode=require"

    return url


class Config:
    """Base config shared by all environments"""

    SECRET_KEY = os.getenv("SECRET_KEY")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("JWT_SECRET")
    JWT_REFRESH_TOKEN_EXPIRES_DAYS = 30

    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")


# ---------- LOCAL DEVELOPMENT ----------
class DevelopmentConfig(Config):
    DEBUG = True

    # Local postgres (preferred)
    LOCAL_DB = DATABASE_URL

    SQLALCHEMY_DATABASE_URI = fix_postgres_url(
        os.getenv("DATABASE_URL") or LOCAL_DB
    )


# ---------- PRODUCTION ----------
class ProductionConfig(Config):
    DEBUG = False

    SQLALCHEMY_DATABASE_URI = fix_postgres_url(
        os.getenv("DATABASE_URL")
    )


# ---------- TESTING ----------
class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"


# ---------- CONFIG SWITCHER ----------
config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
    "deployment": ProductionConfig,   # ← required for Render
}


def get_config():
    env = os.getenv("FLASK_ENV", "development")
    return config_by_name[env]