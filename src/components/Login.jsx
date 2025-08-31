import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed
import { motion } from 'framer-motion';

const Login = ({ navigateTo }) => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage(''); // Clear previous messages

    if (!email || !password) {
      setFormMessage('Please enter both email and password.');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigateTo('dashboard'); // Redirect to dashboard on success
    } else {
      setFormMessage(result.error || 'Login failed. Please try again.');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-950 px-4"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.div
        className="bg-gray-900 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-800"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 font-['Poppins']">
          Welcome Back!
        </h2>
        <p className="text-gray-400 text-center mb-8 font-['Inter']">
          Log in to continue your personalized learning journey.
        </p>

        {formMessage && (
          <div className="bg-red-800/20 text-red-300 p-3 rounded-lg mb-4 text-sm text-center">
            {formMessage}
          </div>
        )}
        {error && ( // Display context-level error if any
          <div className="bg-red-800/20 text-red-300 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2 font-['Inter']" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition duration-200"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2 font-['Inter']" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition duration-200"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-purple-700 transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins']"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-8 font-['Inter']">
          Don't have an account?{' '}
          <button
            onClick={() => navigateTo('/register')}
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors focus:outline-none"
          >
            Register here
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
