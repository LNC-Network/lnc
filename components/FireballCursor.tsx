import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

const FireballCursor = () => {
  const [isHovering] = useState(false);
  // const cursorAnimation = useAnimation();
  // const glowAnimation = useAnimation();

  const springConfig = { stiffness: 1000, damping: 50 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    // cursorAnimation.start({
    //   x: mousePosition.x - 16,
    //   y: mousePosition.y - 16,
    //   transition: {
    //     type: "spring",
    //     damping: 15,
    //     stiffness: 150,
    //     mass: 0.1
    //   }
    // });
    // glowAnimation.start({
    //   x: mousePosition.x - 24,
    //   y: mousePosition.y - 24,
    //   transition: {
    //     type: "spring",
    //     damping: 20,
    //     stiffness: 100,
    //     mass: 0.2
    //   }
    // });
  }, [mouseX, mouseY]); // Removed cursorAnimation, glowAnimation

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-20 mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        {/* Core of the fireball */}
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            opacity: isHovering ? [0.6, 0.7, 0.6] : [0.8, 0.9, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Particle effects */}
        <AnimatePresence>
          {!isHovering &&
            [...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-yellow-300"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: Math.random() * 20 - 10,
                  y: Math.random() * 20 - 10,
                  scale: [1, 0],
                  opacity: [0.8, 0],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Outer glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-20 w-16 h-16 rounded-full bg-orange-400 opacity-50 blur-xl"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Playful trail effect */}
      <AnimatePresence>
        {!isHovering &&
          [...Array(2)].map((_, i) => (
            <motion.div
              key={`trail-${i}`}
              className="pointer-events-none fixed top-0 left-0 z-30 w-4 h-4 rounded-full bg-yellow-400 opacity-30 blur-sm"
              style={{
                x: mouseX,
                y: mouseY,
              }}
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 0, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
      </AnimatePresence>
    </>
  );
};

export default FireballCursor;
