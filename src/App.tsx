import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Onboarding from '@/pages/Onboarding';
import Dashboard from '@/pages/Dashboard';
import StudyGuides from '@/pages/StudyGuides';
import Quiz from '@/pages/Quiz';
import Gamification from '@/pages/Gamification';
import Chatbot from '@/pages/Chatbot';
import Profile from '@/pages/Profile';

const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Onboarding route - only for authenticated but not onboarded users */}
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute>
            {user?.isOnboarded ? <Navigate to="/dashboard" replace /> : <Onboarding />}
          </ProtectedRoute>
        } 
      />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          {user?.isOnboarded ? <Layout /> : <Navigate to="/onboarding" replace />}
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="guides" element={<StudyGuides />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="gamification" element={<Gamification />} />
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;