
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseHistory from '@/components/ExpenseHistory';
import ExpenseChart from '@/components/ExpenseChart';
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon } from 'lucide-react';
import { Expense, ExpenseCategory } from '@/utils/types';
import { expenseService, visualizationService } from '@/services/supabaseService';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { format } from 'date-fns';

const Dashboard = () => {
  const { data: balance } = useQuery({
    queryKey: ['balance'],
    queryFn: () => expenseService.getBalance(format(new Date(), 'yyyy-MM-dd'))
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => expenseService.getExpensesByDate(format(new Date(), 'yyyy-MM-dd'))
  });

  const { data: summary } = useQuery({
    queryKey: ['expenseSummary'],
    queryFn: () => visualizationService.getExpenseSummary()
  });

  const handleAddExpense = async (newExpense: { amount: number; date: Date; category: ExpenseCategory }) => {
    try {
      await expenseService.addExpense({
        amount: newExpense.amount,
        category: newExpense.category,
        date: format(newExpense.date, 'yyyy-MM-dd')
      });
      
      toast.success('Expense added successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add expense');
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-500 mb-8">Here's an overview of your expenses</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${balance?.toFixed(2) || '0.00'}</div>
              <CardDescription className="flex items-center mt-2">
                <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                <span>Updated just now</span>
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summary?.totalExpenses?.toFixed(2) || '0.00'}</div>
              <CardDescription className="flex items-center mt-2">
                <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                <span>From all expenses</span>
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summary?.averageExpense?.toFixed(2) || '0.00'}</div>
              <CardDescription className="flex items-center mt-2">
                <ArrowUpIcon className="h-4 w-4 text-amber-500 mr-1" />
                <span>Per transaction</span>
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
