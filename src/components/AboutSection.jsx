import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // For animations
import './AboutSection.css'; // We'll create a CSS file for custom styles

const AboutSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation variants for the text and image
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="about-section-container">
      <div className="flex flex-col md:flex-row lg:px-16 px-4 py-12 gap-8">
        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 text-white tracking-tight">
            What Drives Us?
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
            At GoGlow, we believe that motivation is the spark that ignites greatness. Whether
            it’s a push to start your day or a reminder to stay focused, we deliver just the
            inspiration you need, when you need it.
          </p>
          {/* Add a subtle call-to-action button */}
          <button className="mt-6 w-fit px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300">
            Learn More
          </button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2 p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <div className="relative">
            <img
              src="./aboutImg.png"
              alt="Motivational scene"
              className="w-full h-80 md:h-96 object-cover rounded-3xl shadow-lg"
            />
            {/* Add a decorative overlay element */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;