import { createClient } from '@supabase/supabase-js';
// Use VITE_ prefix for frontend variables
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase VITE_ env variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);