from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ....core.database import get_db
from ....schemas.todo import Todo, TodoCreate, TodoUpdate, TodoWithRelations
from ....services.todo_service import TodoService

router = APIRouter()

@router.get("/", response_model=List[TodoWithRelations])
def get_todos(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all todos with subtasks and translations"""
    todo_service = TodoService(db)
    return todo_service.get_todos(skip=skip, limit=limit)

@router.get("/{todo_id}", response_model=TodoWithRelations)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    """Get a specific todo with subtasks and translations"""
    todo_service = TodoService(db)
    todo = todo_service.get_todo(todo_id)
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return todo

@router.post("/", response_model=TodoWithRelations, status_code=status.HTTP_201_CREATED)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    """Create a new todo"""
    todo_service = TodoService(db)
    return todo_service.create_todo(todo)

@router.put("/{todo_id}", response_model=TodoWithRelations)
def update_todo(
    todo_id: int,
    todo_update: TodoUpdate,
    db: Session = Depends(get_db)
):
    """Update an existing todo"""
    todo_service = TodoService(db)
    updated_todo = todo_service.update_todo(todo_id, todo_update)
    if not updated_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return updated_todo

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """Delete a todo"""
    todo_service = TodoService(db)
    success = todo_service.delete_todo(todo_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

@router.patch("/{todo_id}/toggle", response_model=TodoWithRelations)
def toggle_todo_completion(todo_id: int, db: Session = Depends(get_db)):
    """Toggle todo completion status"""
    todo_service = TodoService(db)
    updated_todo = todo_service.toggle_todo_completion(todo_id)
    if not updated_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return updated_todo 