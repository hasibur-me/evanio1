// Performance Monitoring Utilities

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoadTime: 0,
      domContentLoaded: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      timeToInteractive: 0,
      errors: [],
      apiCalls: [],
    };
    this.init();
  }

  init() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.measurePageLoad();
      this.trackErrors();
      this.trackApiCalls();
      this.trackWebVitals();
    }
  }

  measurePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      }
    });
  }

  trackWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Contentful Paint (FCP)
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
      if (entries.length > 0) {
        this.metrics.firstContentfulPaint = entries[0].startTime;
      }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observer not supported');
      }
    }
  }

  trackErrors() {
    window.addEventListener('error', (event) => {
      this.metrics.errors.push({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: new Date().toISOString(),
        stack: event.error?.stack,
      });
      this.reportError(event);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.metrics.errors.push({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        timestamp: new Date().toISOString(),
        stack: event.reason?.stack,
      });
      this.reportError(event);
    });
  }

  trackApiCalls() {
    // This would typically be done via axios interceptors
    // For now, we'll track fetch calls
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        this.metrics.apiCalls.push({
          url: args[0],
          method: 'GET',
          duration: endTime - startTime,
          status: response.status,
          timestamp: new Date().toISOString(),
        });
        return response;
      } catch (error) {
        const endTime = performance.now();
        this.metrics.apiCalls.push({
          url: args[0],
          method: 'GET',
          duration: endTime - startTime,
          status: 'error',
          error: error.message,
          timestamp: new Date().toISOString(),
        });
        throw error;
      }
    };
  }

  reportError(error) {
    // Send error to monitoring service (e.g., Sentry, LogRocket)
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error tracking service
      console.error('Error tracked:', error);
      // fetch('/api/errors', {
      //   method: 'POST',
      //   body: JSON.stringify({ error }),
      // });
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      timestamp: new Date().toISOString(),
    };
  }

  getPerformanceScore() {
    const scores = {
      pageLoadTime: this.metrics.pageLoadTime < 2000 ? 100 : this.metrics.pageLoadTime < 4000 ? 75 : 50,
      lcp: this.metrics.largestContentfulPaint < 2500 ? 100 : this.metrics.largestContentfulPaint < 4000 ? 75 : 50,
      fcp: this.metrics.firstContentfulPaint < 1800 ? 100 : this.metrics.firstContentfulPaint < 3000 ? 75 : 50,
    };
    return Math.round((scores.pageLoadTime + scores.lcp + scores.fcp) / 3);
  }

  checkUptime() {
    // Simple uptime check - in production, this would ping your server
    return fetch('/api/health')
      .then((res) => res.ok)
      .catch(() => false);
  }

  getSpeedAlerts() {
    const alerts = [];
    if (this.metrics.pageLoadTime > 3000) {
      alerts.push({
        type: 'warning',
        message: `Page load time is ${Math.round(this.metrics.pageLoadTime)}ms (target: <2000ms)`,
      });
    }
    if (this.metrics.largestContentfulPaint > 2500) {
      alerts.push({
        type: 'warning',
        message: `LCP is ${Math.round(this.metrics.largestContentfulPaint)}ms (target: <2500ms)`,
      });
    }
    if (this.metrics.errors.length > 0) {
      alerts.push({
        type: 'error',
        message: `${this.metrics.errors.length} error(s) detected`,
      });
    }
    return alerts;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Note: React hooks should be in a separate file or component
// This utility provides the monitoring class only

