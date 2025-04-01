import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './LoadingPage.css'; // We'll create a CSS file for custom styles

const LoadingPage = ({ setIsLoaded }) => {
  const [countdown, setCountDown] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountDown((prevCountdown) => {
        if (prevCountdown >= 100) {
          clearInterval(intervalId);
          // Trigger exit animation before setting isLoaded to true
          controls.start('exit').then(() => {
            setIsLoaded(true);
          });
          return prevCountdown;
        }
        return prevCountdown + 1;
      });
    }, 40);

    return () => clearInterval(intervalId);
  }, [setIsLoaded, controls]);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 1.2, transition: { duration: 0.5, ease: 'easeIn' } },
  };

  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.3, ease: 'easeOut' },
    }),
  };

  // Animation variants for the glowing orb
  const orbVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      className="loading-container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="loading-content relative w-[90%] max-w-2xl h-[80%] max-h-[600px] bg-gray-900 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Glowing Background Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>

        {/* Logo Section */}
        <motion.div
          className="text-4xl md:text-5xl font-extrabold text-yellow-400 tracking-tight text-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
        >
          GoGlow
        </motion.div>

        {/* Text Section */}
        <div className="textstructure text-center">
          {['Boost Your', 'Day,', 'Your Way!'].map((item, index) => (
            <motion.div
              key={index}
              className="masker"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <div className="w-fit flex items-center justify-center overflow-hidden">
                {index === 1 && (
                  <motion.div
                    className="mr-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-yellow-400"
                    variants={orbVariants}
                    initial="hidden"
                    animate={['visible', 'pulse']}
                  ></motion.div>
                )}
                <h1 className="uppercase text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter leading-none">
                  {item}
                </h1>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading Bar and Percentage */}
        <div className="absolute bottom-6 left-0 right-0 px-8 flex flex-col items-center">
          <motion.div
            className="w-full h-2 bg-gray-800 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: countdown / 100 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          >
            <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-yellow-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
          >
            {countdown}%
          </motion.h1>
        </div>
      </div>

      {/* Particle Effects (Decorative) */}
      <div className="particle-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              opacity: [0, 1, 0],
              y: Math.random() * window.innerHeight,
              transition: {
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              },
            }}
          ></motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingPage;