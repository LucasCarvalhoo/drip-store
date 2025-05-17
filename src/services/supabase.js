// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Obter variáveis de ambiente (em produção, estas devem estar configuradas no ambiente)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variáveis de ambiente do Supabase não configuradas!');
}

// Criar cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);