"use client";

import React from "react";
import { motion } from "framer-motion";
import Carousel from "./EventsCarousel";
import { useRouter } from "next/navigation";

const Events = () => {
  const router = useRouter();
  return (
    <motion.div
      id="events"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="h-auto w-full relative overflow-hidden"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      <motion.div
        className="text-left px-12"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white sm:mb-4 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text">
          Events <span className="text-purple-700">and</span> News
        </h2>
      </motion.div>
      <Carousel />
      <div className="flex justify-center items-center">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
          onClick={() => {
            router.push("/events");
          }}
        >
          <span>View All Events</span>
          <motion.svg
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Events;
