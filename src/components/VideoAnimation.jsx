import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoAnimation = () => {
  const videoContainerRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (videoContainerRef.current && windowWidth > 768) { // Check window width
      gsap.fromTo(
        videoContainerRef.current.querySelector("video"),
        {
          width: "10%", // Starting size
          scale: 1.2,
        },
        {
          width: "80%", // Ending size
          borderRadius: "20px",
          scale: 1, // Final scale value
          scrollTrigger: {
            trigger: videoContainerRef.current, // Trigger animation at the video container
            start: "top bottom", // Start when container's top reaches the center of the viewport
            end: "bottom center",
            scrub: true, // Smooth animation as the user scrolls
          },
        }
      );
    }
  }, [videoContainerRef.current, windowWidth]); // Depend on both refs and windowWidth

  return (
    <div
      ref={videoContainerRef}
      className="md:py-[10vh] lg:py-[10vh] relative my-[10vh] flex justify-center items-start"
    >
      <video
        autoPlay
        muted
        loop
        className={`object-cover ${windowWidth > 768 ? 'rounded-[20%]' : 'rounded-2xl'}`}
        src="./projectVideo.mp4"
      />
    </div>
  );
};

export default VideoAnimation;