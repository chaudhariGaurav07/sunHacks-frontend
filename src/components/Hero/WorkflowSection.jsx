import React from "react";
import { motion } from "framer-motion";
import {
  UploadCloudIcon, // For uploading notes/content
  SparklesIcon,   // For AI processing
  CheckCircleIcon, // For mastering the subject/output
  GraduationCapIcon, // For overall learning journey (alternative for step 3)
} from "lucide-react"; // Importing icons from lucide-react

// Data for each workflow step
const workflowSteps = [
  {
    icon: UploadCloudIcon,
    title: "1. Upload Your Content",
    description: "Easily upload your lecture notes, textbooks, PDFs, or any study material. StudyGenie instantly ingests your data.",
  },
  {
    icon: SparklesIcon,
    title: "2. AI Processing Magic",
    description: "Our advanced AI swiftly transforms your content into personalized summaries, flashcards, mindmaps, and even audio formats.",
  },
  {
    icon: CheckCircleIcon, // Or GraduationCapIcon
    title: "3. Master & Progress",
    description: "Engage with your new study guides, take adaptive quizzes, and track your gamified progress to ace your exams.",
  },
];

const WorkflowSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for heading and steps
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="workflow" className="bg-gray-950 text-white py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 space-y-4"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['Poppins']"
          >
            Your Learning <span className="text-purple-400">Journey</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-['Inter']"
          >
            Experience personalized learning in three simple, powerful steps.
          </motion.p>
        </motion.div>

        {/* Workflow Steps Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
        >
          {/* Horizontal Connector Line for Desktop */}
          <div className="hidden md:block absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -translate-y-1/2 -z-0"></div>

          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center space-y-5 p-8 rounded-3xl border border-gray-800 bg-gray-900 shadow-xl z-10 hover:shadow-2xl hover:border-purple-600 transition-all duration-300"
            >
              <div className="bg-purple-600 p-5 rounded-full text-white shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-10 h-10" /> {/* Dynamic icon rendering */}
              </div>
              <h3 className="text-2xl font-bold font-['Poppins']">
                {step.title}
              </h3>
              <p className="text-md text-gray-400 font-['Inter']">
                {step.description}
              </p>
              {/* Vertical Connector for Mobile/Tablet */}
              {index < workflowSteps.length - 1 && (
                <div className="absolute left-1/2 top-[calc(100%+0.5rem)] h-12 w-0.5 bg-purple-500 md:hidden"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowSection;
