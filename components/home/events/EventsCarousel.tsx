"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

export interface EventItem {
  id: string;
  title: string;
  imageUrl: string;
  date?: string;
  description?: string;
  location?: string;
  category?: string;
}

interface EventsCarouselProps {
  events: EventItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  showArrows?: boolean;
  showIndicators?: boolean;
}

const EventsCarousel: React.FC<EventsCarouselProps> = ({
  events,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = "",
  showArrows = true,
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = useMemo(() => events.length, [events.length]);
  const VISIBLE_CARDS = 5; // Always show 5 cards for consistent animation
  const CARD_SPACING = 160; // Space between cards

  const goToNext = useCallback(() => {
    if (isTransitioning || totalSlides <= 1) return;

    setIsTransitioning(true);

    // Update index immediately and let CSS transitions handle the animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, totalSlides]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning || totalSlides <= 1) return;

    setIsTransitioning(true);

    // Update index immediately and let CSS transitions handle the animation
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides
      );
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, totalSlides]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex || totalSlides <= 1) return;

      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning, currentIndex, totalSlides]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalSlides <= 1 || isPaused) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext, totalSlides, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case " ":
          event.preventDefault();
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Generate extended visible cards for smooth rolling
  const getVisibleCards = useCallback(() => {
    const visibleCards = [];
    const centerOffset = Math.floor(VISIBLE_CARDS / 2);

    // Generate one extra card on each side for smooth transitions
    for (let i = -1; i <= VISIBLE_CARDS; i++) {
      const position = i - centerOffset;
      const index = (currentIndex + position + totalSlides) % totalSlides;

      visibleCards.push({
        event: events[index],
        index,
        position,
        key: `${events[index].id}-${index}`,
      });
    }

    return visibleCards;
  }, [currentIndex, totalSlides, events]);

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-400">
        <div className="text-6xl mb-4">🎪</div>
        <p className="text-xl font-medium">No events scheduled</p>
        <p className="text-sm text-gray-500 mt-2">
          Check back later for updates
        </p>
      </div>
    );
  }

  const visibleCards = getVisibleCards();

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Events carousel"
      aria-live="polite"
    >
      {/* 3D Perspective Container */}
      <div
        className="relative h-[500px] flex items-center justify-center overflow-hidden"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "center center",
        }}
      >
        {/* Cards Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {visibleCards.map(({ event, index, position, key }) => {
            const isCenter = position === 0;
            const absPosition = Math.abs(position);

            // Position calculations for 3D effect
            const baseTranslateX = position * CARD_SPACING;
            const translateZ = isCenter ? 0 : -absPosition * 100;
            const rotateY = isCenter ? 0 : position > 0 ? -8 : 8;
            const scale = isCenter ? 1 : Math.max(0.8, 1 - absPosition * 0.05);
            const opacity =
              absPosition > 2 ? 0 : Math.max(0.5, 1 - absPosition * 0.12);

            return (
              <div
                key={key}
                className={`absolute cursor-pointer ${
                  isTransitioning 
                    ? 'transition-all duration-300 ease-out' 
                    : 'transition-all duration-500 ease-out'
                }`}
                style={{
                  zIndex: isCenter ? 20 : Math.max(1, 15 - absPosition),
                  transform: `translateX(${baseTranslateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => !isCenter && goToSlide(index)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !isCenter) {
                    e.preventDefault();
                    goToSlide(index);
                  }
                }}
                tabIndex={isCenter ? -1 : 0}
                role="button"
                aria-label={`View ${event.title}`}
              >
                {/* Event Card */}
                <div
                  className={`relative w-80 h-96 group ${isCenter ? "shadow-2xl" : "shadow-lg"
                    }`}
                >
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden border transition-all duration-500 ${isCenter
                      ? "border-purple-500/70 bg-gray-900 shadow-purple-500/30"
                      : "border-gray-700/50 bg-gray-800/90 backdrop-blur-sm"
                      }`}
                  >
                    {/* Event Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className={`object-cover transition-all duration-500 ${isCenter
                          ? "scale-100 brightness-100 contrast-100"
                          : "scale-95 brightness-80 contrast-95"
                          }`}
                        sizes="320px"
                        priority={absPosition <= 1}
                        loading={absPosition <= 1 ? "eager" : "lazy"}
                      />

                      {/* Dynamic Overlay */}
                      <div
                        className={`absolute inset-0 transition-all duration-500 ${isCenter
                          ? "bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"
                          : "bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/40"
                          }`}
                      />

                      {/* Category Badge */}
                      {event.category && (
                        <div
                          className={`absolute top-4 left-4 px-3 py-1.5 backdrop-blur-sm text-white text-sm font-medium rounded-full transition-all duration-300 border ${isCenter
                            ? "bg-purple-600/90 border-purple-400/50"
                            : "bg-gray-700/90 border-gray-600/50"
                            }`}
                        >
                          {event.category}
                        </div>
                      )}

                      {/* Center Card Enhancement */}
                      {isCenter && (
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/8 via-transparent to-blue-500/8" />
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="p-5 space-y-3">
                      <h3
                        className={`font-bold transition-all duration-300 line-clamp-2 leading-tight ${isCenter
                          ? "text-lg text-white"
                          : "text-base text-gray-300"
                          }`}
                      >
                        {event.title}
                      </h3>

                      <p
                        className={`line-clamp-2 leading-relaxed transition-all duration-300 ${isCenter
                          ? "text-sm text-gray-300"
                          : "text-xs text-gray-500"
                          }`}
                      >
                        {event.description}
                      </p>

                      <div
                        className={`flex items-center gap-4 transition-all duration-300 ${isCenter
                          ? "text-xs text-gray-400"
                          : "text-xs text-gray-600"
                          }`}
                      >
                        {event.date && (
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="flex-shrink-0" />
                            <span className="truncate">{event.date}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} className="flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Interactive Hover Effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${isCenter
                        ? "bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-100"
                        : "bg-gradient-to-r from-purple-500/8 to-blue-500/8 opacity-0 group-hover:opacity-100"
                        }`}
                    />
                  </div>

                  {/* Enhanced Glow for Center Card */}
                  {isCenter && (
                    <>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/15 to-blue-500/15 -z-10 blur-xl transform scale-105" />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/8 to-blue-500/8 -z-10 blur-2xl transform scale-110" />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        {showArrows && totalSlides > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={isTransitioning}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-gray-900/95 hover:bg-purple-600/90 border border-gray-700 hover:border-purple-400 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 group shadow-xl hover:scale-105"
              aria-label="Previous event"
            >
              <ChevronLeft
                size={20}
                className="group-hover:scale-110 transition-transform duration-200"
              />
            </button>

            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-gray-900/95 hover:bg-purple-600/90 border border-gray-700 hover:border-purple-400 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 group shadow-xl hover:scale-105"
              aria-label="Next event"
            >
              <ChevronRight
                size={20}
                className="group-hover:scale-110 transition-transform duration-200"
              />
            </button>
          </>
        )}
      </div>

      {/* Progress Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6 sm:mt-8 px-4">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${index === currentIndex
                ? "w-8 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/50"
                : "w-2 h-2 bg-gray-600 hover:bg-gray-500 rounded-full border border-gray-700 hover:border-gray-600"
                }`}
              aria-label={`Go to event ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsCarousel;