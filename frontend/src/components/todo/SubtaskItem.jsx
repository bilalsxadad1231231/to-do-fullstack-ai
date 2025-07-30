import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { subtaskApi } from '../../services/api/subtaskApi';
import toast from 'react-hot-toast';

const SubtaskItem = ({ subtask }) => {
  const [isCompleted, setIsCompleted] = useState(subtask.completed);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    try {
      setIsUpdating(true);
      const newCompletedState = !isCompleted;
      
      await subtaskApi.updateSubtask(subtask.id, { completed: newCompletedState });
      setIsCompleted(newCompletedState);
      
      toast.success(newCompletedState ? 'Subtask completed!' : 'Subtask marked as pending');
    } catch (error) {
      console.error('Error updating subtask:', error);
      toast.error('Failed to update subtask');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
      <button
        onClick={handleToggleComplete}
        disabled={isUpdating}
        className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
          isCompleted
            ? 'bg-success-500 border-success-500 text-white'
            : 'border-gray-300 hover:border-success-400'
        }`}
      >
        {isCompleted && <Check className="w-3 h-3" />}
      </button>
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${
          isCompleted ? 'line-through text-gray-500' : 'text-gray-700'
        }`}>
          {subtask.title}
        </p>
        {subtask.description && (
          <p className={`text-xs mt-1 ${
            isCompleted ? 'line-through text-gray-400' : 'text-gray-600'
          }`}>
            {subtask.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubtaskItem; 