import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, MinusIcon } from "lucide-react"; // Icons for expand/collapse

// Data for your Frequently Asked Questions
const faqData = [
  {
    question: "What is StudyGenie?",
    answer:
      "StudyGenie is an AI-powered web application designed to revolutionize the learning experience. It transforms your notes and study materials into personalized guides, flashcards, quizzes, and more.",
  },
  {
    question: "How does StudyGenie personalize my learning?",
    answer:
      "Our advanced AI analyzes your uploaded content and adapts to your individual learning style, academic level, and preferences to create highly relevant and effective study materials just for you.",
  },
  {
    question: "Can I upload different file types?",
    answer:
      "Currently, StudyGenie primarily supports PDF documents and text input. We are continuously working to expand our compatibility with more file types in the future.",
  },
  {
    question: "Does StudyGenie offer collaboration features?",
    answer:
      "Yes! StudyGenie includes a Collaboration Mode with real-time shared study spaces and integrated AI tools, making group projects and peer learning more effective.",
  },
  {
    question: "Is there a free trial or plan available?",
    answer:
      "We offer a generous free tier that allows you to experience many of StudyGenie's core features. For advanced functionalities and unlimited access, various premium plans are available.",
  },
  {
    question: "How secure is my data on StudyGenie?",
    answer:
      "StudyGenie prioritizes your data security and privacy. We use industry-standard encryption and robust security measures to protect your uploaded content and personal information.",
  },
];

// Reusable FAQ Item Component
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for the FAQ item itself (fade in)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1, // Stagger effect
        ease: "easeOut",
      },
    },
  };

  // Animation variants for the answer content (expand/collapse)
  const answerVariants = {
    collapsed: { height: 0, opacity: 0, y: -10, transition: { duration: 0.3 } },
    expanded: { height: "auto", opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="border border-gray-700 rounded-xl overflow-hidden bg-gray-900 shadow-lg"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <button
        className="w-full flex justify-between items-center p-6 text-left cursor-pointer focus:outline-none transition-colors duration-200 hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-white font-['Poppins']">
          {question}
        </h3>
        {isOpen ? (
          <MinusIcon className="w-6 h-6 text-purple-400" />
        ) : (
          <PlusIcon className="w-6 h-6 text-purple-400" />
        )}
      </button>
      <motion.div
        initial="collapsed"
        animate={isOpen ? "expanded" : "collapsed"}
        variants={answerVariants}
        className="px-6 pb-6 text-gray-300 font-['Inter']"
        style={{ overflow: 'hidden' }} // Ensure content doesn't overflow during animation
      >
        {answer}
      </motion.div>
    </motion.div>
  );
};

// Main FAQ Section Component
const FAQSection = () => {
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
    <section id="faq" className="bg-gray-950 text-white py-24 md:py-32 overflow-hidden">
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
            Frequently Asked <span className="text-purple-400">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-['Inter']">
            Everything you need to know about StudyGenie. Can't find an answer? Contact us!
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
