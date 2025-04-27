
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, any valid input will work
      toast.success('Account created successfully!');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
            ExpenseFlow
          </h1>
          <p className="mt-2 text-gray-600">Start your expense tracking journey</p>
        </div>
        
        <Card className="border-0 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded text-teal-500 focus:ring-teal-500" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-teal-600 hover:text-teal-500">Terms of Service</a> and <a href="#" className="text-teal-600 hover:text-teal-500">Privacy Policy</a>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Sign Up
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/" className="text-teal-600 hover:text-teal-500 font-medium">Login</Link>
            </p>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-sm text-gray-600">
          © 2025 ExpenseFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Signup;
