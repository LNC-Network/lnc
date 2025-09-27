"use client";

import React, { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, PanInfo, spring } from "framer-motion";
import { ProjectCard } from "./project-card";

interface Project {
  title: string;
  quote: string;
  author: {
    name: string;
    position: string;
    company: string;
  };
  color: string;
}

const sampleProjects: Project[] = [
  {
    title: "E-Commerce Platform",
    quote:
      "This platform revolutionized our online sales and increased our conversion rate by 300%. The user experience is seamless and the backend is incredibly robust.",
    author: {
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechCorp Solutions",
    },
    color: "#FF6B35",
  },
  {
    title: "AI Analytics Dashboard",
    quote:
      "The insights we get from this dashboard have transformed how we make business decisions. It's intuitive, powerful, and saves us hours of manual analysis.",
    author: {
      name: "Mike Chen",
      position: "Data Director",
      company: "Analytics Pro",
    },
    color: "#00C896",
  },
  {
    title: "Mobile Banking App",
    quote:
      "Security, speed, and simplicity - this app delivers on all fronts. Our customers love it and our support tickets have decreased by 70%.",
    author: {
      name: "Lisa Rodriguez",
      position: "Product Manager",
      company: "SecureBank",
    },
    color: "#FFD23F",
  },
];

const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0 0 25px #7E27C2, 0 0 50px #7E27C2",
    transition: {
      type: spring,
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

const Projects = () => {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

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

  return (
    <section
      id="projects"
      className="bg-black text-white px-4 sm:px-6 lg:px-12 py-8 sm:py-12 min-h-screen"
    >
      {/* Title */}
      <motion.div
        className="flex justify-center items-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Projects
        </motion.h2>
      </motion.div>

      {/* Slider */}
      <div className="relative flex items-center justify-center w-full max-w-6xl mx-auto px-4 lg:px-16 xl:px-24">
        {/* Left Arrow */}
        <motion.button
          onClick={handlePrev}
          aria-label="Previous project"
          disabled={projectData.length <= 1}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hidden lg:flex absolute left-0 lg:left-4 xl:left-8 z-10 p-3 sm:p-4 lg:p-5 rounded-full bg-black/80 backdrop-blur-sm border-2 border-[#7E27C2] cursor-pointer transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7E27C2]/20"
          style={{
            boxShadow: "0 0 10px #7E27C2, 0 0 20px #7E27C2",
          }}
        >
          <ArrowLeft className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
        </motion.button>

        {/* Right Arrow */}
        <motion.button
          onClick={handleNext}
          aria-label="Next project"
          disabled={projectData.length <= 1}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hidden lg:flex absolute right-0 lg:right-4 xl:right-8 z-10 p-3 sm:p-4 lg:p-5 rounded-full bg-black/80 backdrop-blur-sm border-2 border-[#7E27C2] cursor-pointer transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7E27C2]/20"
          style={{
            boxShadow: "0 0 10px #7E27C2, 0 0 20px #7E27C2",
          }}
        >
          <ArrowRight className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
        </motion.button>

        {/* Card Slider */}
        <div className="relative w-full flex items-center justify-center overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              className="w-full flex justify-center"
            >
              <ProjectCard project={projectData[index]} index={index} />
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
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                i === index ? "bg-violet-500" : "bg-gray-600 hover:bg-gray-400"
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
