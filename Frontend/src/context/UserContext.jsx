import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userProfile = localStorage.getItem('userProfile');
        
        if (token && userProfile) {
          const userData = JSON.parse(userProfile);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // Listen for auth changes
    const handleAuthChange = () => {
      loadUser();
    };

    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  // Login function
  const login = (userData, token) => {
    try {
      // Save to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userProfile', JSON.stringify(userData));
      localStorage.setItem('userName', userData.name || userData.firstName);
      localStorage.setItem('userEmail', userData.email);
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      // Dispatch event
      window.dispatchEvent(new Event('auth-change'));
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      
      // Update state
      setUser(null);
      setIsAuthenticated(false);
      
      // Dispatch event
      window.dispatchEvent(new Event('auth-change'));
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Update user data
  const updateUser = (updatedData) => {
    try {
      const newUserData = { ...user, ...updatedData };
      localStorage.setItem('userProfile', JSON.stringify(newUserData));
      setUser(newUserData);
      window.dispatchEvent(new Event('auth-change'));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
