
export interface UserRegisterData {
  username: string;
  password: string;
  email: string;
}

export interface ExpenseCreate {
  category: string;
  amount: number;
  date: string;
}

export interface IncomeUpdate {
  salary: number;
  fixedExpenses: number;
  date: string;
}

export interface ExpenseSummary {
  totalExpenses: number;
  averageExpense: number;
  highestCategory: string;
  lowestCategory: string;
}
