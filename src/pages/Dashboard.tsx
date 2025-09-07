import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  MessageCircle, 
  TrendingUp,
  Flame,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalGuides: 0,
    totalQuizzes: 0,
    averageScore: 0,
    streak: user?.streak?.count || 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [guidesRes, quizzesRes] = await Promise.all([
        api.get('/guides/my-guides'),
        api.get('/quiz/my-quizzes')
      ]);

      const quizzes = quizzesRes.data.quizzes;
      const averageScore = quizzes.length > 0
        ? quizzes.reduce((sum: number, quiz: any) => sum + (quiz.bestScore || 0), 0) / quizzes.length
        : 0;

      setStats({
        totalGuides: guidesRes.data.guides.length,
        totalQuizzes: quizzes.length,
        averageScore: Math.round(averageScore),
        streak: user?.streak?.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const features = [
    {
      title: 'Study Guides',
      description: 'Upload PDFs and get AI-generated summaries, flashcards, and mind maps',
      icon: BookOpen,
      href: '/guides',
      color: 'bg-blue-500',
      stat: `${stats.totalGuides} guides`
    },
    {
      title: 'Quizzes',
      description: 'Create and take AI-powered quizzes to test your knowledge',
      icon: Brain,
      href: '/quiz',
      color: 'bg-emerald-500',
      stat: `${stats.totalQuizzes} quizzes`
    },
    {
      title: 'Gamification',
      description: 'Track your progress with streaks, badges, and leaderboards',
      icon: Trophy,
      href: '/gamification',
      color: 'bg-amber-500',
      stat: `${user?.totalPoints || 0} points`
    },
    {
      title: 'AI Assistant',
      description: 'Chat with your personal AI tutor for instant help',
      icon: MessageCircle,
      href: '/chatbot',
      color: 'bg-purple-500',
      stat: 'Available 24/7'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-indigo-100 text-lg">
            Ready to continue your learning journey?
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
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
                <p className="text-2xl font-bold text-orange-600">{stats.streak} days</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-indigo-600">{user?.totalPoints || 0}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Star className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.averageScore}%</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Link to={feature.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 ${feature.color} rounded-lg`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary">{feature.stat}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-indigo-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump back into your recent activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Link to="/guides">
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Upload Study Guide
                </Button>
              </Link>
              <Link to="/quiz">
                <Button variant="outline" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Create Quiz
                </Button>
              </Link>
              <Link to="/chatbot">
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Ask AI Assistant
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;