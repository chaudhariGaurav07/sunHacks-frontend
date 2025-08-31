import React from "react";
import { motion } from "framer-motion";
import {
  TrophyIcon,
  UsersIcon,
  BriefcaseIcon,
  BookOpenCheckIcon,
  BotIcon,
  Edit3Icon,
} from "lucide-react"; // Importing icons from lucide-react

// Data for each feature card
const featureCardsData = [
  {
    icon: TrophyIcon,
    title: "Gamified Progress",
    description: "Track your learning journey, earn badges, and maintain streaks to stay motivated and engaged.",
  },
  {
    icon: UsersIcon,
    title: "Collaboration Mode",
    description: "Work together in real-time shared study spaces with integrated AI tools for group projects and peer learning.",
  },
  {
    icon: BriefcaseIcon,
    title: "Interview Prep Mode",
    description: "Access specialized modules for B.Tech, UPSC, and MBA interviews with AI-driven mock sessions.",
  },
  {
    icon: BookOpenCheckIcon,
    title: "Personalized Study Guides",
    description: "Get instant conversion of uploaded material into dynamic, personalized study guides and interactive formats.",
  },
  {
    icon: BotIcon,
    title: "AI Chatbot Tutor",
    description: "Receive instant answers, detailed explanations, and guided learning based directly on your uploaded content.",
  },
  {
    icon: Edit3Icon,
    title: "Adaptive Quiz & Writing Coach",
    description: "Benefit from AI-driven assessments, tailored practice questions, and intelligent feedback to refine your skills.",
  },
];

// Reusable Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1, // Stagger cards for a nice reveal effect
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 0 25px rgba(109, 40, 217, 0.6)", // Purple glow on hover
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div id="features"
      className="bg-gray-800 p-8 rounded-3xl shadow-xl flex flex-col items-center text-center border border-gray-700"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="bg-purple-600 p-4 rounded-full text-white shadow-lg mb-6">
        <Icon className="w-10 h-10" /> {/* Dynamic icon rendering */}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white font-['Poppins']">
        {title}
      </h3>
      <p className="text-md text-gray-300 font-['Inter']">
        {description}
      </p>
    </motion.div>
  );
};

// Main Features Section Component
const FeaturesSection = () => {
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="features" className="bg-gray-950 text-white py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={sectionTitleVariants}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['Poppins']">
            Discover <span className="text-purple-400">StudyGenie's</span> Power
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-['Inter']">
            Transform your study habits with our cutting-edge AI features, designed for every learner.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCardsData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
