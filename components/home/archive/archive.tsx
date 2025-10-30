'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo, spring } from 'framer-motion';

interface BlogItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
}

interface ArchiveData {
  blogs: BlogItem[];
  gallery: GalleryItem[];
}

const buttonVariants = {
  hover: {
    transition: {
      type: spring,
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.8,
    transition: { duration: 0.05 },
  },
};

const Archive = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'gallery'>('blogs');
  const [data, setData] = useState<ArchiveData>({ blogs: [], gallery: [] });
  const [[index], setIndex] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Data/blog.json');
        const archiveData = await response.json();
        setData(archiveData);
      } catch (error) {
        console.error('Error fetching archive data:', error);
      }
    };

    fetchData();
  }, []);

  const currentItems = activeTab === 'blogs' ? data.blogs : data.gallery;

  const handlePrev = useCallback(() => {
    setIndex(([prev]) => [prev === 0 ? currentItems.length - 1 : prev - 1, -1]);
  }, [currentItems.length]);

  const handleNext = useCallback(() => {
    setIndex(([prev]) => [(prev + 1) % currentItems.length, 1]);
  }, [currentItems.length]);

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

  const handleTabChange = (tab: 'blogs' | 'gallery') => {
    setActiveTab(tab);
    setIndex([0, 0]);
  };

  return (
    <section
      id="archive"
      className="text-white px-4 sm:px-6 lg:px-12 py-8 sm:py-12"
      style={{ backgroundColor: 'rgb(14,14,14)' }}
    >
      {/* Title */}
      <motion.div
        className="flex justify-start items-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Archive
        </motion.h2>
      </motion.div>

      {/* Tab Navigation - Horizontal */}
      <motion.div
        className="flex justify-center gap-4 mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.button
          onClick={() => handleTabChange('blogs')}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition-all duration-300 ${activeTab === 'blogs'
              ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.6)]'
              : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-purple-600/20'
            }`}
        >
          BLOGS
        </motion.button>

        <motion.button
          onClick={() => handleTabChange('gallery')}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition-all duration-300 ${activeTab === 'gallery'
              ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.6)]'
              : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-purple-600/20'
            }`}
        >
          GALLERY
        </motion.button>
      </motion.div>

      {/* Slider */}
      <div className="relative flex items-center justify-center w-full mx-auto px-4 lg:px-16 xl:px-24">
        {/* Left Arrow */}
        <motion.button
          onClick={handlePrev}
          aria-label="Previous item"
          disabled={currentItems.length <= 1}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.001 }}
          className="hidden lg:flex absolute left-0 lg:left-4 xl:left-8 z-10 p-3 sm:p-4 lg:p-5 rounded-full bg-black/80 border-1 border-[#7E27C2] cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7E27C2]/20"
          style={{
            boxShadow: 'inset 0 0 10px #7E27C2,inset 0 0 20px #7E27C2',
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
          aria-label="Next item"
          disabled={currentItems.length <= 1}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.05 }}
          className="hidden lg:flex absolute right-0 lg:right-4 xl:right-8 z-10 p-3 sm:p-4 lg:p-5 rounded-full bg-black/80 border-1 border-[#7E27C2] cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7E27C2]/20"
          style={{
            boxShadow: 'inset 0 0 10px #7E27C2, inset 0 0 20px #7E27C2',
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
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              animate={{ x: 0, opacity: 1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              className="w-full flex justify-center px-4"
            >
              {currentItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 hover:shadow-[0_0_40px_rgba(147,51,234,0.8)] transition-all duration-700 ease-out group cursor-pointer hover:scale-105 hover:bg-gray-800/60 w-full max-w-2xl"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-64 bg-gray-800 overflow-hidden">
                    <Image
                      src={currentItems[index].image}
                      alt={currentItems[index].title}
                      fill
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 group-hover:text-purple-300 transition-all duration-500 ease-out">
                      {currentItems[index].title}
                    </h3>

                    {activeTab === 'blogs' ? (
                      <>
                        <p className="text-gray-400 text-sm sm:text-base mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-500">
                          {(currentItems[index] as BlogItem).excerpt}
                        </p>
                        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-500">
                          <span>{(currentItems[index] as BlogItem).author}</span>
                          <span>{(currentItems[index] as BlogItem).readTime}</span>
                        </div>
                        <div className="mt-2 text-xs sm:text-sm text-purple-400 group-hover:text-purple-300 transition-colors duration-500">
                          {(currentItems[index] as BlogItem).category}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-400 text-sm sm:text-base mb-4 group-hover:text-gray-300 transition-colors duration-500">
                          {(currentItems[index] as GalleryItem).description}
                        </p>
                        <div className="mb-3">
                          <span className="text-xs sm:text-sm text-purple-400 font-medium group-hover:text-purple-300 transition-colors duration-500">
                            {(currentItems[index] as GalleryItem).category}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(currentItems[index] as GalleryItem).technologies.map(
                            (tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-purple-600/20 text-purple-300 text-xs sm:text-sm rounded-full border border-purple-500/30 group-hover:bg-purple-500/30 group-hover:border-purple-400/50 group-hover:text-purple-200 group-hover:scale-105 transition-all duration-500 ease-out"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicators */}
      {currentItems.length > 1 && (
        <motion.div
          className="flex justify-center mt-6 sm:mt-8 gap-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {currentItems.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              aria-label={`Go to item ${i + 1}`}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${i === index ? 'bg-violet-500' : 'bg-gray-600 hover:bg-gray-400'
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: i === index ? 1.25 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Archive;
