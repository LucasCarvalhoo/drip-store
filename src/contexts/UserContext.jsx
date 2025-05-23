// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getCurrentUser,
  getUserProfile, // Já importado, ótimo!
  signOut as authServiceSignOut,
} from "../services/authService";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserAndProfileOnMount = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          try {
            const profileData = await getUserProfile(currentUser.id); // Usa authService.getUserProfile
            setProfile(profileData);
          } catch (profileError) {
            console.error("Error loading user profile on mount:", profileError);
            setProfile(null);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (authError) {
        console.error("Error checking authentication on mount:", authError);
        if (!authError.message || !authError.message.includes("Auth session missing")) {
          setError(authError);
        }
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    loadUserAndProfileOnMount();
  }, []);

  // Função para fazer logout do usuário
  const logoutUser = async () => {
    try {
      setLoading(true); // Adicionar loading no logout também
      await authServiceSignOut();
      setUser(null);
      setProfile(null);
      setError(null);
    } catch (err) {
      console.error("Erro durante o processo de logout:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // NOVA FUNÇÃO: Para ser chamada após login/signup bem-sucedido
  const updateUserAndFetchProfile = async (loggedInUser) => {
    setUser(loggedInUser); // Define o usuário Supabase
    if (loggedInUser && loggedInUser.id) {
      setLoading(true); // Indica carregamento do perfil
      setError(null);
      try {
        console.log(`Workspaceing profile for user ID: ${loggedInUser.id}`);
        const profileData = await getUserProfile(loggedInUser.id); // Busca o perfil
        console.log("Profile data fetched after login/signup:", profileData);
        setProfile(profileData); // Define o perfil no contexto
      } catch (profileError) {
        console.error("Error loading user profile after login/signup:", profileError);
        setProfile(null);
        // setError(profileError); // Opcional: definir erro se a busca do perfil falhar criticamente
      } finally {
        setLoading(false);
      }
    } else {
      // Se loggedInUser for nulo ou inválido, limpa o perfil.
      setProfile(null);
      if (!loggedInUser) {
        console.warn("updateUserAndFetchProfile foi chamada com usuário nulo ou inválido.");
      }
    }
  };

  const value = {
    user,
    profile,
    loading,
    error,
    setUser, // Mantido para flexibilidade, mas preferir updateUserAndFetchProfile após login
    setProfile,
    logoutUser,
    updateUserAndFetchProfile, // <-- EXPOR A NOVA FUNÇÃO
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};