import React from 'react';
import { CheckCircle, Clock, Target } from 'lucide-react';

const TodoStats = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statItems = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Stat items */}
      {statItems.map((item) => (
        <div key={item.label} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className={`${item.bgColor} p-2 rounded-lg`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Completion rate */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">Completion Rate</p>
          <span className="text-2xl font-bold text-gray-900">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-success-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoStats; 