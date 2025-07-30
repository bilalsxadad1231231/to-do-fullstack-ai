# AI Todo App Backend

A FastAPI backend for an AI-powered To-Do application with LangChain and GroqCloud integration.

## Features

- **CRUD Operations**: Create, read, update, and delete todos
- **AI Subtask Generation**: Automatically generate subtasks using LangChain and Groq
- **Translation Service**: Translate todos to different languages using AI
- **SQLite Database**: File-based database for simplicity
- **RESTful API**: Complete REST API with OpenAPI documentation
- **CORS Support**: Configured for frontend integration

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLAlchemy with SQLite
- **AI/ML**: LangChain with GroqCloud (Llama models)
- **Testing**: Pytest
- **Migration**: Alembic

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Setup

Copy the environment example and configure your settings:

```bash
cp env.example .env
```

Edit `.env` file and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run the Application

```bash
# Development mode
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or run directly
python -m app.main
```

### 4. Access the API

- **Interactive API docs**: http://localhost:8000/docs
- **ReDoc documentation**: http://localhost:8000/redoc
- **Health check**: http://localhost:8000/health

## API Endpoints

### Todos

- `GET /api/v1/todos/` - Get all todos
- `GET /api/v1/todos/{todo_id}` - Get specific todo with relations
- `POST /api/v1/todos/` - Create new todo
- `PUT /api/v1/todos/{todo_id}` - Update todo
- `DELETE /api/v1/todos/{todo_id}` - Delete todo
- `PATCH /api/v1/todos/{todo_id}/toggle` - Toggle completion

### Subtasks

- `POST /api/v1/todos/{todo_id}/generate` - Generate AI subtasks
- `GET /api/v1/todos/{todo_id}/subtasks` - Get todo subtasks

### Translation

- `POST /api/v1/todos/{todo_id}/translate` - Translate todo
- `GET /api/v1/todos/{todo_id}/translations` - Get todo translations
- `POST /api/v1/todos/translate` - Translate any text

## Usage Examples

### Create a Todo

```bash
curl -X POST "http://localhost:8000/api/v1/todos/" \
     -H "Content-Type: application/json" \
     -d '{"title": "Learn FastAPI", "description": "Build a todo app with AI features"}'
```

### Generate Subtasks

```bash
curl -X POST "http://localhost:8000/api/v1/todos/1/generate" \
     -H "Content-Type: application/json" \
     -d '{"todo_id": 1, "max_subtasks": 5}'
```

### Translate Todo

```bash
curl -X POST "http://localhost:8000/api/v1/todos/1/translate" \
     -H "Content-Type: application/json" \
     -d '{"target_language": "Spanish"}'
```

## Database Setup

The application automatically creates the SQLite database file (`todo_app.db`) when first run.

For production, you can use PostgreSQL by updating the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost/todo_app
```

## Testing

Run the test suite:

```bash
# Install test dependencies
pip install pytest pytest-asyncio

# Run all tests
pytest

# Run with coverage
pip install pytest-cov
pytest --cov=app --cov-report=html
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application
│   ├── core/
│   │   ├── config.py          # Settings configuration
│   │   └── database.py        # Database setup
│   ├── api/
│   │   └── v1/
│   │       ├── api.py         # Main API router
│   │       └── endpoints/     # API endpoints
│   ├── models/                # SQLAlchemy models
│   ├── schemas/               # Pydantic schemas
│   └── services/              # Business logic
├── alembic/                   # Database migrations
├── requirements.txt
├── env.example
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `sqlite:///./todo_app.db` |
| `GROQ_API_KEY` | Groq API key (required) | - |
| `GROQ_MODEL_NAME` | Groq model name | `llama3-8b-8192` |
| `API_V1_STR` | API version prefix | `/api/v1` |
| `PROJECT_NAME` | Application name | `AI Todo App` |
| `DEBUG` | Debug mode | `True` |
| `BACKEND_CORS_ORIGINS` | CORS origins | `["http://localhost:3000"]` |

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation errors
- **500 Internal Server Error**: Server errors (AI service failures, etc.)

## Security Considerations

1. **API Keys**: Store Groq API key securely in environment variables
2. **CORS**: Configure proper CORS origins for production
3. **Input Validation**: All inputs are validated using Pydantic schemas
4. **SQL Injection**: SQLAlchemy ORM prevents SQL injection

## Performance Optimization

1. **Database Indexing**: Indexes on frequently queried fields
2. **Connection Pooling**: SQLAlchemy handles connection pooling
3. **Async Operations**: AI operations are async to prevent blocking
4. **Pagination**: Implemented for todo listing

## Deployment

### Local Development

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production

For production deployment, consider:

1. Using PostgreSQL instead of SQLite
2. Setting up proper environment variables
3. Configuring CORS for your frontend domain
4. Setting up logging and monitoring
5. Using a process manager like PM2 or systemd

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License. 