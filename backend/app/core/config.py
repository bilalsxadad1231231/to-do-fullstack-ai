from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AI Todo App"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "sqlite:///./todo_app.db"
    
    # Groq Configuration
    GROQ_API_KEY: str
    GROQ_MODEL_NAME: str = "llama3-8b-8192"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings() 