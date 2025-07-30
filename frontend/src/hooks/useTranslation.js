import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { translationApi } from '../services/api/translationApi';

export const useTranslation = () => {
  const { translateTodo, loading } = useTodoContext();
  const [translating, setTranslating] = useState(false);

  const handleTranslateTodo = async (todoId, targetLanguage) => {
    try {
      setTranslating(true);
      const translation = await translateTodo(todoId, targetLanguage);
      return translation;
    } catch (error) {
      console.error('Error translating todo:', error);
      throw error;
    } finally {
      setTranslating(false);
    }
  };

  const handleTranslateText = async (text, targetLanguage) => {
    try {
      setTranslating(true);
      const result = await translationApi.translateText(text, targetLanguage);
      return result;
    } catch (error) {
      console.error('Error translating text:', error);
      throw error;
    } finally {
      setTranslating(false);
    }
  };

  return {
    translateTodo: handleTranslateTodo,
    translateText: handleTranslateText,
    translating: translating || loading,
  };
}; 