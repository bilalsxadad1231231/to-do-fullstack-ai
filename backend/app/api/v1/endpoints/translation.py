from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ....core.database import get_db
from ....schemas.translation import Translation, TranslationRequest, TodoTranslationRequest
from ....services.todo_service import TodoService

router = APIRouter()

@router.post("/{todo_id}/translate", response_model=Translation)
@router.post("/{todo_id}/translate/", response_model=Translation)
async def translate_todo(
    todo_id: int,
    request: TodoTranslationRequest,
    db: Session = Depends(get_db)
):
    """Translate a todo to target language"""
    todo_service = TodoService(db)
    
    try:
        translation = await todo_service.translate_todo(
            todo_id=todo_id,
            target_language=request.target_language
        )
        if not translation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Todo not found"
            )
        return translation
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{todo_id}/translations", response_model=List[Translation])
@router.get("/{todo_id}/translations/", response_model=List[Translation])
def get_todo_translations(todo_id: int, db: Session = Depends(get_db)):
    """Get all translations for a todo"""
    todo_service = TodoService(db)
    todo = todo_service.get_todo(todo_id)
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return todo_service.get_todo_translations(todo_id)

@router.post("/translate", response_model=dict)
@router.post("/translate/", response_model=dict)
async def translate_text(request: TranslationRequest):
    """Translate any text to target language"""
    from ....services.translation_service import translation_service
    
    try:
        translated_text = await translation_service.translate_text(
            text=request.text,
            target_language=request.target_language
        )
        return {
            "original_text": request.text,
            "translated_text": translated_text,
            "target_language": request.target_language
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        ) 