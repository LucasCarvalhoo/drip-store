// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Obter variáveis de ambiente (em produção, estas devem estar configuradas no ambiente)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar se as variáveis de ambiente estão definidas
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are not set! Using fallback values.');
  console.warn('To properly set up your environment, create a .env.local file with:');
  console.warn('VITE_SUPABASE_URL=https://your-project-id.supabase.co');
  console.warn('VITE_SUPABASE_ANON_KEY=your-anon-key');
}

// Criar cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);