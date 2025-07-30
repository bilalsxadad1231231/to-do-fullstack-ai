import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import Layout from './components/layout/Layout';
import TodoList from './components/todo/TodoList';
import './styles/globals.css';

function App() {
  return (
    <TodoProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/todos" element={<TodoList />} />
            {/* Add more routes as needed */}
          </Routes>
        </Layout>
      </Router>
    </TodoProvider>
  );
}

export default App; 