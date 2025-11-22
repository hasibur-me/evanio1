import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import {
  Gift,
  Users,
  Copy,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  Star
} from 'lucide-react';

export default function Referrals() {
  const [referralData, setReferralData] = useState(null);
  const [loyaltyData, setLoyaltyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [referralRes, loyaltyRes] = await Promise.all([
        api.get('/referrals/my-code'),
        api.get('/referrals/loyalty')
      ]);
      setReferralData(referralRes.data);
      setLoyaltyData(loyaltyRes.data);
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (referralData?.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'platinum': return 'text-purple-400';
      case 'gold': return 'text-yellow-400';
      case 'silver': return 'text-gray-300';
      default: return 'text-orange-400';
    }
  };

  if (loading) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex min-h-[calc(100vh-200px)]">
          <Sidebar />
          <div className="flex-1 ml-64 p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </GlassBackground>
    );
  }

  return (
    <GlassBackground>
      <Header />
        <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Referrals & Rewards</h1>
            <p className="text-white/80 mt-2">Earn rewards by referring friends</p>
          </div>

          {/* Referral Code Section */}
          <Card glass className="mb-6 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Your Referral Code</h2>
            </div>
            <div className="bg-white/5 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">Referral Code</p>
                  <p className="text-2xl font-bold text-white font-mono">
                    {referralData?.referralCode || 'N/A'}
                  </p>
                </div>
                <Button
                  onClick={copyReferralLink}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-white/70 text-sm mb-2">Your Referral Link</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-black/30 rounded text-white/80 text-sm font-mono break-all">
                  {referralData?.referralLink || 'N/A'}
                </code>
                <Button
                  onClick={copyReferralLink}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Total Referrals</p>
                  <p className="text-3xl font-bold text-white">
                    {referralData?.stats?.totalReferrals || 0}
                  </p>
                </div>
                <Users className="w-10 h-10 text-blue-400" />
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-white">
                    {referralData?.stats?.completedReferrals || 0}
                  </p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Total Rewards</p>
                  <p className="text-3xl font-bold text-white">
                    ${referralData?.stats?.totalRewards || 0}
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-yellow-400" />
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-white">
                    {referralData?.stats?.pendingReferrals || 0}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-orange-400" />
              </div>
            </Card>
          </div>

          {/* Loyalty Points Section */}
          {loyaltyData && (
            <Card glass className="mb-6 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className={`w-6 h-6 ${getTierColor(loyaltyData.tier)}`} />
                <h2 className="text-xl font-semibold text-white">Loyalty Program</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-white/70 mb-1">Current Tier</p>
                  <p className={`text-2xl font-bold capitalize ${getTierColor(loyaltyData.tier)}`}>
                    {loyaltyData.tier}
                  </p>
                  {loyaltyData.nextTierPoints > 0 && (
                    <p className="text-xs text-white/60 mt-1">
                      {loyaltyData.nextTierPoints} points to next tier
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">Available Points</p>
                  <p className="text-2xl font-bold text-white">
                    {loyaltyData.availablePoints}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    ${(loyaltyData.availablePoints / 100).toFixed(2)} in rewards
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-1">Lifetime Points</p>
                  <p className="text-2xl font-bold text-white">
                    {loyaltyData.lifetimePoints}
                  </p>
                  <p className="text-xs text-white/60 mt-1">Total earned</p>
                </div>
              </div>
            </Card>
          )}

          {/* How It Works */}
          <Card glass className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  1
                </div>
                <p>Share your referral link with friends and family</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  2
                </div>
                <p>They sign up using your link and place their first order</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  3
                </div>
                <p>You earn 10% of their first order (minimum $10) as loyalty points</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  4
                </div>
                <p>Redeem points for discounts on future orders (100 points = $1)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </GlassBackground>
  );
}

