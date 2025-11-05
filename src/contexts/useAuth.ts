import { useContext } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

/**
 * Hook to use the AuthContext
 * Must be used inside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
