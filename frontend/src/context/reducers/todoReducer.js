export const TODO_ACTIONS = {
  SET_TODOS: 'SET_TODOS',
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_SELECTED_TODO: 'SET_SELECTED_TODO',
  ADD_SUBTASKS: 'ADD_SUBTASKS',
  ADD_TRANSLATION: 'ADD_TRANSLATION',
};

export const initialTodoState = {
  todos: [],
  selectedTodo: null,
  loading: false,
  error: null,
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
  },
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.SET_TODOS:
      const todos = action.payload;
      return {
        ...state,
        todos,
        stats: calculateStats(todos),
        loading: false,
        error: null,
      };

    case TODO_ACTIONS.ADD_TODO:
      const newTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: newTodos,
        stats: calculateStats(newTodos),
        loading: false,
        error: null,
      };

    case TODO_ACTIONS.UPDATE_TODO:
      const updatedTodos = state.todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        stats: calculateStats(updatedTodos),
        selectedTodo: state.selectedTodo?.id === action.payload.id 
          ? { ...state.selectedTodo, ...action.payload }
          : state.selectedTodo,
        loading: false,
        error: null,
      };

    case TODO_ACTIONS.DELETE_TODO:
      const filteredTodos = state.todos.filter(todo => todo.id !== action.payload);
      return {
        ...state,
        todos: filteredTodos,
        stats: calculateStats(filteredTodos),
        selectedTodo: state.selectedTodo?.id === action.payload ? null : state.selectedTodo,
        loading: false,
        error: null,
      };

    case TODO_ACTIONS.TOGGLE_TODO:
      const toggledTodos = state.todos.map(todo =>
        todo.id === action.payload.id ? action.payload : todo
      );
      return {
        ...state,
        todos: toggledTodos,
        stats: calculateStats(toggledTodos),
        selectedTodo: state.selectedTodo?.id === action.payload.id 
          ? action.payload 
          : state.selectedTodo,
        loading: false,
        error: null,
      };

    case TODO_ACTIONS.SET_SELECTED_TODO:
      return {
        ...state,
        selectedTodo: action.payload,
        loading: false,
      };

    case TODO_ACTIONS.ADD_SUBTASKS:
      const { todoId, subtasks } = action.payload;
      const todosWithSubtasks = state.todos.map(todo =>
        todo.id === todoId ? { ...todo, subtasks } : todo
      );
      return {
        ...state,
        todos: todosWithSubtasks,
        selectedTodo: state.selectedTodo?.id === todoId
          ? { ...state.selectedTodo, subtasks }
          : state.selectedTodo,
        loading: false,
        error: null,
      };

    case TODO_ACTIONS.ADD_TRANSLATION:
      const { todoId: translatedTodoId, translation } = action.payload;
      const todosWithTranslation = state.todos.map(todo =>
        todo.id === translatedTodoId
          ? { ...todo, translations: [...(todo.translations || []), translation] }
          : todo
      );
      return {
        ...state,
        todos: todosWithTranslation,
        selectedTodo: state.selectedTodo?.id === translatedTodoId
          ? { 
              ...state.selectedTodo, 
              translations: [...(state.selectedTodo.translations || []), translation] 
            }
          : state.selectedTodo,
        loading: false,
        error: null,
      };

    case TODO_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case TODO_ACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Helper function to calculate stats
const calculateStats = (todos) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;

  return { total, completed, pending };
}; 