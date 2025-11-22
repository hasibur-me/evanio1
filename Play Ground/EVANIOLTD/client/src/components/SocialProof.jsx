import { useState, useEffect } from 'react';
import { ShoppingBag, Users, Activity, Award, TrendingUp, Clock } from 'lucide-react';

export const LiveVisitorCount = ({ className = '' }) => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Simulate live visitor count (in production, this would come from analytics API)
    const generateCount = () => {
      const baseCount = 42;
      const variation = Math.floor(Math.random() * 15) - 7;
      return Math.max(1, baseCount + variation);
    };

    setCount(generateCount());
    const interval = setInterval(() => {
      setCount(generateCount());
      setIsActive(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full ${className}`}>
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-green-500'}`}></div>
      <Users className="w-4 h-4 text-white/70" />
      <span className="text-sm text-white/90 font-medium">
        <span className="font-bold text-white">{count}</span> people viewing
      </span>
    </div>
  );
};

export const RecentPurchases = ({ limit = 5, className = '' }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPurchases = async () => {
      try {
        const response = await fetch('/api/orders/recent?limit=' + limit);
        if (response.ok) {
          const data = await response.json();
          setPurchases(data);
        } else {
          // Fallback to mock data
          setPurchases([
            { service: 'Business Formation', location: 'New York, USA', time: '2 minutes ago' },
            { service: 'Website Development', location: 'London, UK', time: '5 minutes ago' },
            { service: 'Logo & Branding', location: 'Toronto, Canada', time: '12 minutes ago' },
            { service: 'Payment Gateway Setup', location: 'Sydney, Australia', time: '18 minutes ago' },
            { service: 'Digital Marketing', location: 'Berlin, Germany', time: '25 minutes ago' },
          ]);
        }
      } catch (error) {
        // Fallback to mock data
        setPurchases([
          { service: 'Business Formation', location: 'New York, USA', time: '2 minutes ago' },
          { service: 'Website Development', location: 'London, UK', time: '5 minutes ago' },
          { service: 'Logo & Branding', location: 'Toronto, Canada', time: '12 minutes ago' },
          { service: 'Payment Gateway Setup', location: 'Sydney, Australia', time: '18 minutes ago' },
          { service: 'Digital Marketing', location: 'Berlin, Germany', time: '25 minutes ago' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPurchases();
    const interval = setInterval(fetchRecentPurchases, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [limit]);

  if (loading) {
    return (
      <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 ${className}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <ShoppingBag className="w-4 h-4 text-green-400" />
        <h3 className="text-sm font-bold text-white">Recent Purchases</h3>
      </div>
      <div className="space-y-2">
        {purchases.map((purchase, index) => (
          <div key={index} className="flex items-start gap-2 text-xs text-white/70 animate-fade-in">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
            <div className="flex-1">
              <span className="text-white font-medium">{purchase.service}</span>
              <span className="mx-1">•</span>
              <span>{purchase.location}</span>
              <div className="text-white/60 text-[10px] mt-0.5">{purchase.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ActivityFeed = ({ limit = 5, className = '' }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities/recent?limit=' + limit);
        if (response.ok) {
          const data = await response.json();
          setActivities(data);
        } else {
          // Fallback to mock data
          setActivities([
            { type: 'review', message: 'Sarah M. left a 5-star review', time: '3 minutes ago', icon: Award },
            { type: 'purchase', message: 'New order: Business Formation Package', time: '8 minutes ago', icon: ShoppingBag },
            { type: 'signup', message: 'John D. just signed up', time: '15 minutes ago', icon: Users },
            { type: 'milestone', message: '1000+ happy customers reached!', time: '1 hour ago', icon: TrendingUp },
            { type: 'update', message: 'New service: AI Automation added', time: '2 hours ago', icon: Activity },
          ]);
        }
      } catch (error) {
        // Fallback to mock data
        setActivities([
          { type: 'review', message: 'Sarah M. left a 5-star review', time: '3 minutes ago', icon: Award },
          { type: 'purchase', message: 'New order: Business Formation Package', time: '8 minutes ago', icon: ShoppingBag },
          { type: 'signup', message: 'John D. just signed up', time: '15 minutes ago', icon: Users },
          { type: 'milestone', message: '1000+ happy customers reached!', time: '1 hour ago', icon: TrendingUp },
          { type: 'update', message: 'New service: AI Automation added', time: '2 hours ago', icon: Activity },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
    const interval = setInterval(fetchActivities, 20000); // Update every 20 seconds

    return () => clearInterval(interval);
  }, [limit]);

  if (loading) {
    return (
      <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 ${className}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-bold text-white">Live Activity</h3>
      </div>
      <div className="space-y-2">
        {activities.map((activity, index) => {
          const Icon = activity.icon || Activity;
          return (
            <div key={index} className="flex items-start gap-2 text-xs text-white/70 animate-fade-in">
              <Icon className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-white">{activity.message}</span>
                <div className="text-white/60 text-[10px] mt-0.5 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {activity.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TrustBadges = ({ className = '' }) => {
  const badges = [
    { icon: Award, text: '500+ Projects', color: 'text-yellow-400' },
    { icon: Users, text: '1000+ Clients', color: 'text-blue-400' },
    { icon: TrendingUp, text: '99.9% Satisfaction', color: 'text-green-400' },
    { icon: Clock, text: '24/7 Support', color: 'text-purple-400' },
  ];

  return (
    <div className={`flex items-center gap-4 flex-wrap ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all"
          >
            <Icon className={`w-4 h-4 ${badge.color}`} />
            <span className="text-xs font-medium text-white/90">{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
};

// Combined Social Proof Widget
export const SocialProofWidget = ({ variant = 'full', className = '' }) => {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <LiveVisitorCount />
        <TrustBadges />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      <RecentPurchases limit={5} />
      <ActivityFeed limit={5} />
      <div className="space-y-4">
        <LiveVisitorCount />
        <TrustBadges />
      </div>
    </div>
  );
};

