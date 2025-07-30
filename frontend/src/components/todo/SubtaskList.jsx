import React from 'react';
import SubtaskItem from './SubtaskItem';

const SubtaskList = ({ subtasks = [] }) => {
  if (subtasks.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        No subtasks available
      </div>
    );
  }

  const completedCount = subtasks.filter(s => s.completed).length;
  const completionPercentage = subtasks.length > 0 ? (completedCount / subtasks.length) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">
          Subtasks ({subtasks.length})
        </h4>
        <span className="text-xs text-gray-500">
          {completedCount}/{subtasks.length} completed
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-success-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      <div className="space-y-1">
        {subtasks
          .sort((a, b) => a.order_index - b.order_index)
          .map((subtask) => (
            <SubtaskItem key={subtask.id} subtask={subtask} />
          ))}
      </div>
    </div>
  );
};

export default SubtaskList; 