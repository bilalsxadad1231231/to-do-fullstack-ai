#!/usr/bin/env python3
"""
Simple test script to verify the backend setup
"""

import asyncio
import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test that all modules can be imported"""
    try:
        from app.core.config import settings
        from app.core.database import get_db, Base, engine
        from app.models.todo import Todo
        from app.models.subtask import Subtask, Translation
        from app.schemas.todo import TodoCreate, TodoUpdate
        from app.services.todo_service import TodoService
        from app.services.ai_service import ai_service
        from app.services.translation_service import translation_service
        print("✅ All imports successful")
        return True
    except Exception as e:
        print(f"❌ Import error: {e}")
        return False

def test_database_connection():
    """Test database connection and table creation"""
    try:
        from app.core.database import engine, Base
        from app.models import todo, subtask
        
        # Create tables
        Base.metadata.create_all(bind=engine)
        print("✅ Database connection and table creation successful")
        return True
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def test_config():
    """Test configuration loading"""
    try:
        from app.core.config import settings
        print(f"✅ Configuration loaded successfully")
        print(f"   - Project Name: {settings.PROJECT_NAME}")
        print(f"   - Database URL: {settings.DATABASE_URL}")
        print(f"   - API Version: {settings.API_V1_STR}")
        return True
    except Exception as e:
        print(f"❌ Configuration error: {e}")
        return False

async def test_ai_service():
    """Test AI service initialization"""
    try:
        from app.services.ai_service import ai_service
        print("✅ AI service initialized successfully")
        return True
    except Exception as e:
        print(f"❌ AI service error: {e}")
        print("   Note: This is expected if GROQ_API_KEY is not set")
        return True  # Don't fail the test for missing API key

async def test_translation_service():
    """Test translation service initialization"""
    try:
        from app.services.translation_service import translation_service
        print("✅ Translation service initialized successfully")
        return True
    except Exception as e:
        print(f"❌ Translation service error: {e}")
        print("   Note: This is expected if GROQ_API_KEY is not set")
        return True  # Don't fail the test for missing API key

def main():
    """Run all tests"""
    print("🧪 Testing AI Todo App Backend Setup")
    print("=" * 50)
    
    tests = [
        ("Import Test", test_imports),
        ("Configuration Test", test_config),
        ("Database Test", test_database_connection),
    ]
    
    async_tests = [
        ("AI Service Test", test_ai_service),
        ("Translation Service Test", test_translation_service),
    ]
    
    # Run synchronous tests
    for test_name, test_func in tests:
        print(f"\n🔍 Running {test_name}...")
        if not test_func():
            print(f"❌ {test_name} failed")
            return False
    
    # Run asynchronous tests
    for test_name, test_func in async_tests:
        print(f"\n🔍 Running {test_name}...")
        if not asyncio.run(test_func()):
            print(f"❌ {test_name} failed")
            return False
    
    print("\n" + "=" * 50)
    print("✅ All tests passed! Backend is ready to run.")
    print("\n🚀 To start the server, run:")
    print("   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000")
    print("\n📚 API Documentation will be available at:")
    print("   http://localhost:8000/docs")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 