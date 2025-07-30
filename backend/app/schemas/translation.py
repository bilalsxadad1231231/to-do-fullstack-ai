from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TranslationBase(BaseModel):
    language: str = Field(..., min_length=2, max_length=50)
    translated_title: str = Field(..., min_length=1, max_length=500)
    translated_description: Optional[str] = None

class Translation(TranslationBase):
    id: int
    todo_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class TranslationRequest(BaseModel):
    text: str = Field(..., min_length=1)
    target_language: str = Field(..., min_length=2, max_length=50)

class TodoTranslationRequest(BaseModel):
    target_language: str = Field(..., min_length=2, max_length=50) 