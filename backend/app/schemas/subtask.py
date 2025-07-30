from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SubtaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None

class SubtaskCreate(SubtaskBase):
    todo_id: int
    order_index: Optional[int] = 0

class SubtaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    completed: Optional[bool] = None
    order_index: Optional[int] = None

class Subtask(SubtaskBase):
    id: int
    todo_id: int
    completed: bool
    order_index: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class SubtaskGenerateRequest(BaseModel):
    todo_id: int
    max_subtasks: Optional[int] = Field(default=5, ge=1, le=10) 