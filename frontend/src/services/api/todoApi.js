import httpClient from '../httpClient';
import { API_ENDPOINTS } from '../constants';

export const todoApi = {
  // Get all todos
  getTodos: async (params = {}) => {
    const { skip = 0, limit = 100 } = params;
    const response = await httpClient.get(API_ENDPOINTS.TODOS, {
      params: { skip, limit }
    });
    return response.data;
  },

  // Get single todo with relations
  getTodo: async (todoId) => {
    const response = await httpClient.get(`${API_ENDPOINTS.TODOS}/${todoId}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todoData) => {
    const response = await httpClient.post(API_ENDPOINTS.TODOS, todoData);
    return response.data;
  },

  // Update todo
  updateTodo: async (todoId, updateData) => {
    const response = await httpClient.put(`${API_ENDPOINTS.TODOS}/${todoId}`, updateData);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (todoId) => {
    await httpClient.delete(`${API_ENDPOINTS.TODOS}/${todoId}`);
    return true;
  },

  // Toggle todo completion
  toggleTodo: async (todoId) => {
    const response = await httpClient.patch(API_ENDPOINTS.TOGGLE_TODO(todoId));
    return response.data;
  },
}; 