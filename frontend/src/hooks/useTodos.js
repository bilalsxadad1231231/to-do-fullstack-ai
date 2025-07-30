import { useState, useEffect } from 'react';
import { useTodoContext } from '../context/TodoContext';

export const useTodos = (autoLoad = true) => {
  const {
    todos,
    loading,
    error,
    stats,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,
  } = useTodoContext();

  const [filters, setFilters] = useState({
    status: 'all', // 'all', 'completed', 'pending'
    search: '',
  });

  // Auto-load todos on mount
  useEffect(() => {
    if (autoLoad && todos.length === 0) {
      loadTodos();
    }
  }, [autoLoad, todos.length, loadTodos]);

  // Filter todos based on current filters
  const filteredTodos = todos.filter(todo => {
    const matchesStatus = 
      filters.status === 'all' || 
      (filters.status === 'completed' && todo.completed) ||
      (filters.status === 'pending' && !todo.completed);

    const matchesSearch = 
      !filters.search ||
      todo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(filters.search.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    loading,
    error,
    stats,
    filters,
    updateFilters,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,
  };
}; 