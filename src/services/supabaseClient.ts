import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export types for TypeScript support
export type Database = any; // Will be generated from Supabase
export type User = any;
export type Profile = any;
export type Offer = any;
