
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/signup';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {!isAuthPage && <Header />}
      <main className="animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout;
