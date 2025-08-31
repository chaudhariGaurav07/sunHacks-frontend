import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Adjust path
import Login from './components/Login'; // Adjust path
import Register from './components/Register'; // Adjust path
import Dashboard from './components/Dashboard'; // Adjust path
import Home from './Pages/Home'; // Assuming your Home component is here

// A wrapper component for protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Optionally render a loading spinner or placeholder
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white text-xl font-['Inter']">
        Authenticating...
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated, preserving the original location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Main application content that uses routing
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to handle redirection after authentication state changes
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        // If authenticated, redirect to dashboard or the page they tried to access
        const from = location.state?.from?.pathname || '/dashboard';
        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
           navigate(from, { replace: true });
        }
      } else {
        // If not authenticated and on a protected route, redirect to login
        if (location.pathname === '/dashboard') {
          navigate('/login', { replace: true });
        }
      }
    }
  }, [isAuthenticated, loading, navigate, location.state, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white text-xl font-['Inter']">
        Initializing authentication...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      {/* BrowserRouter should only be here, wrapping the entire AppContent */}
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
