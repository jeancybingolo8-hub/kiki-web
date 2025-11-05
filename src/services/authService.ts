import { supabase } from './supabaseClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
  userType: 'candidate' | 'recruiter';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: any;
  session?: any;
  error?: string;
}

/**
 * Login user with email and password
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { success: false, message: error.message, error: error.message };
    }

    return {
      success: true,
      message: 'Login successful',
      user: data.user,
      session: data.session,
    };
  } catch (err: any) {
    return { success: false, message: 'Login failed', error: err.message };
  }
}

/**
 * Register new user with email and password
 */
export async function signup(credentials: SignupCredentials): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
          user_type: credentials.userType,
        },
      },
    });

    if (error) {
      return { success: false, message: error.message, error: error.message };
    }

    return {
      success: true,
      message: 'Signup successful. Please check your email to confirm your account.',
      user: data.user,
    };
  } catch (err: any) {
    return { success: false, message: 'Signup failed', error: err.message };
  }
}

/**
 * Logout current user
 */
export async function logout(): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, message: error.message, error: error.message };
    }

    return { success: true, message: 'Logout successful' };
  } catch (err: any) {
    return { success: false, message: 'Logout failed', error: err.message };
  }
}

/**
 * Get current session
 */
export async function getCurrentSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
