import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

export const useSubtasks = () => {
  const { generateSubtasks, loading } = useTodoContext();
  const [generating, setGenerating] = useState(false);

  const handleGenerateSubtasks = async (todoId, maxSubtasks = 5) => {
    try {
      setGenerating(true);
      const subtasks = await generateSubtasks(todoId, maxSubtasks);
      return subtasks;
    } catch (error) {
      console.error('Error generating subtasks:', error);
      throw error;
    } finally {
      setGenerating(false);
    }
  };

  return {
    generateSubtasks: handleGenerateSubtasks,
    generating: generating || loading,
  };
}; 