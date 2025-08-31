import React from "react";
import { FaTwitter, FaLinkedinIn, FaGithub, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", path: "#features" },
        { name: "workflow", path: "#workflow" },
        { name: "Faq", path: "#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" },
        { name: "Blog", path: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
    { icon: <FaGithub />, url: "https://github.com" },
    { icon: <FaFacebookF />, url: "https://facebook.com" },
  ];

  return (
    <footer className="relative bg-gray-950 text-gray-300">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(109,40,217,0.15),transparent_50%)] -z-0"></div>
      <div className="relative z-10 mx-auto px-6 md:px-16 lg:px-24 py-16 w-full max-w-7xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2">
              <span className="font-extrabold text-3xl tracking-wide text-white font-['Poppins']">
                StudyGenie
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              Your AI-powered study companion. Making learning smarter, faster, and fun.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.url.split('https://')[1].split('.com')[0]}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-8 lg:col-span-3">
            {footerLinks.map((section, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-5 text-white">{section.title}</h3>
                <ul className="text-sm space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.path} className="hover:text-white transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} StudyGenie. All Rights Reserved.
          </p>
          <div className="flex justify-center mt-4 md:mt-0">
             <a
              href="/privacy-policy"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span className="mx-2 text-gray-600">|</span>
            <a
              href="/terms"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;