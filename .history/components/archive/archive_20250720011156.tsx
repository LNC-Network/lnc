'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
              className="w-12 h-12 rounded-full bg-black border border-gray-600 flex items-center justify-center hover:bg-purple-600 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.8)] transition-all duration-300 group"
              disabled={totalPages <= 1}
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-black border border-gray-600 flex items-center justify-center hover:bg-purple-600 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.8)] transition-all duration-300 group"
              disabled={totalPages <= 1}
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 group ${
                  activeTab === 'blogs'
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-600/20 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]'
                }`}
              >
                <span className="text-lg font-medium">BLOGS</span>
                <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              <button
                onClick={() => handleTabChange('gallery')}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 group ${
                  activeTab === 'gallery'
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-600/20 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]'
                }`}
              >
                <span className="text-lg font-medium">GALLERY</span>
                <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-900/50 rounded-lg overflow-hidden border border-blue-500/30 hover:border-purple-500 hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-800 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image Placeholder</span>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h3>
                
                {activeTab === 'blogs' ? (
                  <>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {(item as BlogItem).excerpt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{(item as BlogItem).author}</span>
                      <span>{(item as BlogItem).readTime}</span>
                    </div>
                    <div className="mt-2 text-xs text-blue-400">
                      {(item as BlogItem).category}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-400 text-sm mb-4">
                      {(item as GalleryItem).description}
                    </p>
                    <div className="mb-3">
                      <span className="text-xs text-blue-400 font-medium">
                        {(item as GalleryItem).category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(item as GalleryItem).technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentPage
                        ? 'bg-blue-500'
                        : 'bg-gray-600 hover:bg-gray-500'
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
