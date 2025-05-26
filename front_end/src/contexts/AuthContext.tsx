import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '@/api';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const response = await api.get('/auth/user/');
          setUser({
            id: response.data.id,
            email: response.data.email,
            name: response.data.name || response.data.email.split('@')[0]
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login/', {
        email,
        password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      const userResponse = await api.get('/auth/user/');
      setUser({
        id: userResponse.data.id,
        email: userResponse.data.email,
        name: userResponse.data.name // This will now be the full name from the backend
      });

      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };
const signup = async (email: string, password: string, name: string) => {
  try {
    const response = await api.post('/auth/register/', {
      email,
      password,
      password2: password,  // Include password confirmation
      name: name || '',     // Send empty string if name not provided
      role: 'patient',     // Default role
    });
    
    toast.success('Registration successful! Please login.');
    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle specific error messages from backend
      const errorMsg = error.response.data?.error || 
                      error.response.data?.password?.[0] ||
                      'Registration failed. Please try again.';
      toast.error(errorMsg);
    } else {
      toast.error('Network error. Please try again.');
    }
    throw error;
  }
};


  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};