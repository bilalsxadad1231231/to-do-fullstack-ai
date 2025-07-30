from fastapi import APIRouter
from .endpoints import todos, subtasks, translation

api_router = APIRouter()

api_router.include_router(todos.router, prefix="/todos", tags=["todos"])
api_router.include_router(subtasks.router, prefix="", tags=["subtasks"])
api_router.include_router(translation.router, prefix="/todos", tags=["translation"]) 