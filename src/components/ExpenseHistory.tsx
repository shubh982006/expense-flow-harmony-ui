import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  UtensilsCrossed, 
  Plane, 
  Heart, 
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  Baby,
  MoreHorizontal,
  Search,
  Trash2
} from 'lucide-react';
import { Expense, ExpenseCategory } from '@/utils/types';
import { Button } from '@/components/ui/button';

interface ExpenseHistoryProps {
  expenses: Expense[];
  onDeleteExpense: (expenseId: string) => void;
}

const getCategoryIcon = (category: ExpenseCategory) => {
  switch (category) {
    case 'Food': return <UtensilsCrossed size={18} />;
    case 'Travel': return <Plane size={18} />;
    case 'Social Life': return <Heart size={18} />;
    case 'Shopping': return <ShoppingCart size={18} />;
    case 'Health': return <Stethoscope size={18} />;
    case 'Education': return <GraduationCap size={18} />;
    case 'Kids & Protection': return <Baby size={18} />;
    case 'Miscellaneous': return <MoreHorizontal size={18} />;
    default: return <MoreHorizontal size={18} />;
  }
};

const getCategoryColor = (category: ExpenseCategory): string => {
  switch (category) {
    case 'Food': return 'bg-expense-food';
    case 'Travel': return 'bg-expense-travel';
    case 'Social Life': return 'bg-expense-social';
    case 'Shopping': return 'bg-expense-shopping';
    case 'Health': return 'bg-expense-health';
    case 'Education': return 'bg-expense-education';
    case 'Kids & Protection': return 'bg-expense-kids';
    case 'Miscellaneous': return 'bg-expense-misc';
    default: return 'bg-gray-400';
  }
};

const ExpenseHistory: React.FC<ExpenseHistoryProps> = ({ expenses, onDeleteExpense }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredExpenses = expenses.filter(expense => 
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group expenses by date
  const groupedExpenses: Record<string, Expense[]> = {};
  filteredExpenses.forEach(expense => {
    const dateKey = format(expense.date, 'yyyy-MM-dd');
    if (!groupedExpenses[dateKey]) {
      groupedExpenses[dateKey] = [];
    }
    groupedExpenses[dateKey].push(expense);
  });
  
  const sortedDates = Object.keys(groupedExpenses).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Expense History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Filter by category..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {filteredExpenses.length === 0 ? (
            <div className="text-center p-4 text-gray-500">
              No expenses found
            </div>
          ) : (
            sortedDates.map(dateKey => (
              <div key={dateKey} className="space-y-2">
                <div className="text-sm font-medium text-gray-500">
                  {format(new Date(dateKey), 'EEEE, MMM d, yyyy')}
                </div>
                
                {groupedExpenses[dateKey].map(expense => (
                  <div
                    key={expense.id}
                    className="expense-card bg-white rounded-lg p-3 border border-gray-100 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${getCategoryColor(expense.category)} w-8 h-8 rounded-full flex items-center justify-center text-white`}>
                        {getCategoryIcon(expense.category)}
                      </div>
                      <div>
                        <div className="font-medium">{expense.category}</div>
                        <div className="text-xs text-gray-500">
                          {format(expense.date, 'h:mm a')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">${expense.amount.toFixed(2)}</div>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteExpense(expense.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseHistory;
