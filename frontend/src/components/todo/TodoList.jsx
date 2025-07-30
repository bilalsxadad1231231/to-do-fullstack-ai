import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoStats from './TodoStats';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTodos } from '../../hooks/useTodos';

const TodoList = () => {
  const {
    todos,
    loading,
    error,
    stats,
    filters,
    updateFilters,
    createTodo,
    updateTodo,
  } = useTodos();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCreateTodo = async (todoData) => {
    try {
      setSubmitting(true);
      await createTodo(todoData);
      setShowAddModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTodo = async (todoData) => {
    try {
      setSubmitting(true);
      await updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  if (loading && todos.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading todos..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-danger-600 mb-4">
          <p>Error loading todos: {typeof error === 'string' ? error : error?.message || 'An unknown error occurred'}</p>
        </div>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Todos</h1>
          <p className="text-gray-600">Manage your tasks with AI assistance</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Todo
        </Button>
      </div>

      {/* Stats */}
      <TodoStats stats={stats} />

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search todos..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Status filter */}
          <div className="sm:w-48">
            <select
              value={filters.status}
              onChange={(e) => updateFilters({ status: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="all">All Todos</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Todo list */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="text-gray-500">
              {filters.search || filters.status !== 'all' ? (
                <div>
                  <p className="text-lg font-medium mb-2">No todos found</p>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium mb-2">No todos yet</p>
                  <p className="mb-4">Create your first todo to get started</p>
                  <Button
                    onClick={() => setShowAddModal(true)}
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Add Your First Todo
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEditTodo}
            />
          ))
        )}
      </div>

      {/* Add todo modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Todo"
        size="md"
      >
        <TodoForm
          onSubmit={handleCreateTodo}
          loading={submitting}
        />
      </Modal>

      {/* Edit todo modal */}
      <Modal
        isOpen={!!editingTodo}
        onClose={() => setEditingTodo(null)}
        title="Edit Todo"
        size="md"
      >
        {editingTodo && (
          <TodoForm
            initialData={editingTodo}
            onSubmit={handleUpdateTodo}
            loading={submitting}
          />
        )}
      </Modal>
    </div>
  );
};

export default TodoList; 