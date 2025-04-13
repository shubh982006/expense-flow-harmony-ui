
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, User, PieChart, Home } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, we'd clear authentication state here
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">ExpenseFlow</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-teal-500 transition-colors">
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-teal-500 transition-colors">
            <PieChart size={18} />
            <span>Reports</span>
          </Link>
          <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-teal-500 transition-colors">
            <User size={18} />
            <span>Profile</span>
          </Link>
        </nav>
        
        <Button 
          variant="ghost" 
          onClick={handleLogout} 
          className="text-gray-700 hover:text-red-500 hover:bg-red-50"
        >
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
