import { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle({ variant = 'button' }) {
  const { theme, toggleTheme, setTheme, mounted } = useDarkMode();
  const [showMenu, setShowMenu] = useState(false);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-white/10 dark:bg-gray-800/30 animate-pulse flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-white/20"></div>
      </div>
    );
  }

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Theme toggle clicked! Current theme:', theme);
    toggleTheme();
  };

  const handleSetTheme = (mode, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Setting theme to:', mode);
    setTheme(mode);
    setShowMenu(false);
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        onMouseDown={(e) => e.preventDefault()}
        className="w-10 h-10 p-0 bg-white/10 dark:bg-gray-800/30 hover:bg-white/20 dark:hover:bg-gray-700/50 border border-white/30 dark:border-gray-700/30 text-white dark:text-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        type="button"
        title={`Current: ${theme}. Click to toggle`}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    );
  }

  // Dropdown variant
  return (
    <div className="relative z-50">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Menu toggle clicked, current showMenu:', showMenu);
          setShowMenu(!showMenu);
        }}
        onMouseDown={(e) => e.preventDefault()}
        className="w-10 h-10 p-0 bg-white/10 dark:bg-gray-800/30 hover:bg-white/20 dark:hover:bg-gray-700/50 border border-white/30 dark:border-gray-700/30 text-white dark:text-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
        aria-label="Theme options"
        type="button"
        title={`Current: ${theme}. Click for options`}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Backdrop clicked, closing menu');
              setShowMenu(false);
            }}
          />
          <div 
            className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-lg shadow-xl z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              <button
                onClick={(e) => handleSetTheme('light', e)}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors ${
                  theme === 'light' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}
                type="button"
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={(e) => handleSetTheme('dark', e)}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors ${
                  theme === 'dark' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}
                type="button"
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm font-medium">Dark</span>
              </button>
              <button
                onClick={(e) => handleSetTheme('system', e)}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors ${
                  typeof window !== 'undefined' && (localStorage.getItem('theme') === null || localStorage.getItem('theme') === 'system')
                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                type="button"
              >
                <Monitor className="w-4 h-4" />
                <span className="text-sm font-medium">System</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
