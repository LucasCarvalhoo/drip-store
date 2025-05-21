// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, getUserProfile } from '../services/authService';

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
            console.error('Error loading user profile:', profileError);
            // Don't set error here, as we still have the user
          }
        } else {
          // No user is logged in - this is a normal state, not an error
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        // Only log the error, don't set it in state unless it's not an auth session missing error
        console.error('Error checking authentication:', error);
        
        // If it's NOT an auth session missing error, then set it as an error state
        if (!error.message || !error.message.includes('Auth session missing')) {
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

  const value = {
    user,
    profile,
    loading,
    error,
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