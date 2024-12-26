"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedBackgroundProps {
  children: ReactNode;
  elementType?: "star" | "circle" |"star"|  "square" | "square" | "triangle";
  color?: string;
  count?: number;
}

const getElementPath = (type: string) => {
  switch (type) {
    case "square":
      return "M0 0h1v1H0z";
    case "triangle":
      return "M0 1L0.5 0L1 1Z";
    default: // circle
      return "M0.5 1A0.5 0.5 0 1 1 0.5 0A0.5 0.5 0 0 1 0.5 1Z";
  }
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  elementType = "star",
  color = "rgba(255, 255, 255, 0.5)",
  count = 10000,
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [3, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {elementType === "star" ? (
              <motion.svg
                viewBox="0 0 24 24"
                fill={color}
                xmlns="https://img.freepik.com/free-vector/sticker-template-with-rocket-ship-isolated_1308-62159.jpg?semt=ais_hybrid"
              >
                <path d="M12 0L14.91 8.09L23 9.18L17.5 15.31L18.82 23L12 19.77L5.18 23L6.5 15.31L1 9.18L9.09 8.09L12 0Z" />
              </motion.svg>
            ) : (
              <motion.svg viewBox="0 0 1 1" xmlns="https://img.freepik.com/free-vector/sticker-template-with-rocket-ship-isolated_1308-62159.jpg?semt=ais_hybrid">
                <path d={getElementPath(elementType)} fill={color} />
              </motion.svg>
            )}
          </motion.div>
        ))}
      </div>
      {children}
    </div>
  );
};
