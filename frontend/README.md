# AI Todo App Frontend

A modern React frontend for the AI-powered Todo application with smart task management and translation features.

## Features

- **Smart Todo Management**: Create, edit, delete, and toggle todos
- **AI-Powered Subtasks**: Generate intelligent subtasks using AI
- **Multi-language Translation**: Translate todos to multiple languages
- **Real-time Search & Filtering**: Find and filter todos by status
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Toast Notifications**: Real-time feedback for user actions
- **Statistics Dashboard**: Track completion rates and progress

## Tech Stack

- **React 18** with Hooks
- **React Router DOM** for navigation
- **React Hook Form** for form management
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Date-fns** for date formatting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-ai-app-assessment/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and update the API URL:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── todo/           # Todo-specific components
│   │   └── layout/         # Layout components
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services and utilities
│   ├── styles/             # Global styles
│   ├── App.jsx            # Main app component
│   └── index.js           # Entry point
├── package.json
├── tailwind.config.js
└── README.md
```

## Key Components

### Core Components

- **TodoList**: Main todo management interface
- **TodoItem**: Individual todo display with actions
- **TodoForm**: Form for creating/editing todos
- **TodoStats**: Statistics dashboard
- **TranslationModal**: AI translation interface
- **SubtaskList/SubtaskItem**: Subtask management

### Common Components

- **Button**: Reusable button with variants
- **Input**: Form input with validation
- **Modal**: Modal dialog component
- **LoadingSpinner**: Loading state indicator
- **ConfirmDialog**: Confirmation dialogs

### Hooks

- **useTodos**: Todo management with filtering
- **useSubtasks**: AI subtask generation
- **useTranslation**: AI translation features

## API Integration

The frontend integrates with the FastAPI backend through:

- **HTTP Client**: Axios with interceptors for error handling
- **API Services**: Organized by feature (todos, subtasks, translations)
- **State Management**: React Context with useReducer
- **Real-time Updates**: Automatic state synchronization

## Features in Detail

### Todo Management

- Create new todos with title and description
- Edit existing todos
- Mark todos as complete/incomplete
- Delete todos with confirmation
- Search todos by title or description
- Filter by completion status

### AI Subtasks

- Generate intelligent subtasks using AI
- Automatic subtask suggestions based on todo content
- Toggle subtask completion
- View subtask progress

### Translation Features

- Translate todos to multiple languages
- Support for custom languages
- Copy translated text to clipboard
- View translation history
- Real-time translation preview

### User Experience

- Responsive design for all screen sizes
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states for async operations
- Error handling with user-friendly messages

## Development

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
```

### Environment Variables

- `REACT_APP_API_BASE_URL`: Backend API URL
- `REACT_APP_APP_NAME`: Application name
- `REACT_APP_VERSION`: Application version
- `REACT_APP_ENVIRONMENT`: Environment (development/production)

### Styling

The app uses Tailwind CSS with custom configuration:

- Custom color palette (primary, success, danger, warning)
- Custom animations and transitions
- Responsive design utilities
- Dark mode support (future enhancement)

## Testing

```bash
npm test           # Run all tests
npm test -- --watch  # Run tests in watch mode
npm test -- --coverage  # Run tests with coverage
```

## Building for Production

```bash
npm run build
```

The build output will be in the `build/` directory.

## Deployment

The app can be deployed to various platforms:

- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop deployment
- **AWS S3**: Static hosting
- **GitHub Pages**: Free hosting for open source

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:

- Create an issue on GitHub
- Check the backend documentation
- Review the API documentation at `/docs` when running locally 