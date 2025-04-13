
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChartIcon, BarChartHorizontal } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Expense, ExpenseCategory, getCategoryColor } from '@/utils/types';

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  const [period, setPeriod] = useState<'thisMonth' | 'lastMonth' | 'last3Months'>('thisMonth');
  
  // Get data for selected period
  const getFilteredData = () => {
    const today = new Date();
    let startDate: Date;
    
    switch (period) {
      case 'thisMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        return expenses.filter(expense => 
          expense.date >= startDate && expense.date <= endOfLastMonth
        );
      case 'last3Months':
        startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        break;
      default:
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    
    return expenses.filter(expense => expense.date >= startDate);
  };
  
  // Aggregate data by category
  const getCategoryData = () => {
    const filteredExpenses = getFilteredData();
    const categoryMap: Record<string, number> = {};
    
    filteredExpenses.forEach(expense => {
      const category = expense.category;
      categoryMap[category] = (categoryMap[category] || 0) + expense.amount;
    });
    
    // Convert to chart data format
    return Object.keys(categoryMap).map(category => ({
      name: category,
      value: categoryMap[category],
      color: getCategoryColor(category as ExpenseCategory)
    }));
  };
  
  const chartData = getCategoryData();
  const totalSpent = chartData.reduce((sum, item) => sum + item.value, 0);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Expense Analysis</CardTitle>
          <Tabs value={chartType} onValueChange={(value) => setChartType(value as 'pie' | 'bar')} className="ml-auto">
            <TabsList className="grid w-[180px] grid-cols-2">
              <TabsTrigger value="pie" className="flex items-center gap-2">
                <PieChartIcon size={16} />
                <span>Pie Chart</span>
              </TabsTrigger>
              <TabsTrigger value="bar" className="flex items-center gap-2">
                <BarChartHorizontal size={16} />
                <span>Bar Chart</span>
              </TabsTrigger>
            </TabsList>
            {chartData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-500 mt-6">
                No expense data available for the selected period
              </div>
            ) : (
              <>
                <TabsContent value="pie" className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="bar" className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} />
                      <Bar dataKey="value" barSize={20}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
        <div className="flex items-center justify-between">
          <CardDescription>
            Total Spent: <span className="font-semibold">${totalSpent.toFixed(2)}</span>
          </CardDescription>
          <div className="w-40">
            <Select value={period} onValueChange={(value) => setPeriod(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="last3Months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {/* This section is now moved inside the Tabs component above */}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
