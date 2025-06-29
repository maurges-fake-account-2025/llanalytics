import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { authAPI, LoginRequest } from '../services/auth';

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
}

interface AuthContextState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (authAPI.isAuthenticated()) {
          const userData = authAPI.getUser();
          if (userData) {
            console.log('AuthContext: Found existing user data:', userData);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear invalid data
        authAPI.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (login: string, password: string) => {
    console.log('AuthContext: Login attempt for:', login);
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login({ login, password });
      
      if (response.success && response.user) {
        console.log('AuthContext: Login successful, setting user:', response.user);
        setUser(response.user);
      } else {
        const errorMessage = response.message || 'Login failed';
        console.error('AuthContext: Login failed:', errorMessage);
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      // If it's already our custom error, re-throw it
      if (error instanceof Error) {
        throw error;
      }
      // Otherwise, create a generic error
      const errorMessage = 'An unexpected error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    console.log('AuthContext: Logout called');
    setLoading(true);
    try {
      await authAPI.logout();
      setUser(null);
      setError(null);
      console.log('AuthContext: Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextState = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    clearError,
  };

  console.log('AuthContext: Current state:', { 
    isAuthenticated: !!user, 
    loading, 
    user: user?.name || 'none' 
  });

  return (
    <AuthContext.Provider value={value}>
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