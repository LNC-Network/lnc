"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo, spring } from "framer-motion";
import { ProjectCard } from "./project-card";
import useMediaQuery from "./useMediaQuery";

interface Project {
  title: string;
  description: string;
  githubUrl: string;
  color: string;
}

const sampleProjects: Project[] = [
  {
    title: "LYNQ - Decentralized Finance Platform",
    description:
      "LYNQ is a revolutionary decentralized finance platform built entirely on the U2U blockchain. Our mission is to democratize access to financial services while maintaining the highest standards of security, compliance, and user experience. We provide innovative lending solutions for both crypto-native users and Web3 newcomers.",
    githubUrl: "https://github.com/ROHIT8759/FLASH_Lone_System",
    color: "#FFD23F",
  },
  {
    title: "Higher",
    description:
      "Higher is an open platform for writing and sharing articles and documents. It's a place for anyone to express ideas, share knowledge, and connect with readers.",
    githubUrl: "https://github.com/LNC-Network/higher",
    color: "#FF6B35",
  },
  {
    title: "TuringLab",
    description:
      "The insights we get from this dashboard have transformed how we make business decisions. It's intuitive, powerful, and saves us hours of manual analysis.",
    githubUrl: "https://github.com/LNC-Network/TuringLab",
    color: "#00C896",
  },
  {
    title: "DOCS",
    description:
      "LNC Network's central documentation hub built with Docusaurus, providing comprehensive guides and references for multiple technologies.",
    githubUrl: "https://github.com/LNC-Network/docs",
    color: "#FFD23F",
  },
  {
    title: "Fortress",
    description:
      "Secure, open-source alternative to HashiCorp Vault for managing secrets, API keys, and credentials. Features encryption, access control, audit logs, and a modern web dashboard.",
    githubUrl: "https://github.com/LNC-Network/Fortress",
    color: "#FFD23F",
  },
  {
    title: "Smart Mirror Model Trainer: CNN-Based Image Classification",
    description:
      "",
    githubUrl: "https://github.com/LNC-Network/emotion-recognition-model",
    color: "#FFD23F",
  },
  {
    title: "NQTR",
    description:
      "",
    githubUrl: "https://github.com/LNC-Network/nqtr",
    color: "#FFD23F",
  },
  {
    title: "Vlab",
    description:
      "",
    githubUrl: "https://github.com/LNC-Network/Vlab-lnc",
    color: "#FFD23F",
  },
  {
    title: "Coming Soon",
    description:
      "Coming Soon",
    githubUrl: "https://github.com/LNC-Network/",
    color: "#FFD23F",
  },
];

const buttonVariants = {
  hover: {
    transition: {
      type: spring,
      stiffness: 400, // ⚡ snappy spring
      damping: 10, // less resistance
    },
  },
  tap: {
    scale: 0.8,
    transition: { duration: 0.05 },
  },
};

const Projects = () => {
  const [[index], setIndex] = useState<[number, number]>([0, 0]);

  const projectData = sampleProjects;

  const handlePrev = useCallback(() => {
    setIndex(([prev]) => [prev === 0 ? projectData.length - 1 : prev - 1, -1]);
  }, [projectData.length]);

  const handleNext = useCallback(() => {
    setIndex(([prev]) => [(prev + 1) % projectData.length, 1]);
  }, [projectData.length]);

  // Handle swipe gestures
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeThreshold = 50;
      if (info.offset.x > swipeThreshold) {
        handlePrev();
      } else if (info.offset.x < -swipeThreshold) {
        handleNext();
      }
    },
    [handleNext, handlePrev]
  );

  const isLarge = useMediaQuery("(min-width: 1024px)");
  const visibleCards = isLarge ? 2 : 1;

  return (
    <section
      id="projects"
      className=" text-white px-4 sm:px-6 lg:px-12 py-8 sm:py-12"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      {/* Title */}
      <motion.div
        className="flex justify-start items-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Projects
        </motion.h2>
      </motion.div>

      {/* Slider */}
      <div className="relative flex items-center justify-center w-full mx-auto px-4 lg:px-16 xl:px-24">
        {/* Left Arrow */}
        <motion.button
          onClick={handlePrev}
          aria-label="Previous project"
          disabled={projectData.length <= 1}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          // initial={{ opacity: 0, x: -10 }}
          // animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.001 }}
          className="hidden lg:flex absolute left-0 lg:left-4 xl:left-8 z-10 p-3 sm:p-4 lg:p-5 rounded-full bg-black/80 border-1 border-[#7E27C2] cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7E27C2]/20"
          style={{
            boxShadow: "inset 0 0 10px #7E27C2,inset 0 0 20px #7E27C2",
          }}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>

        {/* Right Arrow */}
        <motion.button
          onClick={handleNext}
          aria-label="Next project"
          disabled={projectData.length <= 1}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          // initial={{ opacity: 0, x: 10 }}
          // animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.05 }} // ⚡ instant entry
          className="hidden lg:flex absolute right-0 lg:right-4 xl:right-8 z-10 p-3 sm:p-4 lg:p-5 rounded-full bg-black/80 border-1 border-[#7E27C2] cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7E27C2]/20"
          style={{
            boxShadow: "inset 0 0 10px #7E27C2, inset 0 0 20px #7E27C2",
          }}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>

        {/* Card Slider */}
        <div className="relative w-full flex items-center justify-center overflow-hidden">
          <AnimatePresence
            // custom={direction}
            mode="wait"
          >
            <motion.div
              key={index}
              // custom={direction}
              // initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              // exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              // transition={{ type: "spring", stiffness: 300, damping: 10 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              className="w-full flex justify-center gap-6 px-4"
            >
              {Array.from({ length: visibleCards }).map((_, i) => {
                const project = projectData[(index + i) % projectData.length];
                return (
                  <ProjectCard key={i} project={project} index={index + i} />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicators */}
      {projectData.length > 1 && (
        <motion.div
          className="flex justify-center mt-6 sm:mt-8 gap-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {projectData.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              aria-label={`Go to project ${i + 1}`}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${i === index ? "bg-violet-500" : "bg-gray-600 hover:bg-gray-400"
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: i === index ? 1.25 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
