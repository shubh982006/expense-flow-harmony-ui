
import { createClient } from '@supabase/supabase-js';
import { ExpenseCreate, IncomeUpdate, UserRegisterData } from '@/types/api';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const authService = {
  async register({ email, password, username }: UserRegisterData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  async login({ email, password }: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};

export const expenseService = {
  async addExpense(expense: ExpenseCreate) {
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ ...expense, user_id: supabase.auth.getUser() }])
      .select();
    if (error) throw error;
    return data;
  },

  async getExpensesByCategory(category: string) {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('category', category);
    if (error) throw error;
    return data;
  },

  async getExpensesByDate(date: string) {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('date', date);
    if (error) throw error;
    return data;
  },

  async updateIncome(income: IncomeUpdate) {
    const { data, error } = await supabase
      .from('income')
      .upsert([{ ...income, user_id: supabase.auth.getUser() }])
      .select();
    if (error) throw error;
    return data;
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    if (error) throw error;
    return data;
  },

  async getBalance(date: string) {
    const { data, error } = await supabase
      .rpc('get_balance', { target_date: date });
    if (error) throw error;
    return data;
  }
};

export const visualizationService = {
  async getExpensesByCategory() {
    const { data, error } = await supabase
      .rpc('get_expenses_by_category');
    if (error) throw error;
    return data;
  },

  async getExpensesByDateRange() {
    const { data, error } = await supabase
      .rpc('get_expenses_by_date');
    if (error) throw error;
    return data;
  },

  async getExpenseSummary() {
    const { data, error } = await supabase
      .rpc('get_expense_summary');
    if (error) throw error;
    return data;
  },

  async getMonthlyTotals() {
    const { data, error } = await supabase
      .rpc('get_monthly_totals');
    if (error) throw error;
    return data;
  },

  async getDailyTotals() {
    const { data, error } = await supabase
      .rpc('get_daily_totals');
    if (error) throw error;
    return data;
  }
};

