import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseHistory from '@/components/ExpenseHistory';
import ExpenseChart from '@/components/ExpenseChart';
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon, Edit2, Trash2 } from 'lucide-react';
import { Expense, ExpenseCategory, mockExpenses } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [fixedDeduction, setFixedDeduction] = useState(user?.fixedDeduction || 0);
  const [isEditingDeduction, setIsEditingDeduction] = useState(false);
  const [newDeduction, setNewDeduction] = useState('');

  useEffect(() => {
    if (user?.fixedDeduction) {
      setFixedDeduction(user.fixedDeduction);
    }
  }, [user?.fixedDeduction]);

  const handleAddExpense = (newExpense: { amount: number; date: Date; category: ExpenseCategory }) => {
    const expense: Expense = {
      id: uuidv4(),
      ...newExpense
    };

    setExpenses([expense, ...expenses]);
    toast.success('Expense added successfully');
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
    toast.success('Expense deleted successfully');
  };

  const handleUpdateDeduction = () => {
    const deduction = parseFloat(newDeduction);
    if (isNaN(deduction) || deduction < 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    setFixedDeduction(deduction);
    setIsEditingDeduction(false);
    toast.success('Fixed deduction updated successfully');
  };
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  
  // Calculate current balance: monthly income - total expenses - fixed deduction
  const currentBalance = 5000 - totalExpenses - fixedDeduction; // Fixed monthly income of 5000

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.username || 'User'}</h1>
        <p className="text-gray-500 mb-8">Here's an overview of your expenses</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentBalance.toFixed(2)}</div>
              <CardDescription className="flex items-center mt-2">
                <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                <span>Monthly Income: $5000.00</span>
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Fixed Deduction</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditingDeduction ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={newDeduction}
                    onChange={(e) => setNewDeduction(e.target.value)}
                    placeholder="Enter amount"
                    className="w-32"
                    min="0"
                    step="0.01"
                  />
                  <Button
                    size="sm"
                    onClick={handleUpdateDeduction}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditingDeduction(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${fixedDeduction.toFixed(2)}</div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setNewDeduction(fixedDeduction.toString());
                      setIsEditingDeduction(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <CardDescription className="flex items-center mt-2">
                <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                <span>Monthly deduction</span>
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
              <CardDescription className="flex items-center mt-2">
                <ArrowUpIcon className="h-4 w-4 text-amber-500 mr-1" />
                <span>From {expenses.length} transactions</span>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <ExpenseForm onAddExpense={handleAddExpense} />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <ExpenseChart expenses={expenses} />
              <ExpenseHistory expenses={expenses} onDeleteExpense={handleDeleteExpense} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
