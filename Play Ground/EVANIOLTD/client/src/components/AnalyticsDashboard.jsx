import { useState, useEffect } from 'react';
import { BarChart3, MousePointer, Scroll, Route, TrendingUp, Download, Eye } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const AnalyticsDashboard = ({ isAdmin = false }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    loadAnalyticsData();
    loadHeatmapData();
  }, []);

  const loadAnalyticsData = () => {
    try {
      const data = localStorage.getItem('analytics_data');
      if (data) {
        setAnalyticsData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
    }
  };

  const loadHeatmapData = () => {
    try {
      const data = localStorage.getItem('heatmap_data');
      if (data) {
        const heatmap = JSON.parse(data);
        setHeatmapData(heatmap);
        if (heatmap.length > 0) {
          setSelectedPage(heatmap[heatmap.length - 1].page);
        }
      }
    } catch (error) {
      console.error('Error loading heatmap data:', error);
    }
  };

  const exportData = () => {
    const analytics = getAnalytics();
    const data = analytics.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAdmin) {
    return null; // Only show to admins
  }

  if (!analyticsData) {
    return (
      <GlassCard className="p-8 text-center">
        <p className="text-white/70">No analytics data available yet.</p>
      </GlassCard>
    );
  }

  const pages = heatmapData ? [...new Set(heatmapData.map(h => h.page))] : [];
  const selectedHeatmap = heatmapData?.find(h => h.page === selectedPage) || null;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-medium text-white/70">Page Views</h3>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.pageViews || 0}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <MousePointer className="w-5 h-5 text-green-400" />
            <h3 className="text-sm font-medium text-white/70">Total Clicks</h3>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.clickEvents?.length || 0}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Scroll className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-medium text-white/70">Avg. Scroll Depth</h3>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.scrollDepth || 0}%</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Route className="w-5 h-5 text-yellow-400" />
            <h3 className="text-sm font-medium text-white/70">Journey Steps</h3>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.journeySteps || 0}</p>
        </GlassCard>
      </div>

      {/* User Journey */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Route className="w-5 h-5 text-blue-400" />
          User Journey
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {analyticsData.userJourney?.slice(-10).reverse().map((step, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-sm text-white/70">{step.action}</span>
              <span className="text-xs text-white/50">{step.page}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Conversion Funnels */}
      {analyticsData.funnels && Object.keys(analyticsData.funnels).length > 0 && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Conversion Funnels
          </h3>
          <div className="space-y-4">
            {Object.entries(analyticsData.funnels).map(([funnelName, funnelData]) => (
              <div key={funnelName} className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-semibold text-white mb-2">{funnelName}</h4>
                <div className="space-y-1">
                  {funnelData.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      <span>{step.step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Heatmap Visualization */}
      {selectedHeatmap && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Heatmap - {selectedPage}
            </h3>
            {pages.length > 1 && (
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
              >
                {pages.map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="text-sm text-white/70">
            <p>Click points: {selectedHeatmap.data?.length || 0}</p>
            <p className="text-xs text-white/50 mt-1">
              Heatmap visualization shows where users click and move their mouse
            </p>
          </div>
        </GlassCard>
      )}

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-white hover:bg-blue-500/30 transition-all"
        >
          <Download className="w-4 h-4" />
          Export Analytics Data
        </button>
      </div>
    </div>
  );
};

import { getAnalytics } from '../utils/analytics';

