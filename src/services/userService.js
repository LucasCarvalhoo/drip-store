// src/services/userService.js
import { supabase } from './supabase';

// Get user payment methods
export const getUserPaymentMethods = async (userId) => {
  const { data, error } = await supabase
    .from('metodos_pagamento_usuario')
    .select('*')
    .eq('usuario_id', userId)
    .order('padrao', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Add a new payment method
export const addPaymentMethod = async (userId, paymentData) => {
  // Check if this is the first card to make it the default
  const { data: existingCards } = await supabase
    .from('metodos_pagamento_usuario')
    .select('id')
    .eq('usuario_id', userId);
  
  const isFirstCard = !existingCards || existingCards.length === 0;
  
  const { data, error } = await supabase
    .from('metodos_pagamento_usuario')
    .insert({
      usuario_id: userId,
      tipo: paymentData.tipo,
      bandeira: paymentData.bandeira,
      ultimos_digitos: paymentData.ultimos_digitos,
      data_validade: paymentData.data_validade,
      nome_titular: paymentData.nome_titular,
      padrao: isFirstCard ? true : false
    })
    .select();

  if (error) throw error;
  return data;
};

// Set a payment method as default
export const setDefaultPaymentMethod = async (userId, methodId) => {
  // First, set all methods to non-default
  const { error: updateError } = await supabase
    .from('metodos_pagamento_usuario')
    .update({ padrao: false })
    .eq('usuario_id', userId);
  
  if (updateError) throw updateError;
  
  // Then set the selected method as default
  const { data, error } = await supabase
    .from('metodos_pagamento_usuario')
    .update({ padrao: true })
    .eq('id', methodId)
    .eq('usuario_id', userId)
    .select();

  if (error) throw error;
  return data;
};

// Remove a payment method
export const removePaymentMethod = async (userId, methodId) => {
  const { error } = await supabase
    .from('metodos_pagamento_usuario')
    .delete()
    .eq('id', methodId)
    .eq('usuario_id', userId);

  if (error) throw error;
  return true;
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('perfil_usuario')
    .update(profileData)
    .eq('id', userId)
    .select();

  if (error) throw error;
  return data;
};