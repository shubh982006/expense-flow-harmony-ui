import axios from 'axios';

const API_BASE_URL = '/api';

// User Management
export const userService = {
  register: async (userData: { username: string; password: string; email: string }) => {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data;
  },

  login: async (credentials: { username: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    return response.data;
  },
};

// Expense Management
export const expenseService = {
  getCategories: async () => {
    const response = await axios.get(`${API_BASE_URL}/expenses/categories`);
    return response.data;
  },

  getBalance: async (date: string) => {
    const response = await axios.get(`${API_BASE_URL}/expenses/balance/${date}`);
    return response.data;
  },

  addExpense: async (expenseData: { category: string; amount: number; date: string }) => {
    const response = await axios.post(`${API_BASE_URL}/expenses/add`, expenseData);
    return response.data;
  },

  getExpensesByCategory: async (category: string) => {
    const response = await axios.get(`${API_BASE_URL}/expenses/category/${category}`);
    return response.data;
  },

  getExpensesByDate: async (date: string) => {
    const response = await axios.get(`${API_BASE_URL}/expenses/date/${date}`);
    return response.data;
  },

  updateIncome: async (incomeData: { salary: number; fixedExpenses: number; date: string }) => {
    const response = await axios.post(`${API_BASE_URL}/expenses/income`, incomeData);
    return response.data;
  },
};

// Visualization
export const visualizationService = {
  getCategoryExpenses: async () => {
    const response = await axios.get(`${API_BASE_URL}/visualization/category`);
    return response.data;
  },

  getDateExpenses: async () => {
    const response = await axios.get(`${API_BASE_URL}/visualization/date`);
    return response.data;
  },

  getCategoryDateExpenses: async () => {
    const response = await axios.get(`${API_BASE_URL}/visualization/category-date`);
    return response.data;
  },

  getExpenseSummary: async () => {
    const response = await axios.get(`${API_BASE_URL}/visualization/summary`);
    return response.data;
  },

  getMonthlyExpenses: async () => {
    const response = await axios.get(`${API_BASE_URL}/visualization/monthly`);
    return response.data;
  },

  getDailyExpenses: async () => {
    const response = await axios.get(`${API_BASE_URL}/visualization/daily`);
    return response.data;
  },
}; 