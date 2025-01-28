import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Welcome = ({ name = "User" , handleSubmit}) => {
  const welcomeRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, y: -50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      <div
        ref={welcomeRef}
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center max-w-lg w-full mx-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-fadeIn">
          Welcome, <span className="text-yellow-300">{name}!</span> 🚀
        </h1>
        <p className="text-lg text-white mb-6">
          You’ve successfully joined our community! Let’s get started with your journey.
        </p>
        <div ref={buttonRef} className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={async()=>{
              await handleSubmit();
              window.location.href = "/profile";
            }}
          className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transition-transform duration-300">
            Go to Dashboard
          </button>
          {/* <button className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform duration-300">
            Explore Features
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
