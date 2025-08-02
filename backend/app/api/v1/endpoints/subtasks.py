from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ....core.database import get_db
from ....schemas.subtask import Subtask, SubtaskGenerateRequest, SubtaskUpdate
from ....services.todo_service import TodoService

router = APIRouter()

@router.post("/todos/{todo_id}/generate", response_model=List[Subtask])
@router.post("/todos/{todo_id}/generate/", response_model=List[Subtask])
async def generate_subtasks(
    todo_id: int,
    request: SubtaskGenerateRequest,
    db: Session = Depends(get_db)
):
    """Generate AI subtasks for a todo"""
    todo_service = TodoService(db)
    
    try:
        subtasks = await todo_service.generate_subtasks(
            todo_id=todo_id,
            max_subtasks=request.max_subtasks
        )
        return subtasks
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate subtasks: {str(e)}"
        )

@router.get("/todos/{todo_id}/subtasks", response_model=List[Subtask])
@router.get("/todos/{todo_id}/subtasks/", response_model=List[Subtask])
def get_todo_subtasks(todo_id: int, db: Session = Depends(get_db)):
    """Get all subtasks for a todo"""
    todo_service = TodoService(db)
    todo = todo_service.get_todo(todo_id)
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return todo.subtasks

@router.put("/subtasks/{subtask_id}", response_model=Subtask)
def update_subtask(
    subtask_id: int,
    subtask_update: SubtaskUpdate,
    db: Session = Depends(get_db)
):
    """Update a subtask"""
    todo_service = TodoService(db)
    updated_subtask = todo_service.update_subtask(subtask_id, subtask_update)
    if not updated_subtask:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subtask not found"
        )
    return updated_subtask 