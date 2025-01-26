import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const elementRefs = useRef([]);
  const lineRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    // Animate the step circles
    elementRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref,
            start: "top center",
            end: "top center+=100",
            scrub: 1,
          },
        }
      );
    });

    // Animate the lines
    lineRefs.current.forEach((svgRef, index) => {
      const line = svgRef.querySelector("line");
      const length = line.getTotalLength();

      gsap.fromTo(
        line,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: svgRef,
            start: "top center",
            end: "bottom center",
            scrub: 2,
          },
        }
      );
    });

    // Animate the text
    textRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref,
            start: "top center",
            end: "top center+=100",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create an account in just a few steps and unlock access to all features.",
    },
    {
      number: 2,
      title: "Explore Features",
      description: "Discover tools and features designed to simplify your tasks.",
    },
    {
      number: 3,
      title: "Get Started",
      description: "Start using the platform to achieve your goals efficiently.",
    },
  ];

  return (
    <div className="w-full p-6 md:p-10">
      <h4 className="text-center text-3xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-10">
        How It Works
      </h4>
      <div className="text-white w-full flex flex-col items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-sm md:max-w-md lg:max-w-lg w-full"
          >
            {/* Step Circle */}
            <div
              ref={(el) => (elementRefs.current[index] = el)}
              className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] bg-black rounded-full flex items-center justify-center mb-4 md:mb-6"
            >
              {step.number}
            </div>

            {/* Step Text */}
            <div
              ref={(el) => (textRefs.current[index] = el)}
              className="text-center mb-4 md:mb-6 px-4"
            >
              <h5 className="text-lg md:text-xl lg:text-2xl font-bold">
                {step.title}
              </h5>
              <p className="text-sm md:text-base">{step.description}</p>
            </div>

            {/* Line Connector */}
            {index < steps.length - 1 && (
              <svg
                ref={(el) => (lineRefs.current[index] = el)}
                className="h-[15vh] md:h-[20vh] w-[8px] md:w-[10px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="5"
                  y1="0"
                  x2="5"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
