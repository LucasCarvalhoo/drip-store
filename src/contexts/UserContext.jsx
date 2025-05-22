// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getCurrentUser,
  getUserProfile,
  signOut as authServiceSignOut,
} from "../services/authService";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for user session on load
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentUser = await getCurrentUser();

        if (currentUser) {
          setUser(currentUser);

          // Fetch user profile data
          try {
            const profileData = await getUserProfile(currentUser.id);
            setProfile(profileData);
          } catch (profileError) {
            console.error("Error loading user profile:", profileError);
            // Don't set error here, as we still have the user
          }
        } else {
          // No user is logged in - this is a normal state, not an error
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        // Only log the error, don't set it in state unless it's not an auth session missing error
        console.error("Error checking authentication:", error);

        // If it's NOT an auth session missing error, then set it as an error state
        if (!error.message || !error.message.includes("Auth session missing")) {
          setError(error);
        }

        // Clear user and profile in case of error
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Função para fazer logout do usuário
  const logoutUser = async () => {
    try {
      await authServiceSignOut(); // Chama a função signOut importada do authService
      setUser(null); // Limpa o usuário do estado do contexto
      setProfile(null); // Limpa o perfil do estado do contexto
      setError(null); // Limpa quaisquer erros anteriores
    } catch (err) {
      console.error("Erro durante o processo de logout:", err);
      setError(err); // Define um estado de erro se o logout falhar
    }
  };

  const value = {
    user,
    profile,
    loading,
    error,
    setUser,
    setProfile,
    logoutUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
