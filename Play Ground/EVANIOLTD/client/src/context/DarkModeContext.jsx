import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Get initial theme - must be a function that can run on both server and client
const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'; // Default for SSR
  }
  
  try {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      console.log('Found saved theme:', savedTheme);
      return savedTheme;
    }
    
    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('Using system preference: dark');
      return 'dark';
    }
    
    console.log('Using default theme: light');
    return 'light';
  } catch (error) {
    console.error('Error getting initial theme:', error);
    return 'light';
  }
};

// Apply theme to document immediately (before React hydration)
if (typeof window !== 'undefined') {
  try {
    const initialTheme = getInitialTheme();
    const root = document.documentElement;
    
    if (initialTheme === 'dark') {
      root.classList.add('dark');
      console.log('Applied dark class to root element');
    } else {
      root.classList.remove('dark');
      console.log('Removed dark class from root element');
    }
  } catch (error) {
    console.error('Error applying initial theme:', error);
  }
}

export const DarkModeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const initial = getInitialTheme();
    console.log('DarkModeProvider initialized with theme:', initial);
    return initial;
  });
  const [mounted, setMounted] = useState(false);

  // Apply theme to document on changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setMounted(true);
    const root = document.documentElement;
    
    console.log('Applying theme:', theme);
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    try {
      localStorage.setItem('theme', theme);
      console.log('Saved theme to localStorage:', theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      try {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme || savedTheme === 'system') {
          console.log('System preference changed, updating theme');
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch (error) {
        console.error('Error handling system preference change:', error);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    console.log('toggleTheme called, current theme:', theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      console.log('Toggling theme from', prevTheme, 'to', newTheme);
      return newTheme;
    });
  };

  const setThemeMode = (mode) => {
    console.log('setThemeMode called with mode:', mode);
    if (mode === 'system') {
      // Remove saved preference and use system
      try {
        localStorage.removeItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        console.log('Setting system theme:', systemTheme);
        setTheme(systemTheme);
      } catch (error) {
        console.error('Error setting system theme:', error);
      }
    } else {
      console.log('Setting theme to:', mode);
      setTheme(mode);
    }
  };

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeMode, mounted }}>
      {children}
    </DarkModeContext.Provider>
  );
};
