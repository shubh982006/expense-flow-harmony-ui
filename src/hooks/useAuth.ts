import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  monthlyIncome: number;
  fixedDeduction: number;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // For now, we'll set a mock user with the name "Shubhi"
        setUser({
          id: 1,
          username: 'Shubhi',
          monthlyIncome: 5000.00,
          fixedDeduction: 500.00
        });
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const updateFixedDeduction = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        fixedDeduction: amount
      });
    }
  };

  const updateMonthlyIncome = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        monthlyIncome: amount
      });
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    updateFixedDeduction,
    updateMonthlyIncome
  };
} 