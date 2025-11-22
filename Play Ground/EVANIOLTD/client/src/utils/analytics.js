// Advanced Analytics Utility
class Analytics {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userJourney = [];
    this.clickEvents = [];
    this.scrollDepth = 0;
    this.maxScrollDepth = 0;
    this.heatmapData = [];
    this.conversionFunnels = {};
    this.init();
  }

  init() {
    this.trackPageView();
    this.trackClicks();
    this.trackScrollDepth();
    this.trackUserJourney();
    this.trackHeatmap();
    this.saveToLocalStorage();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Page View Tracking
  trackPageView() {
    const pageData = {
      type: 'pageview',
      url: window.location.href,
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      screenSize: {
        width: window.screen.width,
        height: window.screen.height,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    this.events.push(pageData);
    this.userJourney.push({
      action: 'pageview',
      page: window.location.pathname,
      timestamp: Date.now(),
    });
  }

  // Click Tracking
  trackClicks() {
    document.addEventListener('click', (e) => {
      const element = e.target;
      const clickData = {
        type: 'click',
        element: {
          tag: element.tagName,
          id: element.id || null,
          className: element.className || null,
          text: element.textContent?.substring(0, 50) || null,
          href: element.href || null,
        },
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        page: window.location.pathname,
      };

      this.clickEvents.push(clickData);
      this.heatmapData.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
        page: window.location.pathname,
      });

      // Store in localStorage for heatmap
      this.saveHeatmapData();
    });
  }

  // Scroll Depth Tracking
  trackScrollDepth() {
    let lastScrollDepth = 0;
    const milestones = [25, 50, 75, 90, 100];

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      this.scrollDepth = scrollPercent;
      this.maxScrollDepth = Math.max(this.maxScrollDepth, scrollPercent);

      // Track milestone achievements
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && lastScrollDepth < milestone) {
          this.trackEvent('scroll_depth', {
            depth: milestone,
            page: window.location.pathname,
            timestamp: Date.now(),
          });
        }
      });

      lastScrollDepth = scrollPercent;
    });
  }

  // User Journey Tracking
  trackUserJourney() {
    // Track navigation
    window.addEventListener('popstate', () => {
      this.userJourney.push({
        action: 'navigation',
        page: window.location.pathname,
        timestamp: Date.now(),
        type: 'back',
      });
    });

    // Track form interactions
    document.addEventListener('focusin', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        this.userJourney.push({
          action: 'form_focus',
          element: e.target.name || e.target.id,
          page: window.location.pathname,
          timestamp: Date.now(),
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      this.userJourney.push({
        action: 'form_submit',
        form: e.target.id || e.target.className,
        page: window.location.pathname,
        timestamp: Date.now(),
      });
    });
  }

  // Heatmap Data Collection
  trackHeatmap() {
    // Track mouse movements for heatmap
    let mouseMoveThrottle = 0;
    document.addEventListener('mousemove', (e) => {
      mouseMoveThrottle++;
      if (mouseMoveThrottle % 10 === 0) {
        this.heatmapData.push({
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now(),
          page: window.location.pathname,
          type: 'mousemove',
        });
      }
    });
  }

  // Conversion Funnel Tracking
  trackFunnelStep(funnelName, stepName, data = {}) {
    if (!this.conversionFunnels[funnelName]) {
      this.conversionFunnels[funnelName] = {
        steps: [],
        startTime: Date.now(),
      };
    }

    this.conversionFunnels[funnelName].steps.push({
      step: stepName,
      timestamp: Date.now(),
      data,
    });

    this.trackEvent('funnel_step', {
      funnel: funnelName,
      step: stepName,
      data,
    });
  }

  // Generic Event Tracking
  trackEvent(eventName, data = {}) {
    const event = {
      type: 'event',
      name: eventName,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      page: window.location.pathname,
    };

    this.events.push(event);
    this.saveToLocalStorage();
  }

  // Save to LocalStorage
  saveToLocalStorage() {
    try {
      const analyticsData = {
        sessionId: this.sessionId,
        events: this.events.slice(-100), // Keep last 100 events
        userJourney: this.userJourney.slice(-50), // Keep last 50 journey steps
        clickEvents: this.clickEvents.slice(-200), // Keep last 200 clicks
        scrollDepth: this.maxScrollDepth,
        conversionFunnels: this.conversionFunnels,
        lastUpdated: Date.now(),
      };

      localStorage.setItem('analytics_data', JSON.stringify(analyticsData));
    } catch (error) {
      console.error('Error saving analytics data:', error);
    }
  }

  // Save Heatmap Data
  saveHeatmapData() {
    try {
      const heatmap = {
        data: this.heatmapData.slice(-1000), // Keep last 1000 points
        page: window.location.pathname,
        timestamp: Date.now(),
      };

      const existing = JSON.parse(localStorage.getItem('heatmap_data') || '[]');
      existing.push(heatmap);
      
      // Keep only last 10 pages of heatmap data
      if (existing.length > 10) {
        existing.shift();
      }

      localStorage.setItem('heatmap_data', JSON.stringify(existing));
    } catch (error) {
      console.error('Error saving heatmap data:', error);
    }
  }

  // Get Analytics Summary
  getSummary() {
    return {
      sessionId: this.sessionId,
      pageViews: this.events.filter(e => e.type === 'pageview').length,
      clicks: this.clickEvents.length,
      maxScrollDepth: this.maxScrollDepth,
      journeySteps: this.userJourney.length,
      funnels: this.conversionFunnels,
    };
  }

  // Export Analytics Data
  exportData() {
    return {
      sessionId: this.sessionId,
      events: this.events,
      userJourney: this.userJourney,
      clickEvents: this.clickEvents,
      scrollDepth: this.maxScrollDepth,
      conversionFunnels: this.conversionFunnels,
      heatmapData: this.heatmapData,
    };
  }
}

// Initialize Analytics
let analyticsInstance = null;

export const initAnalytics = () => {
  if (!analyticsInstance) {
    analyticsInstance = new Analytics();
  }
  return analyticsInstance;
};

export const getAnalytics = () => {
  return analyticsInstance || initAnalytics();
};

export const trackEvent = (eventName, data) => {
  const analytics = getAnalytics();
  analytics.trackEvent(eventName, data);
};

export const trackFunnelStep = (funnelName, stepName, data) => {
  const analytics = getAnalytics();
  analytics.trackFunnelStep(funnelName, stepName, data);
};

export default getAnalytics;

