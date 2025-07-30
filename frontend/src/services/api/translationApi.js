import httpClient from '../httpClient';
import { API_ENDPOINTS } from '../constants';

export const translationApi = {
  // Translate todo
  translateTodo: async (todoId, targetLanguage) => {
    const response = await httpClient.post(
      API_ENDPOINTS.TRANSLATE_TODO(todoId),
      { target_language: targetLanguage }
    );
    return response.data;
  },

  // Translate any text
  translateText: async (text, targetLanguage) => {
    const response = await httpClient.post(
      API_ENDPOINTS.TRANSLATE_TEXT,
      { text, target_language: targetLanguage }
    );
    return response.data;
  },

  // Get todo translations
  getTodoTranslations: async (todoId) => {
    const response = await httpClient.get(`${API_ENDPOINTS.TODOS}/${todoId}/translations`);
    return response.data;
  },
}; 