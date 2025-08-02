# AI Todo App - Full Stack Application

A modern, AI-powered todo application built with FastAPI backend and React frontend, featuring intelligent task management, AI-generated subtasks, and multi-language translation capabilities.

## 🚀 Features

### Backend (FastAPI)
- **RESTful API** with automatic documentation
- **AI Integration** using Groq for intelligent features
- **Database Management** with SQLAlchemy and Alembic
- **Smart Subtask Generation** using AI
- **Multi-language Translation** powered by AI
- **Comprehensive Testing** with pytest
- **Database Migrations** with Alembic

### Frontend (React)
- **Modern UI/UX** with Tailwind CSS
- **Real-time Updates** with React Context
- **Responsive Design** for all devices
- **Smart Todo Management** with filtering and search
- **AI Translation Interface** for multi-language support
- **Interactive Subtask Management**
- **Toast Notifications** for user feedback

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Alembic** - Database migration tool
- **Groq** - AI/LLM integration
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **React Router DOM** - Navigation
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
todo-ai-app-assessment/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── alembic/
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── services/
│   ├── public/
│   ├── package.json
│   └── README.md
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

6. **Start the server**
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your API URL
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## 🔧 Configuration

### Backend Environment Variables
```env
DATABASE_URL=sqlite:///./todo_app.db
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=your_secret_key
```

### Frontend Environment Variables
```env
REACT_APP_API_BASE_URL=https://muhammadbilal10101-todo-ai.hf.space
```

## 📚 API Documentation

When the backend is running, you can access:
- **Interactive API docs**: `http://localhost:8000/docs`
- **ReDoc documentation**: `http://localhost:8000/redoc`
- **OpenAPI schema**: `http://localhost:8000/openapi.json`

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
- **Docker**: Use the provided Dockerfile
- **Heroku**: Deploy with Procfile
- **Railway**: Direct deployment from GitHub
- **Vercel**: Serverless deployment

### Frontend Deployment
- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Free hosting
- **AWS S3**: Static hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the excellent web framework
- [React](https://reactjs.org/) for the frontend library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Groq](https://groq.com/) for AI/LLM services

## 📚 Documentation

This project includes comprehensive documentation:

- **[Product Requirements Document (PRD)](./PRD.md)** - Detailed feature specifications and requirements
- **[User Documentation](./USER_DOCUMENTATION.md)** - Complete user guide with step-by-step instructions
- **[Technical Assessment](./assessment.md)** - Assessment submission with implementation details

## 🚀 Live Demo

- **Frontend Application**: https://to-do-fullstack-front.vercel.app/
- **GitHub Repository**: https://github.com/bilalsxadad1231231/todo-ai-app-assessment
- **Video Walkthrough**: https://drive.google.com/file/d/16csbhCtP4eUkp7p4TtNPdgwgePaStHBn/view?usp=sharing

## 📞 Support

For support and questions:
- **Developer**: Muhammad Bilal
- **Email**: bilal.ai.developer@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/muhammad-bilal-866750280
- **GitHub**: https://github.com/bilalsxadad1231231
- Create an issue on GitHub
- Check the individual README files in backend/ and frontend/
- Review the API documentation when running locally

## 🎯 Assessment Details

This project was completed as part of a technical assessment with the following specifications:
- **Development Time**: 4 hours (both frontend and backend)
- **AI Tools Used**: Claude AI for architectural decisions, Cursor as pair programmer
- **Key Features**: Todo management, AI-powered subtask generation, multi-language translation
- **Deployment**: Vercel for frontend, Hugging Face Spaces for backend

---

**Happy Coding! 🎉** 