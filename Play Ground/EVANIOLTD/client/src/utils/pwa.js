// PWA Utilities
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

export const requestNotificationPermission = async () => {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const showInstallPrompt = () => {
  // This will be handled by the browser's install prompt
  // We'll create a custom install button component
  return true;
};

export const isInstallable = () => {
  // Check if PWA is installable
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone ||
         document.referrer.includes('android-app://');
};

export const isOnline = () => {
  return navigator.onLine;
};

export const setupOfflineListener = (callback) => {
  window.addEventListener('online', () => {
    callback(true);
  });
  
  window.addEventListener('offline', () => {
    callback(false);
  });
};

