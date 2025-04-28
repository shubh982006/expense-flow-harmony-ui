import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ApiTest from "./components/ApiTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm p-4">
              <div className="container mx-auto flex space-x-4">
                <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
                <Link to="/signup" className="text-blue-600 hover:text-blue-800">Signup</Link>
                <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
                <Link to="/api-test" className="text-blue-600 hover:text-blue-800">API Test</Link>
              </div>
            </nav>
            <main className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/api-test" element={<ApiTest />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
