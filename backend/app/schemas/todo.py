from pydantic import BaseModel, Field
from typing import Optional, List, TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
    from .subtask import Subtask
    from .translation import Translation

# Base Todo schema
class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None

# Schema for creating Todo
class TodoCreate(TodoBase):
    pass

# Schema for updating Todo
class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    completed: Optional[bool] = None

# Schema for Todo response
class Todo(TodoBase):
    id: int
    completed: bool
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Schema for Todo with relations
class TodoWithRelations(Todo):
    subtasks: List["Subtask"] = []
    translations: List["Translation"] = []

# Import the actual classes to resolve forward references
from .subtask import Subtask
from .translation import Translation

# Rebuild the model to resolve forward references
TodoWithRelations.model_rebuild() 