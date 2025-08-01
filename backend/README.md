---
title: AI Todo App Backend
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
license: mit
---

# AI Todo App Backend

A FastAPI-based backend application for an AI-powered todo management system with Groq AI integration.

## Features

- **FastAPI REST API** with automatic documentation
- **SQLite Database** with SQLAlchemy ORM
- **Groq AI Integration** for intelligent todo management
- **CORS Support** for frontend integration
- **Health Check Endpoints** for monitoring
- **Docker Containerization** for easy deployment

## API Endpoints

- **GET /** - Root endpoint with app info
- **GET /health** - Health check endpoint
- **GET /docs** - Interactive API documentation (Swagger UI)
- **GET /api/v1/** - API v1 endpoints

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Database connection string | No | `sqlite:///./todo_app.db` |
| `GROQ_API_KEY` | Groq API key for AI features | Yes | - |
| `GROQ_MODEL_NAME` | Groq model to use | No | `llama3-8b-8192` |
| `API_V1_STR` | API version prefix | No | `/api/v1` |
| `PROJECT_NAME` | Application name | No | `AI Todo App` |
| `DEBUG` | Debug mode | No | `True` |
| `BACKEND_CORS_ORIGINS` | CORS allowed origins | No | `["http://localhost:3000"]` |

## Local Development

### Using Docker Compose

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Using Docker directly

```bash
# Build image
docker build -t todo-ai-app .

# Run container
docker run -p 7860:7860 -e GROQ_API_KEY=your_key todo-ai-app
```

## Deployment

This application is deployed on Hugging Face Spaces and runs on port 7860.

### Access Points

- **Application**: https://huggingface.co/spaces/Muhammadbilal10101/todo-ai
- **API Documentation**: https://huggingface.co/spaces/Muhammadbilal10101/todo-ai/docs
- **Health Check**: https://huggingface.co/spaces/Muhammadbilal10101/todo-ai/health

## Technology Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **Alembic** - Database migration tool
- **Pydantic** - Data validation using Python type annotations
- **Groq** - Fast AI inference API
- **Docker** - Containerization platform
- **SQLite** - Lightweight database

## Project Structure

```
backend/
├── app/
│   ├── api/          # API routes
│   ├── core/         # Core configuration
│   ├── models/       # Database models
│   ├── schemas/      # Pydantic schemas
│   └── services/     # Business logic
├── alembic/          # Database migrations
├── Dockerfile        # Docker configuration
├── docker-compose.yml # Local development
├── requirements.txt  # Python dependencies
└── run.py           # Application entry point
```

## License

MIT License - see LICENSE file for details. 