import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key")
    DEBUG: bool = os.getenv("DEBUG", "False").lower() in ("true", "1")

    APP_ORIGIN_URL: str = os.getenv("APP_ORIGIN_URL", "localhost:3000")
    API_ORIGIN_URL: str = os.getenv("API_ORIGIN_URL", "localhost:8000")
    PROTOCOL: str = os.getenv("PROTOCOL", "http")
    API_SERVICE_NAME: str = os.getenv("API_SERVICE_NAME", "api")
    ALLOWED_HOSTS: list[str] = os.getenv("ALLOWED_HOSTS", "localhost,api").split(",")

    DB_ENGINE: str = os.getenv("DB_ENGINE", "postgresql")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "app-db")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "admin")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "SecurePass!123")
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "db")
    POSTGRES_PORT: int = int(os.getenv("POSTGRES_PORT", 5432))
    DATABASE_URL: str = f"{DB_ENGINE}://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

    CORS_ALLOWED_ORIGINS: list[str] = os.getenv(
        "CORS_ALLOWED_ORIGINS", "http://localhost:3000"
    ).split(",")

    ACCESS_TOKEN_LIFETIME: int = int(
        os.getenv("ACCESS_TOKEN_LIFETIME", 60)
    )  # in minutes
    REFRESH_TOKEN_LIFETIME: int = int(os.getenv("REFRESH_TOKEN_LIFETIME", 1))  # in days

    TIME_ZONE: str = os.getenv("TIME_ZONE", "UTC")
    LANGUAGE_CODE: str = os.getenv("LANGUAGE_CODE", "en-us")


settings = Settings()
