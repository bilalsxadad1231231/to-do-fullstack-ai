#!/usr/bin/env python3
"""
Entry point for Hugging Face Spaces deployment
"""

import uvicorn
import os
import sys

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("🚀 Starting AI Todo App Backend on Hugging Face Spaces...")
    print("📚 API Documentation: https://huggingface.co/spaces/Muhammadbilal10101/todo-ai/docs")
    print("🔍 Health Check: https://huggingface.co/spaces/Muhammadbilal10101/todo-ai/health")
    print("=" * 50)
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=7860,
        reload=False,  # Disable reload for production
        log_level="info"
    ) 