import React, { useRef, useEffect } from 'react';
import gsap, { ScrollTrigger, drawSVG } from 'gsap/all'; // Correct import

gsap.registerPlugin(ScrollTrigger, drawSVG);

const Line = ({ index }) => {
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { drawSVG: 0 },
      { drawSVG: 1, duration: 1, ease: "power3.out", scrollTrigger: {
          trigger: lineRef.current,
          start: "top center",
          end: "top center+=100",
          scrub: 2,
          markers: false,
        },
      }
    );
  }, []);

  return (
    <svg ref={lineRef} width="2px" height="20vh">
      <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" />
    </svg>
  );
};

export default Line;