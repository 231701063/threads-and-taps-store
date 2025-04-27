
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../utils/types';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function - this would connect to an authentication service in a real app
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes only - simple validation
      if (email === 'user@example.com' && password === 'password') {
        const newUser = {
          id: '123',
          name: 'John Doe',
          email,
          isAdmin: false
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast({
          title: "Login successful",
          description: "Welcome back, John Doe!",
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock admin login
  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes only
      if (email === 'admin@example.com' && password === 'admin123') {
        const newUser = {
          id: 'admin1',
          name: 'Admin User',
          email,
          isAdmin: true
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast({
          title: "Admin login successful",
          description: "Welcome back, Admin!",
        });
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      toast({
        title: "Admin login failed",
        description: "Invalid email or password.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes only
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        isAdmin: false
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast({
        title: "Registration successful",
        description: `Welcome to our store, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
