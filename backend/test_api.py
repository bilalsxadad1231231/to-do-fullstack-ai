#!/usr/bin/env python3
"""
Simple API test script to verify endpoints work correctly
"""

import requests
import json
import time
import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

BASE_URL = "http://localhost:8000/api/v1"

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get("http://localhost:8000/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure it's running on http://localhost:8000")
        return False

def test_create_todo():
    """Test creating a todo"""
    try:
        todo_data = {
            "title": "Test Todo",
            "description": "This is a test todo for API verification"
        }
        
        response = requests.post(
            f"{BASE_URL}/todos/",
            json=todo_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 201:
            todo = response.json()
            print(f"✅ Created todo: {todo['title']} (ID: {todo['id']})")
            return todo['id']
        else:
            print(f"❌ Failed to create todo: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error creating todo: {e}")
        return None

def test_get_todos():
    """Test getting all todos"""
    try:
        response = requests.get(f"{BASE_URL}/todos/")
        
        if response.status_code == 200:
            todos = response.json()
            print(f"✅ Retrieved {len(todos)} todos")
            return len(todos) > 0
        else:
            print(f"❌ Failed to get todos: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error getting todos: {e}")
        return False

def test_get_todo(todo_id):
    """Test getting a specific todo"""
    try:
        response = requests.get(f"{BASE_URL}/todos/{todo_id}")
        
        if response.status_code == 200:
            todo = response.json()
            print(f"✅ Retrieved todo: {todo['title']}")
            return True
        else:
            print(f"❌ Failed to get todo: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error getting todo: {e}")
        return False

def test_toggle_todo(todo_id):
    """Test toggling todo completion"""
    try:
        response = requests.patch(f"{BASE_URL}/todos/{todo_id}/toggle")
        
        if response.status_code == 200:
            todo = response.json()
            print(f"✅ Toggled todo completion: {todo['completed']}")
            return True
        else:
            print(f"❌ Failed to toggle todo: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error toggling todo: {e}")
        return False

def test_update_todo(todo_id):
    """Test updating a todo"""
    try:
        update_data = {
            "title": "Updated Test Todo",
            "description": "This todo has been updated"
        }
        
        response = requests.put(
            f"{BASE_URL}/todos/{todo_id}",
            json=update_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            todo = response.json()
            print(f"✅ Updated todo: {todo['title']}")
            return True
        else:
            print(f"❌ Failed to update todo: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error updating todo: {e}")
        return False

def test_delete_todo(todo_id):
    """Test deleting a todo"""
    try:
        response = requests.delete(f"{BASE_URL}/todos/{todo_id}")
        
        if response.status_code == 204:
            print("✅ Deleted todo successfully")
            return True
        else:
            print(f"❌ Failed to delete todo: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error deleting todo: {e}")
        return False

def main():
    """Run all API tests"""
    print("🧪 Testing AI Todo App API Endpoints")
    print("=" * 50)
    
    # Test health check first
    if not test_health_check():
        print("\n❌ Server is not running. Please start the server first:")
        print("   python run.py")
        return False
    
    print("\n🔍 Running API tests...")
    
    # Test CRUD operations
    todo_id = test_create_todo()
    if not todo_id:
        return False
    
    if not test_get_todos():
        return False
    
    if not test_get_todo(todo_id):
        return False
    
    if not test_toggle_todo(todo_id):
        return False
    
    if not test_update_todo(todo_id):
        return False
    
    if not test_delete_todo(todo_id):
        return False
    
    print("\n" + "=" * 50)
    print("✅ All API tests passed!")
    print("\n🎉 The backend is working correctly!")
    print("\n📚 You can now:")
    print("   - View API docs at: http://localhost:8000/docs")
    print("   - Test AI features (requires GROQ_API_KEY)")
    print("   - Integrate with your frontend application")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 