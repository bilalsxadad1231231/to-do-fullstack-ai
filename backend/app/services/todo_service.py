from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.todo import Todo
from ..models.subtask import Subtask, Translation
from ..schemas.todo import TodoCreate, TodoUpdate
from ..schemas.subtask import SubtaskCreate, SubtaskUpdate
from .ai_service import ai_service
from .translation_service import translation_service
import logging

logger = logging.getLogger(__name__)

class TodoService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_todos(self, skip: int = 0, limit: int = 100) -> List[Todo]:
        """Get all todos with pagination and relations"""
        from sqlalchemy.orm import joinedload
        return self.db.query(Todo).options(
            joinedload(Todo.subtasks),
            joinedload(Todo.translations)
        ).offset(skip).limit(limit).all()
    
    def get_todo(self, todo_id: int) -> Optional[Todo]:
        """Get a specific todo by ID with relations"""
        from sqlalchemy.orm import joinedload
        return self.db.query(Todo).options(
            joinedload(Todo.subtasks),
            joinedload(Todo.translations)
        ).filter(Todo.id == todo_id).first()
    
    def create_todo(self, todo: TodoCreate) -> Todo:
        """Create a new todo"""
        db_todo = Todo(**todo.model_dump())
        self.db.add(db_todo)
        self.db.commit()
        self.db.refresh(db_todo)
        
        # Return the todo with relations
        return self.get_todo(db_todo.id)
    
    def update_todo(self, todo_id: int, todo_update: TodoUpdate) -> Optional[Todo]:
        """Update an existing todo"""
        db_todo = self.get_todo(todo_id)
        if not db_todo:
            return None
        
        update_data = todo_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_todo, field, value)
        
        self.db.commit()
        
        # Return the updated todo with relations
        return self.get_todo(todo_id)
    
    def delete_todo(self, todo_id: int) -> bool:
        """Delete a todo"""
        db_todo = self.get_todo(todo_id)
        if not db_todo:
            return False
        
        self.db.delete(db_todo)
        self.db.commit()
        return True
    
    def toggle_todo_completion(self, todo_id: int) -> Optional[Todo]:
        """Toggle todo completion status"""
        db_todo = self.get_todo(todo_id)
        if not db_todo:
            return None
        
        db_todo.completed = not db_todo.completed
        self.db.commit()
        
        # Get the updated todo with relations
        updated_todo = self.get_todo(todo_id)
        return updated_todo
    
    async def generate_subtasks(self, todo_id: int, max_subtasks: int = 5) -> List[Subtask]:
        """Generate AI subtasks for a todo"""
        db_todo = self.get_todo(todo_id)
        if not db_todo:
            raise ValueError("Todo not found")
        
        # Generate subtasks using AI
        ai_subtasks = await ai_service.generate_subtasks(
            todo_title=db_todo.title,
            todo_description=db_todo.description or "",
            max_subtasks=max_subtasks
        )
        
        # Save subtasks to database
        created_subtasks = []
        for i, subtask_data in enumerate(ai_subtasks):
            subtask = Subtask(
                todo_id=todo_id,
                title=subtask_data['title'],
                description=subtask_data['description'],
                order_index=i
            )
            self.db.add(subtask)
            created_subtasks.append(subtask)
        
        self.db.commit()
        
        # Refresh all subtasks
        for subtask in created_subtasks:
            self.db.refresh(subtask)
        
        return created_subtasks
    
    async def translate_todo(self, todo_id: int, target_language: str) -> Optional[Translation]:
        """Translate a todo to target language"""
        db_todo = self.get_todo(todo_id)
        if not db_todo:
            return None
        
        # Check if translation already exists
        existing_translation = self.db.query(Translation).filter(
            Translation.todo_id == todo_id,
            Translation.language == target_language
        ).first()
        
        if existing_translation:
            return existing_translation
        
        # Translate using AI
        try:
            translated_title = await translation_service.translate_text(
                db_todo.title, target_language
            )
            
            translated_description = None
            if db_todo.description:
                translated_description = await translation_service.translate_text(
                    db_todo.description, target_language
                )
            
            # Save translation
            translation = Translation(
                todo_id=todo_id,
                language=target_language,
                translated_title=translated_title,
                translated_description=translated_description
            )
            
            self.db.add(translation)
            self.db.commit()
            self.db.refresh(translation)
            
            return translation
            
        except Exception as e:
            logger.error(f"Translation failed: {str(e)}")
            raise Exception(f"Translation failed: {str(e)}")
    
    def get_todo_translations(self, todo_id: int) -> List[Translation]:
        """Get all translations for a todo"""
        return self.db.query(Translation).filter(Translation.todo_id == todo_id).all()
    
    def update_subtask(self, subtask_id: int, subtask_update: SubtaskUpdate) -> Optional[Subtask]:
        """Update a subtask"""
        from ..models.subtask import Subtask
        
        db_subtask = self.db.query(Subtask).filter(Subtask.id == subtask_id).first()
        if not db_subtask:
            return None
        
        update_data = subtask_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_subtask, field, value)
        
        self.db.commit()
        self.db.refresh(db_subtask)
        return db_subtask 