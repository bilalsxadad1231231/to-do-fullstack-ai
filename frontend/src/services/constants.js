export const API_ENDPOINTS = {
  TODOS: '/todos',
  SUBTASKS: (todoId) => `/todos/${todoId}/subtasks`,
  GENERATE_SUBTASKS: (todoId) => `/todos/${todoId}/generate`,
  TRANSLATE_TODO: (todoId) => `/todos/${todoId}/translate`,
  TRANSLATE_TEXT: '/todos/translate',
  TOGGLE_TODO: (todoId) => `/todos/${todoId}/toggle`,
  UPDATE_SUBTASK: (subtaskId) => `/subtasks/${subtaskId}`,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const STORAGE_KEYS = {
  TODOS: 'ai_todo_todos',
  SETTINGS: 'ai_todo_settings',
  THEME: 'ai_todo_theme',
};

export const LANGUAGES = [
  'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian',
  'Hindi', 'Dutch', 'Swedish', 'Norwegian', 'Danish'
];

export const MAX_SUBTASKS = 10;
export const MAX_TODO_TITLE_LENGTH = 255;
export const MAX_TODO_DESCRIPTION_LENGTH = 1000; 