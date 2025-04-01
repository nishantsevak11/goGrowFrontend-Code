import React from 'react';
import { motion } from 'framer-motion'; // For animations
import './FeaturesSection.css'; // We'll create a CSS file for custom styles

const FeaturesSection = () => {
  // Feature data array for better scalability
  const features = [
    {
      title: 'Personalized Notifications',
      description: 'Get tailored reminders to keep you on track throughout your workday.',
      image: 'f1.avif',
      alt: 'Personalized Notifications Feature',
    },
    {
      title: 'AI-Powered Insights',
      description: 'Leverage AI to gain actionable insights and boost your productivity.',
      image: 'f2.avif',
      alt: 'AI-Powered Insights Feature',
    },
    {
      title: 'Engaging Media',
      description: 'Access motivational content to inspire and energize your day.',
      image: 'f3.avif',
      alt: 'Engaging Media Feature',
    },
    {
      title: 'Community Reviews',
      description: 'Join a community of users sharing feedback and success stories.',
      image: 'f4.avif',
      alt: 'Community Reviews Feature',
    },
  ];

  // Animation variants for the heading
  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Animation variants for the feature cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
    }),
  };

  return (
    <section className="features-section-container">
      {/* Top Heading Section */}
      <motion.div
        className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white tracking-tight">
          Why Choose Us?
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto">
          Transform your workday with tools designed to inspire and empower you.{' '}
          <span className="font-semibold text-yellow-400">Glow up with GoGlow!</span>
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-12 pb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card relative rounded-2xl shadow-lg p-6 text-center bg-gray-900 hover:bg-gray-800 transition-all duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={index}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            {/* Decorative Element */}
            <div className="absolute -top-3 -left-3 w-12 h-12 bg-yellow-400 rounded-full opacity-70"></div>

            {/* Feature Image */}
            <div className="relative rounded-lg overflow-hidden mb-4">
              <img
                src={feature.image}
                alt={feature.alt}
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
              />
              {/* Image Overlay for Hover Effect */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-500"></div>
            </div>

            {/* Feature Content */}
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">{feature.title}</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;