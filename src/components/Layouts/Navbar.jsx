import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "#home" },
    { name: "Features", path: "#features" },
    { name: "workflow", path: "#workflow" },
    { name: "FAQ", path: "#faq" },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Listen to window scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.a
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          href="/"
          className="flex items-center gap-2 text-white"
        >
          <span className="font-extrabold text-2xl tracking-wide font-['Poppins']">
            StudyGenie
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-8 lg:gap-12"
        >
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className="relative text-white font-medium hover:text-purple-400 transition-colors"
            >
              {link.name}
              <span className="absolute left-0 bottom-[-5px] w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </motion.div>

        {/* Desktop Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex items-center gap-4"
        >
          <a
            href="/login"
            className="text-white font-medium hover:text-purple-400 transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 transition transform hover:-translate-y-0.5"
          >
            Sign Up
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-7 w-7 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 right-0 w-full h-full bg-gray-950/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 text-xl font-medium text-white md:hidden transform"
      >
        <button
          className="absolute top-6 right-6 text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className="hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}

        <div className="flex flex-col gap-4 mt-4">
          <a
            href="/login"
            className="px-8 py-3 text-center rounded-full border border-purple-600 text-white hover:bg-purple-600 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-8 py-3 text-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Sign Up
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;