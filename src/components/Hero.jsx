import React from "react";
import { motion } from "framer-motion";
import illustration from "../assets/student.png"; // ✅ Import local image

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 1.2, ease: "anticipate" },
    },
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-slate-950 text-white min-h-screen flex items-center justify-center px-4 md:px-12 lg:px-24">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center w-full max-w-7xl py-24 md:py-36">
        {/* Left Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-center md:text-left"
        >
          <motion.h1
            variants={textVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg font-['Poppins']"
          >
            Your <span className="text-purple-400">AI Study</span> Co-pilot.
            <br />
            Make Learning a Breeze.
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0 font-['Inter']"
          >
            StudyGenie helps you effortlessly generate notes, flashcards, and quizzes
            from any text or topic. It’s smart, fast, and built for modern students.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4"
          >
            <a
              href="/signup"
              className="px-8 py-4 text-center bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition transform hover:-translate-y-1"
            >
              Start for Free
            </a>
            <a
              href="/demo"
              className="px-8 py-4 text-center bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition transform hover:-translate-y-1"
            >
              Watch a Demo
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center md:justify-end"
        >
          <img
            src={illustration} // ✅ Using imported local image
            alt="AI studying illustration"
            className="w-full max-w-sm md:max-w-lg lg:max-w-xl drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
