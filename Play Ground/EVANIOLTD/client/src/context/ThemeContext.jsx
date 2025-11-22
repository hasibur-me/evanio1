import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default values if not in provider (graceful degradation)
    return { 
      theme: null, 
      loading: false, 
      updateTheme: async () => {}, 
      refreshTheme: async () => {} 
    };
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThemeSettings();
  }, []);

  const fetchThemeSettings = async () => {
    try {
      const response = await api.get('/theme');
      setTheme(response.data);
    } catch (error) {
      console.error('Error fetching theme settings:', error);
      // Use default theme if API fails
      setTheme(null);
    } finally {
      setLoading(false);
    }
  };

  const updateTheme = async (newTheme) => {
    try {
      const response = await api.put('/theme', newTheme);
      setTheme(response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating theme:', error);
      throw error;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, loading, updateTheme, refreshTheme: fetchThemeSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

