
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseHistory from '@/components/ExpenseHistory';
import ExpenseChart from '@/components/ExpenseChart';
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon } from 'lucide-react';
import { Expense, ExpenseCategory, mockExpenses, mockUser } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const [user, setUser] = useState(mockUser);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  const handleAddExpense = (newExpense: { amount: number; date: Date; category: ExpenseCategory }) => {
    const expense: Expense = {
      id: uuidv4(),
      ...newExpense
    };

    setExpenses([expense, ...expenses]);
    
    // Update balance
    setUser({
      ...user,
      balance: user.balance - newExpense.amount
    });
  };
  
  // Calculate total expenses this month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  
  const totalThisMonth = thisMonthExpenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.username}</h1>
        <p className="text-gray-500 mb-8">Here's an overview of your expenses</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${user.balance.toFixed(2)}</div>
              <CardDescription className="flex items-center mt-2">
                <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                <span>Updated just now</span>
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Fixed Deduction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${user.fixedDeduction.toFixed(2)}</div>
              <CardDescription className="flex items-center mt-2">
                <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                <span>Monthly deduction</span>
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">This Month's Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalThisMonth.toFixed(2)}</div>
              <CardDescription className="flex items-center mt-2">
                <ArrowUpIcon className="h-4 w-4 text-amber-500 mr-1" />
                <span>From {thisMonthExpenses.length} transactions</span>
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
              <ExpenseHistory expenses={expenses} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
