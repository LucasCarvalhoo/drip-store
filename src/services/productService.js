import { supabase } from './supabase';

export const getProducts = async (filters = {}) => {
  let query = supabase.from('products').select('*');
  
  // Apply filters
  if (filters.category) {
    query = query.eq('category_id', filters.category);
  }
  
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};