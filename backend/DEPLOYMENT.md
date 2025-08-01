# Deployment Guide

## Hugging Face Spaces Deployment

### 1. Create a Hugging Face Space

1. Go to [Hugging Face Spaces](https://huggingface.co/spaces)
2. Click "Create new Space"
3. Choose "Docker" as the SDK
4. Set the Space name and visibility
5. Click "Create Space"

### 2. Configure Environment Variables

In your Hugging Face Space settings, add these environment variables:

```
DATABASE_URL=sqlite:///./todo_app.db
GROQ_API_KEY=your_actual_groq_api_key
GROQ_MODEL_NAME=llama3-8b-8192
API_V1_STR=/api/v1
PROJECT_NAME=AI Todo App
DEBUG=False
BACKEND_CORS_ORIGINS=["https://your-frontend-domain.com"]
```

### 3. Update Dockerfile for HF Spaces

The Dockerfile is already optimized for Hugging Face Spaces. Make sure to:

1. Set `DEBUG=False` in production
2. Configure proper CORS origins
3. Set your actual Groq API key

### 4. Build and Deploy

The Space will automatically build and deploy when you push to the repository.

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
docker run -p 8000:8000 -e GROQ_API_KEY=your_key todo-ai-app
```

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

## Health Check

The application includes a health check endpoint at `/health` that returns:

```json
{
  "status": "healthy"
}
```

## API Documentation

Once deployed, you can access:
- API Documentation: `https://your-space.hf.space/docs`
- Health Check: `https://your-space.hf.space/health`
- Root endpoint: `https://your-space.hf.space/`

**Note**: The application runs on port 7860, which is the standard port for Hugging Face Spaces.

## Troubleshooting

### Common Issues

1. **Port binding**: Make sure port 8000 is exposed
2. **Environment variables**: Ensure all required env vars are set
3. **Database**: SQLite database will be created automatically
4. **CORS**: Update CORS origins for your frontend domain

### Logs

Check application logs for debugging:

```bash
# Docker Compose
docker-compose logs app

# Docker
docker logs <container_id>
``` 