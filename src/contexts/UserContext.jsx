// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, getUserProfile } from '../services/authService';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user session on load
    const loadUser = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
          
          // Fetch user profile data
          const profileData = await getUserProfile(currentUser.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const value = {
    user,
    profile,
    loading,
    setUser,
    setProfile
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};