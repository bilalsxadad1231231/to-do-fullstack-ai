import React from 'react';
import { Brain, Plus, Settings } from 'lucide-react';
import Button from '../common/Button';

const Header = ({ onAddTodo, onOpenSettings }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center space-x-3">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Todo App</h1>
            <p className="text-sm text-gray-600">Smart task management with AI</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSettings}
            icon={<Settings className="w-4 h-4" />}
          >
            Settings
          </Button>
          <Button
            size="sm"
            onClick={onAddTodo}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Todo
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header; 