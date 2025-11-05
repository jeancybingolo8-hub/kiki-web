import React, { createContext, useState, useCallback, useEffect } from 'react';
import * as authService from '../services/authService';

export interface User {
  id: string;
  email: string;
  name?: string;
  userType?: 'candidate' | 'recruiter';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, userType: 'candidate' | 'recruiter') => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email || '',
            name: currentUser.user_metadata?.name,
            userType: currentUser.user_metadata?.user_type,
          });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.user) {
        setUser({
          id: response.user.id,
          email: response.user.email || '',
          name: response.user.user_metadata?.name,
          userType: response.user.user_metadata?.user_type,
        });
      } else {
        throw new Error(response.error || response.message);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const signup = useCallback(async (
    email: string,
    password: string,
    name: string,
    userType: 'candidate' | 'recruiter'
  ) => {
    try {
      const response = await authService.signup({ email, password, name, userType });
      if (response.success && response.user) {
        setUser({
          id: response.user.id,
          email: response.user.email || '',
          name,
          userType,
        });
      } else {
        throw new Error(response.error || response.message);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await authService.logout();
      if (response.success) {
        setUser(null);
      } else {
        throw new Error(response.error || response.message);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
