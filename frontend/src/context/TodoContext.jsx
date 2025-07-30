import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { todoReducer, initialTodoState, TODO_ACTIONS } from './reducers/todoReducer';
import { todoApi } from '../services/api/todoApi';
import { subtaskApi } from '../services/api/subtaskApi';
import { translationApi } from '../services/api/translationApi';

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  // Load todos
  const loadTodos = useCallback(async () => {
    try {
      dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
      const todos = await todoApi.getTodos();
      dispatch({ type: TODO_ACTIONS.SET_TODOS, payload: todos });
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error?.message || 'An error occurred';
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: errorMessage });
    }
  }, []);

  // Create todo
  const createTodo = useCallback(async (todoData) => {
    try {
      dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
      const newTodo = await todoApi.createTodo(todoData);
      dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: newTodo });
      toast.success('Todo created successfully!');
      return newTodo;
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error?.message || 'An error occurred';
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: errorMessage });
      throw error;
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(async (todoId, updateData) => {
    try {
      dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
      const updatedTodo = await todoApi.updateTodo(todoId, updateData);
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, payload: updatedTodo });
      toast.success('Todo updated successfully!');
      return updatedTodo;
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error?.message || 'An error occurred';
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: errorMessage });
      throw error;
    }
  }, []);

  // Delete todo
  const deleteTodo = useCallback(async (todoId) => {
    try {
      dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
      await todoApi.deleteTodo(todoId);
      dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: todoId });
      toast.success('Todo deleted successfully!');
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error?.message || 'An error occurred';
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: errorMessage });
      throw error;
    }
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback(async (todoId) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(todoId);
      dispatch({ type: TODO_ACTIONS.TOGGLE_TODO, payload: updatedTodo });
      toast.success(updatedTodo.completed ? 'Todo completed!' : 'Todo marked as pending');
      return updatedTodo;
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error?.message || 'An error occurred';
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: errorMessage });
      throw error;
    }
  }, []);

  // Get single todo with details
  const getTodoDetails = useCallback(async (todoId) => {
    try {
      dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
      const todo = await todoApi.getTodo(todoId);
      dispatch({ type: TODO_ACTIONS.SET_SELECTED_TODO, payload: todo });
      return todo;
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error?.message || 'An error occurred';
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: errorMessage });
      throw error;
    }
  }, []);

  // Generate subtasks
  const generateSubtasks = useCallback(async (todoId, maxSubtasks = 5) => {
    try {
      dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
      const subtasks = await subtaskApi.generateSubtasks(todoId, maxSubtasks);
      
      // Reload all todos to get the updated data with subtasks
      const updatedTodos = await todoApi.getTodos();
      dispatch({ type: TODO_ACTIONS.SET_TODOS, payload: updatedTodos });
      
      toast.success(`Generated ${subtasks.length} subtasks!`);
      return subtasks;
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error?.message || 'An error occurred';
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: errorMessage });
      toast.error('Failed to generate subtasks');
      throw error;
    }
  }, []);

  // Translate todo
  const translateTodo = useCallback(async (todoId, targetLanguage) => {
    try {
      dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
      const translation = await translationApi.translateTodo(todoId, targetLanguage);
      
      // Reload all todos to get the updated data with translations
      const updatedTodos = await todoApi.getTodos();
      dispatch({ type: TODO_ACTIONS.SET_TODOS, payload: updatedTodos });
      
      toast.success(`Translated to ${targetLanguage}!`);
      return translation;
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error?.message || 'An error occurred';
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: errorMessage });
      toast.error('Translation failed');
      throw error;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: TODO_ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    // State
    todos: state.todos,
    selectedTodo: state.selectedTodo,
    loading: state.loading,
    error: state.error,
    stats: state.stats,
    
    // Actions
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getTodoDetails,
    generateSubtasks,
    translateTodo,
    clearError,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}; 