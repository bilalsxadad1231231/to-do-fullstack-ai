import httpClient from '../httpClient';
import { API_ENDPOINTS } from '../constants';

export const subtaskApi = {
  // Get subtasks for a todo
  getSubtasks: async (todoId) => {
    const response = await httpClient.get(API_ENDPOINTS.SUBTASKS(todoId));
    return response.data;
  },

  // Generate AI subtasks
  generateSubtasks: async (todoId, maxSubtasks = 5) => {
    const response = await httpClient.post(
      API_ENDPOINTS.GENERATE_SUBTASKS(todoId),
      { todo_id: todoId, max_subtasks: maxSubtasks }
    );
    return response.data;
  },

  // Update subtask
  updateSubtask: async (subtaskId, updateData) => {
    const response = await httpClient.put(API_ENDPOINTS.UPDATE_SUBTASK(subtaskId), updateData);
    return response.data;
  },

  // Delete subtask
  deleteSubtask: async (subtaskId) => {
    await httpClient.delete(API_ENDPOINTS.DELETE_SUBTASK(subtaskId));
    return true;
  },
}; 