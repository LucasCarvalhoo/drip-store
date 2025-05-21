// src/services/authService.js
import { supabase } from './supabase';

export const signUp = async (email, password, userData) => {
  // 1. Register the user with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  // 2. Create the user profile with additional data
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('perfil_usuario')
      .insert({
        id: authData.user.id,
        nome_completo: userData.nome,
        cpf: userData.cpf,
        celular: userData.celular,
        endereco: userData.endereco,
        bairro: userData.bairro,
        cidade: userData.cidade,
        estado: userData.estado,
        cep: userData.cep,
        complemento: userData.complemento,
        receber_ofertas: userData.receberOfertas
      });

    if (profileError) {
      // If profile creation fails, we should handle this case
      console.error('Error creating user profile:', profileError);
      // Ideally delete the auth user or handle this case
    }
  }

  return authData;
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) throw error;
  return data?.user || null;
};

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('perfil_usuario')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};