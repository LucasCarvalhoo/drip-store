// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing!');
  console.error('Please create a .env.local file with:');
  console.error('VITE_SUPABASE_URL=your_project_url');
  console.error('VITE_SUPABASE_ANON_KEY=your_anon_key');
  throw new Error('Supabase configuration is incomplete. Check your environment variables.');
}

// Validate URL format
if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
  console.error('Invalid Supabase URL format. Expected: https://your-project.supabase.co');
  throw new Error('Invalid Supabase URL format');
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});