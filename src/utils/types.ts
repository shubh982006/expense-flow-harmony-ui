
export type ExpenseCategory = 
  | "Food" 
  | "Travel" 
  | "Social Life" 
  | "Shopping" 
  | "Health" 
  | "Education" 
  | "Kids & Protection"
  | "Miscellaneous";

export interface Expense {
  id: string;
  amount: number;
  date: Date;
  category: ExpenseCategory;
}

export interface User {
  id: string;
  username: string;
  balance: number;
  fixedDeduction: number;
}

// Mock data for development
export const mockExpenses: Expense[] = [
  {
    id: '1',
    amount: 25.99,
    date: new Date('2025-04-10'),
    category: 'Food'
  },
  {
    id: '2',
    amount: 45.50,
    date: new Date('2025-04-09'),
    category: 'Travel'
  },
  {
    id: '3',
    amount: 120.00,
    date: new Date('2025-04-07'),
    category: 'Shopping'
  },
  {
    id: '4',
    amount: 60.25,
    date: new Date('2025-04-05'),
    category: 'Health'
  },
  {
    id: '5',
    amount: 35.75,
    date: new Date('2025-04-03'),
    category: 'Education'
  },
  {
    id: '6',
    amount: 15.00,
    date: new Date('2025-04-01'),
    category: 'Social Life'
  }
];

export const mockUser: User = {
  id: '1',
  username: 'John Doe',
  balance: 2456.78,
  fixedDeduction: 500.00
};

export const getCategoryColor = (category: ExpenseCategory): string => {
  switch (category) {
    case 'Food': return '#FF6B6B';
    case 'Travel': return '#4ECDC4';
    case 'Social Life': return '#FFD166';
    case 'Shopping': return '#6A0572';
    case 'Health': return '#1A936F';
    case 'Education': return '#3D5A80';
    case 'Kids & Protection': return '#E07A5F';
    case 'Miscellaneous': return '#8D99AE';
    default: return '#8D99AE';
  }
};

export const getCategoryIcon = (category: ExpenseCategory): string => {
  switch (category) {
    case 'Food': return 'utensils';
    case 'Travel': return 'plane';
    case 'Social Life': return 'heart';
    case 'Shopping': return 'shopping-cart';
    case 'Health': return 'stethoscope';
    case 'Education': return 'graduation-cap';
    case 'Kids & Protection': return 'child';
    case 'Miscellaneous': return 'ellipsis-h';
    default: return 'question';
  }
};
