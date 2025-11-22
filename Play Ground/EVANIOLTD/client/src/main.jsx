import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { optimizeTouchInteractions } from './utils/mobileOptimization';
import { initAnalytics } from './utils/analytics';
import { registerServiceWorker } from './utils/pwa';
import './index.css';
import './i18n/config.js';

// Optimize mobile interactions on load
optimizeTouchInteractions();

// Initialize Analytics
if (typeof window !== 'undefined') {
  const analytics = initAnalytics();
  window.analytics = analytics; // Make available globally
}

// Register Service Worker for PWA
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  registerServiceWorker();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);


