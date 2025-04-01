import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { isLoggedIn } from '../services/api.js';
import './MenuPage.css'; // We'll create a CSS file for custom styles

const MenuPage = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Trigger animations when the component mounts
  }, []);

  // Animation variants for the menu container
  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  // Animation variants for the menu items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
  };

  // Menu items array for scalability
  const menuItems = [
    { label: isLoggedIn() ? 'Profile' : 'Login', href: '/profile' },
    { label: 'Features', href: '/features' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About Us', href: '/about-us' },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="menu-container"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
        >
          <div className="menu-content w-[90%] max-w-2xl h-[95%] max-h-[600px] flex flex-col bg-gray-900 rounded-2xl p-6 shadow-2xl">
            {/* Logo Section */}
            <div className="h-1/4 flex justify-between items-center">
              <motion.div
                className="text-3xl md:text-4xl font-extrabold text-yellow-400 tracking-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              >
                GoGlow
              </motion.div>
              <motion.button
                className="text-white text-2xl md:text-3xl focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            {/* Divider */}
            <motion.div
              className="w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent my-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } }}
            ></motion.div>

            {/* Menu Items */}
            <div className="flex-1 pt-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="menu-item block text-xl md:text-2xl font-semibold text-white hover:text-yellow-400 transition-colors duration-300 mb-4"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Footer Section */}
            <motion.div
              className="mt-auto text-center text-gray-400 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
            >
              <p>© 2025 GoGlow. All rights reserved.</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuPage;