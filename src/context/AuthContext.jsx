import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Auth Context
export const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true); // To indicate initial loading/auth check
  const [error, setError] = useState(null);

  // Base URL for your backend API
  // CORRECTED: Use import.meta.env for Vite/modern bundlers
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  // Function to save token and user data
  const saveAuthData = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Function to clear token and user data
  const clearAuthData = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Function to fetch user profile (e.g., on app load or after token refresh)
  const fetchUserProfile = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // If token is invalid or expired, clear it
        clearAuthData();
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user)); // Update user in local storage
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err.message);
      clearAuthData(); // Clear auth data on error
    } finally {
      setLoading(false);
    }
  };

  // Effect to check for existing token and fetch user profile on component mount
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []); // Run only once on mount

  // Login function
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      saveAuthData(data.token, data.user);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      saveAuthData(data.token, data.user);
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    clearAuthData();
  };

  const authContextValue = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
