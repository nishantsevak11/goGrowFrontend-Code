import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css'; // We'll create a CSS file for custom styles

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const elementRefs = useRef([]);
  const lineRefs = useRef([]);
  const textRefs = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    // Animate the heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    );

    // Animate the step circles with a glowing effect
    elementRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, scale: 0.8, boxShadow: '0 0 0 0 rgba(255, 215, 0, 0)' },
        {
          opacity: 1,
          scale: 1,
          boxShadow: '0 0 20px 5px rgba(255, 215, 0, 0.5)',
          duration: 0.8,
          delay: index * 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    });

    // Animate the lines with a glowing stroke effect
    lineRefs.current.forEach((svgRef, index) => {
      const line = svgRef.querySelector('line');
      const length = line.getTotalLength();

      gsap.fromTo(
        line,
        { strokeDasharray: length, strokeDashoffset: length, stroke: '#ffffff' },
        {
          strokeDashoffset: 0,
          stroke: '#ffd700',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: svgRef,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 2,
          },
        }
      );
    });

    // Animate the text with a fade-in and slide-up effect
    textRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    });
  }, []);

  const steps = [
    {
      number: 1,
      title: 'Sign Up',
      description: 'Create an account in just a few steps and unlock access to all features.',
      icon: '📝', // Adding an emoji icon for visual appeal
    },
    {
      number: 2,
      title: 'Explore Features',
      description: 'Discover tools and features designed to simplify your tasks.',
      icon: '🔍',
    },
    {
      number: 3,
      title: 'Get Started',
      description: 'Start using the platform to achieve your goals efficiently.',
      icon: '🚀',
    },
  ];

  return (
    <section className="how-it-works-container">
      <h4
        ref={headingRef}
        className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 md:mb-16 text-white tracking-tight"
      >
        How It Works
      </h4>
      <div className="w-full flex flex-col items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-sm md:max-w-md lg:max-w-lg w-full px-4"
          >
            {/* Step Circle */}
            <div
              ref={(el) => (elementRefs.current[index] = el)}
              className="step-circle w-[50px] md:w-[60px] h-[50px] md:h-[60px] bg-gray-900 rounded-full flex items-center justify-center mb-6 md:mb-8 relative"
            >
              <span className="text-xl md:text-2xl font-bold text-yellow-400">{step.icon}</span>
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-50"></div>
            </div>

            {/* Step Text */}
            <div
              ref={(el) => (textRefs.current[index] = el)}
              className="text-center mb-6 md:mb-8 px-4"
            >
              <h5 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                {step.title}
              </h5>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Line Connector */}
            {index < steps.length - 1 && (
              <svg
                ref={(el) => (lineRefs.current[index] = el)}
                className="h-[15vh] md:h-[20vh] w-[10px] md:w-[12px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="6"
                  y1="0"
                  x2="6"
                  y2="100%"
                  stroke="white"
                  strokeWidth="3"
                  className="glow-line"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;