# StudyGenie - AI-Powered Study Platform

StudyGenie is a comprehensive full-stack learning platform that helps students optimize their study experience through AI-generated content, gamification, and personalized learning tools.

## Features

### 🔐 Authentication
- Secure user registration and login with JWT tokens
- Protected routes and authentication guards
- User onboarding flow with personalization

### 📚 Study Guides
- PDF upload and AI processing
- Auto-generated summaries, flashcards, and mind maps
- Audio summaries for auditory learners
- Organized study material library

### 🧠 AI-Powered Quizzes
- Create quizzes from any study material
- Multiple choice questions with explanations
- Automatic scoring and performance tracking
- Retake functionality for improved learning

### 🏆 Gamification
- Daily study streaks
- Achievement badges system
- Points and leaderboards
- Progress tracking and motivation

### 💬 AI Assistant
- 24/7 chat support for study questions
- Personalized learning recommendations
- Study tips and techniques

### 👤 Profile Management
- Customizable learning preferences
- Progress tracking
- Account settings

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **Helmet** and **CORS** for security

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **React Router v6** for navigation
- **Framer Motion** for animations
- **Axios** for API calls

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB instance
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

4. Set up environment variables:
   ```bash
   # In server/.env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/studygenie
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NODE_ENV=development
   ```

### Development

Run both frontend and backend:
```bash
npm run dev:fullstack
```

Or run separately:
```bash
# Frontend (port 5173)
npm run dev

# Backend (port 5000)
cd server && npm run dev
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

#### Study Guides
- `POST /api/guides/upload` - Upload PDF study guide
- `GET /api/guides/my-guides` - Get user's study guides

#### Quizzes
- `POST /api/quiz/create` - Create new quiz
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/my-quizzes` - Get user's quizzes

#### Gamification
- `POST /api/gamified/streak` - Update daily streak
- `POST /api/gamified/badge` - Assign badge to user
- `GET /api/gamified/leaderboard` - Get leaderboard

#### User
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/onboarding` - Complete onboarding

#### Chatbot
- `POST /api/chatbot/chat` - Chat with AI assistant

## Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder

### Backend (Render/Railway)
1. Set up MongoDB Atlas or similar
2. Configure environment variables
3. Deploy the `server` folder

## Features in Development
- Real AI integration with OpenRouter
- Advanced analytics dashboard
- Collaborative study groups
- Mobile app companion

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License
MIT License - see LICENSE file for details
