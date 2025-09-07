import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Flame, 
  Star, 
  Crown, 
  Medal,
  TrendingUp,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  streak: number;
}

const Gamification = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isUpdatingStreak, setIsUpdatingStreak] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/gamified/leaderboard');
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const updateStreak = async () => {
    setIsUpdatingStreak(true);
    try {
      await api.post('/gamified/streak');
      // Refresh user data would happen here
      window.location.reload();
    } catch (error) {
      console.error('Error updating streak:', error);
    } finally {
      setIsUpdatingStreak(false);
    }
  };

  const mockBadges = [
    { name: 'First Steps', icon: Star, color: 'text-blue-600', earned: true },
    { name: 'Study Streak', icon: Flame, color: 'text-orange-600', earned: user?.streak && user.streak.count >= 7 },
    { name: 'Quiz Master', icon: Trophy, color: 'text-yellow-600', earned: false },
    { name: 'Study Legend', icon: Crown, color: 'text-purple-600', earned: false }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Gamification</h1>
        <p className="text-gray-600 mt-2">
          Track your progress and compete with other learners
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-3xl font-bold text-orange-600">{user?.streak?.count || 0}</p>
                <p className="text-sm text-gray-500">days in a row</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Flame className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <Button 
              onClick={updateStreak} 
              disabled={isUpdatingStreak}
              className="w-full mt-4"
              variant="outline"
            >
              {isUpdatingStreak ? 'Updating...' : 'Update Streak'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-3xl font-bold text-indigo-600">{user?.totalPoints || 0}</p>
                <p className="text-sm text-gray-500">lifetime earned</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Star className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                <p className="text-3xl font-bold text-purple-600">
                  {mockBadges.filter(b => b.earned).length}
                </p>
                <p className="text-sm text-gray-500">out of {mockBadges.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Medal className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">Your Badges</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockBadges.map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Card className={`text-center ${badge.earned ? '' : 'opacity-50'}`}>
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${badge.earned ? 'bg-gray-100' : 'bg-gray-50'}`}>
                      <badge.icon className={`h-8 w-8 ${badge.earned ? badge.color : 'text-gray-400'}`} />
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">{badge.name}</h3>
                  {badge.earned && (
                    <Badge variant="default" className="mt-2">Earned</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Performers
            </CardTitle>
            <CardDescription>See how you rank among other learners</CardDescription>
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No leaderboard data available yet
              </p>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      entry.name === user?.name ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        entry.rank === 2 ? 'bg-gray-100 text-gray-700' :
                        entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{entry.name}</p>
                        <p className="text-sm text-gray-500">{entry.streak} day streak</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-600">{entry.points}</p>
                      <p className="text-sm text-gray-500">points</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Gamification;