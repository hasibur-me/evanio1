import { useState, useEffect } from 'react';
import { performanceMonitor } from '../utils/performance';
import { GlassCard } from './GlassCard';
import { AlertCircle, CheckCircle2, Clock, TrendingUp, Zap } from 'lucide-react';

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState(performanceMonitor.getMetrics());
  const [alerts, setAlerts] = useState([]);
  const [uptime, setUptime] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(performanceMonitor.getMetrics());
      setAlerts(performanceMonitor.getSpeedAlerts());
      performanceMonitor.checkUptime().then(setUptime);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const score = performanceMonitor.getPerformanceScore();

  return (
    <div className="space-y-4">
      <GlassCard variant="default" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Performance Metrics
          </h3>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            score >= 90 ? 'bg-green-500/20 text-green-300' :
            score >= 70 ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            Score: {score}/100
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-white/70 text-xs mb-1">Page Load</div>
            <div className="text-white font-semibold">
              {metrics.pageLoadTime ? `${Math.round(metrics.pageLoadTime)}ms` : 'N/A'}
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-white/70 text-xs mb-1">LCP</div>
            <div className="text-white font-semibold">
              {metrics.largestContentfulPaint ? `${Math.round(metrics.largestContentfulPaint)}ms` : 'N/A'}
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-white/70 text-xs mb-1">FCP</div>
            <div className="text-white font-semibold">
              {metrics.firstContentfulPaint ? `${Math.round(metrics.firstContentfulPaint)}ms` : 'N/A'}
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-white/70 text-xs mb-1">Uptime</div>
            <div className="flex items-center gap-1">
              {uptime ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400" />
              )}
              <span className="text-white font-semibold">{uptime ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>

        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg flex items-center gap-2 ${
                  alert.type === 'error' ? 'bg-red-500/20 border border-red-400/50' :
                  'bg-yellow-500/20 border border-yellow-400/50'
                }`}
              >
                <AlertCircle className={`w-4 h-4 ${
                  alert.type === 'error' ? 'text-red-400' : 'text-yellow-400'
                }`} />
                <span className="text-white text-sm">{alert.message}</span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};


