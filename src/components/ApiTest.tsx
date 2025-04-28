import { useState } from 'react';
import { userService, expenseService, visualizationService } from '../services/expenseService';

const ApiTest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const testLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.login({
        username: 'testuser',
        password: 'testpass'
      });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const testAddExpense = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await expenseService.addExpense({
        category: 'Food',
        amount: 50,
        date: new Date().toISOString().split('T')[0]
      });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const testGetSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await visualizationService.getExpenseSummary();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">API Test Component</h1>
      
      <div className="space-y-4">
        <button
          onClick={testLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Test Login
        </button>

        <button
          onClick={testAddExpense}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
          disabled={loading}
        >
          Test Add Expense
        </button>

        <button
          onClick={testGetSummary}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 ml-4"
          disabled={loading}
        >
          Test Get Summary
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Response Data:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest; 