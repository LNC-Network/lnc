"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
}

const Animated: React.FC<AnimatedProps> = ({ children, direction = "up" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      // x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      // y: direction === "up" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      // x: 0,
      // y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default Animated;
