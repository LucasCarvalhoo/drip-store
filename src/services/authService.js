// src/services/authService.js
import { supabase } from './supabase';

/**
 * Register a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {Object} userData - Additional user profile data
 * @returns {Promise<Object>} The created user and session
 */
export const signUp = async (email, password, userData) => {
  try {
    // 1. Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // 2. Create the user profile with additional data
    if (authData?.user) {
      try {
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
          console.error('Error creating user profile:', profileError);
          // We might want to handle this differently, like deleting the auth user
          // but for now just log it and continue
        }
      } catch (profileError) {
        console.error('Exception creating user profile:', profileError);
        // Continue with authentication anyway
      }
    }

    // This is a better response structure
    return {
      user: authData?.user || null,
      session: authData?.session || null
    };
  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
};

/**
 * Sign in a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} The authenticated user and session
 */
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * Get the current logged-in user
 * @returns {Promise<Object|null>} The current user or null if not logged in
 */
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) throw error;
  return data?.user || null;
};

/**
 * Get the user profile data
 * @param {string} userId - The user ID to get the profile for
 * @returns {Promise<Object|null>} The user profile data
 */
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('perfil_usuario')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};