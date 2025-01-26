import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const TextMarque = () => {
  // Get the scroll progress
  const { scrollYProgress } = useScroll();

  // Map the scroll progress to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div className="w-full h-[10vh] overflow-hidden relative">
      <motion.div
        style={{ x }}
        className="flex space-x-10 absolute w-[200%]"
      >
        <h1 className="pl-20 text-2xl lg:text-[4vh] whitespace-nowrap">
          A notification that inspires. A moment that transforms. Start your
          journey toward a more productive you.
        </h1>
        
      </motion.div>
    </div>
  );
};

export default TextMarque;
