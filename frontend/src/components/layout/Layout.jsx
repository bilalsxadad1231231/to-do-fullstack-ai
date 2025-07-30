import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';
import Modal from '../common/Modal';
import TodoForm from '../todo/TodoForm';
import { useTodos } from '../../hooks/useTodos';

const Layout = ({ children }) => {
  const { createTodo } = useTodos(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAddTodo = () => {
    setShowAddModal(true);
  };

  const handleCreateTodo = async (todoData) => {
    try {
      setSubmitting(true);
      await createTodo(todoData);
      setShowAddModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onAddTodo={handleAddTodo}
        onOpenSettings={() => setShowSettings(true)}
      />
      
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      
      <Footer />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

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

      {/* Settings modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
        size="md"
      >
        <div className="space-y-4">
          <div className="text-center text-gray-500">
            <p>Settings panel coming soon...</p>
            <p className="text-sm mt-2">Future features:</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Theme customization</li>
              <li>• Default language settings</li>
              <li>• Notification preferences</li>
              <li>• Export/import data</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Layout; 