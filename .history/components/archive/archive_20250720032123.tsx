'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BlogItem {
  id: number;
  title: string;
  excerpt: string;s
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

const Archive = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'gallery'>('blogs');
  const [data, setData] = useState<ArchiveData>({ blogs: [], gallery: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

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
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const displayItems = currentItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleTabChange = (tab: 'blogs' | 'gallery') => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  return (
    <section
      id="archive"
      className="min-h-screen w-full bg-black text-white p-8 md:p-16"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white">
            Archive
          </h1>
          
          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="p-2 sm:p-3 rounded-full bg-black border-2 border-[#7E27C2] hover:bg-[#7E27C2] cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={totalPages <= 1}
              style={{
                boxShadow: "0 0 5px #7E27C2, 0 0 15px #7E27C2, 0 0 60px #7E27C2",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px #7E27C2, 0 0 40px #7E27C2, 0 0 60px #7E27C2, 0 0 80px #7E27C2";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 5px #7E27C2, 0 0 15px #7E27C2, 0 0 60px #7E27C2";
              }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="p-2 sm:p-3 rounded-full bg-black border-2 border-[#7E27C2] hover:bg-[#7E27C2] cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={totalPages <= 1}
              style={{
                boxShadow: "0 0 5px #7E27C2, 0 0 15px #7E27C2, 0 0 60px #7E27C2",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px #7E27C2, 0 0 40px #7E27C2, 0 0 60px #7E27C2, 0 0 80px #7E27C2";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 5px #7E27C2, 0 0 15px #7E27C2, 0 0 60px #7E27C2";
              }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex gap-8">
          {/* Left Sidebar - Tab Navigation */}
          <div className="w-48 flex-shrink-0">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleTabChange('blogs')}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-500 ease-out group ${
                  activeTab === 'blogs'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                    : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-600/20 hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] hover:scale-105'
                }`}
              >
                <span className="text-lg font-medium transition-colors duration-500">BLOGS</span>
                <svg className="w-5 h-5 transition-all duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              <button
                onClick={() => handleTabChange('gallery')}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-500 ease-out group ${
                  activeTab === 'gallery'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                    : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-600/20 hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] hover:scale-105'
                }`}
              >
                <span className="text-lg font-medium transition-colors duration-500">GALLERY</span>
                <svg className="w-5 h-5 transition-all duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 hover:shadow-[0_0_40px_rgba(147,51,234,0.8)] transition-all duration-700 ease-out group cursor-pointer hover:scale-105 hover:bg-gray-800/60"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-800 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-all duration-500 ease-out group-hover:transform group-hover:-translate-y-1">
                  {item.title}
                </h3>
                
                {activeTab === 'blogs' ? (
                  <>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-500">
                      {(item as BlogItem).excerpt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-500">
                      <span>{(item as BlogItem).author}</span>
                      <span>{(item as BlogItem).readTime}</span>
                    </div>
                    <div className="mt-2 text-xs text-purple-400 group-hover:text-purple-300 transition-colors duration-500">
                      {(item as BlogItem).category}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-500">
                      {(item as GalleryItem).description}
                    </p>
                    <div className="mb-3">
                      <span className="text-xs text-purple-400 font-medium group-hover:text-purple-300 transition-colors duration-500">
                        {(item as GalleryItem).category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(item as GalleryItem).technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30 group-hover:bg-purple-500/30 group-hover:border-purple-400/50 group-hover:text-purple-200 group-hover:scale-105 transition-all duration-500 ease-out"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ease-out hover:scale-125 ${
                      index === currentPage
                        ? 'bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.8)] scale-125'
                        : 'bg-gray-600 hover:bg-purple-400 hover:shadow-[0_0_12px_rgba(147,51,234,0.6)]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Archive;
