import React from 'react';
import { motion } from 'framer-motion'; // For animations
import './Footer.css'; // We'll create a CSS file for custom styles

const Footer = () => {
  // Animation variants for the footer sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Animation variants for the social icons
  const iconVariants = {
    hidden: { scale: 0 },
    visible: (i) => ({
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
    hover: { scale: 1.2, rotate: 15, transition: { duration: 0.3 } },
  };

  // Social media links
  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
    { name: 'Instagram', href: 'https://instagram.com', icon: '📸' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
    { name: 'GitHub', href: 'https://github.com', icon: '💻' },
  ];

  return (
    <footer className="footer-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h3 className="text-3xl md:text-4xl font-extrabold text-yellow-400 tracking-tight mb-4">
              GoGlow
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Redefine your workday with tools designed to inspire and empower you. Glow up with
              GoGlow!
            </p>
            {/* Newsletter Signup */}
            <div className="mt-6 w-full max-w-sm">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-yellow-400 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Features', 'How It Works', 'About Us', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-300 hover:text-yellow-400"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        ></motion.div>

        {/* Copyright Section */}
        <motion.div
          className="text-center text-gray-400 text-sm md:text-base"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <p>© 2025 GoGlow. All rights reserved.</p>
          <p className="mt-1">
            Made with <span className="text-yellow-400">✨</span> by the GoGlow Team
          </p>
        </motion.div>
      </div>

      {/* Decorative Background Element */}
      <div className="footer-glow"></div>
    </footer>
  );
};

export default Footer;