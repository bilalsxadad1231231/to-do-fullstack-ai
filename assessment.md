# AI Developer Technical Assessment Form
**Provided by XEOSOL – Your Remote Engineering Partner**

## Candidate Information
- **Full Name:** Muhammad Bilal
- **Email Address:** bilal.ai.developer@gmail.com
- **Phone Number:** +923119404616
- **LinkedIn Profile:** https://www.linkedin.com/in/muhammad-bilal-866750280
- **GitHub Profile:** https://github.com/bilalsxadad1231231
- **Total Years of Experience:** 1 year

## Tech Stack Used for This Project

### Backend Tech Stack:
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Alembic** - Database migration tool
- **Groq** - AI/LLM integration
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **LangChain** - LLM framework
- **Python-dotenv** - Environment management
- **Pytest** - Testing framework

### Frontend Tech Stack:
- **React 18** - UI library
- **React Router DOM** - Navigation
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Clsx** - CSS utilities
- **Date-fns** - Date utilities

## Functionality Checklist

### 1. Add to-do items
**Implementation summary:**
- React Hook Form for form management
- Backend API: `POST /api/v1/todos/`
- Frontend component: `TodoForm.jsx`
- Features: title, description, priority, due dates
- Real-time validation and user feedback

### 2. Mark items as completed
**Implementation summary:**
- Backend API: `PUT /api/v1/todos/{todo_id}`
- Frontend component: `TodoItem.jsx`
- Visual indicators for completed tasks
- Optimistic updates for better UX
- Persistent storage with SQLite

### 3. Translate each to-do item into a language of user's choice
**Implementation summary:**
- Backend API: `POST /api/v1/translation/`
- Frontend component: `TranslationModal.jsx`
- Groq AI integration for translation
- User-defined language input (not restricted list)
- Real-time translation with loading states

### 4. Use AI to generate subtasks for each item and save to persistent storage
**Implementation summary:**
- Backend API: `POST /api/v1/todos/{todo_id}/subtasks`
- Frontend components: `SubtaskList.jsx`, `SubtaskItem.jsx`
- Groq LLM integration for intelligent subtask generation
- Context-aware subtask creation
- Persistent storage with SQLite database

## Technical Implementation

### Architecture Decisions:
- **FastAPI Backend**: Chose for its modern async capabilities, automatic API documentation, and excellent performance
- **React Frontend**: Selected for component-based architecture, large ecosystem, and excellent developer experience
- **SQLite Database**: Opted for simplicity and ease of deployment while maintaining data persistence
- **Groq AI Integration**: Chose for its fast inference speed and cost-effectiveness for AI features
- **Tailwind CSS**: Selected for rapid UI development and consistent design system

### AI Tools Used:
- **Claude AI** - For better discussion and highlighting the architecture I should choose and why
- **Cursor** - As pair programmer for collaborative development
- Used for: Code structure, debugging, learning, optimization, architectural decisions

### Deployment:
- **Vercel Deployment URL:** https://to-do-fullstack-front.vercel.app/

## Project Deliverables

### 1. Live Deployment Link:
https://to-do-fullstack-front.vercel.app/

### 2. GitHub Repository:
https://github.com/bilalsxadad1231231/todo-ai-app-assessment

### 3. Code Quality:
- **Clean, modular, and commented:** Yes
- **Sample file:** `app/services/ai_service.py` - AI service with comprehensive error handling and logging
- **Sample file:** `src/components/todo/TodoForm.jsx` - Form component with validation and state management

### 4. Documentation:
- **PRD:** [PRD.md](./PRD.md) - Comprehensive product requirements document
- **User Documentation:** [USER_DOCUMENTATION.md](./USER_DOCUMENTATION.md) - Complete user guide with step-by-step instructions
- **Developer Documentation:** [README.md](./README.md) - Technical documentation and setup guide
- **API Documentation:** Auto-generated at `/docs` endpoint

### 5. Video Walkthrough:
https://drive.google.com/file/d/16csbhCtP4eUkp7p4TtNPdgwgePaStHBn/view?usp=sharing

## Time Tracking
- **Total hours:** 4 hours (both frontend and backend)
- **Challenges faced:**
  1. AI Integration - Resolved with proper error handling
  2. State Management - Resolved with reducer patterns
  3. Database Schema - Resolved with proper relationships
  4. Deployment CORS - Resolved with environment configuration
  5. Real-time Updates - Resolved with optimistic updates

## Declaration
I confirm that this project has been completed by me and reflects my own work using permitted tools and guidance platforms.

**Signature:** Muhammad Bilal  
**Date:** January 2025 