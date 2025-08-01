// Simple API test for frontend
import httpClient from './services/httpClient';

export const testApiConnection = async () => {
  console.log('Testing API connection...');
  
  try {
    // Test root endpoint
    console.log('Testing root endpoint...');
    const rootResponse = await httpClient.get('/');
    console.log('Root response:', rootResponse.data);
    
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await httpClient.get('/health');
    console.log('Health response:', healthResponse.data);
    
    // Test todos endpoint
    console.log('Testing todos endpoint...');
    const todosResponse = await httpClient.get('/api/v1/todos');
    console.log('Todos response:', todosResponse.data);
    
    // Test creating a todo
    console.log('Testing todo creation...');
    const createResponse = await httpClient.post('/api/v1/todos', {
      title: 'Frontend Test Todo',
      description: 'Testing from frontend'
    });
    console.log('Create todo response:', createResponse.data);
    
    console.log('✅ All API tests passed!');
    return true;
  } catch (error) {
    console.error('❌ API test failed:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return false;
  }
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testApiConnection = testApiConnection;
} 