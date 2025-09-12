"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
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
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const CARD_WIDTH = 320;
  const CARD_SPACING = 20;
  const DRAG_THRESHOLD = 50;
  
  // Create infinite loop array (triple the events for smooth infinite scroll)
  const infiniteEvents = [...events, ...events, ...events];
  const centerOffset = events.length * (CARD_WIDTH + CARD_SPACING);
  
  // Calculate drag constraints
  const dragConstraints = {
    left: -(events.length * 2 - 1) * (CARD_WIDTH + CARD_SPACING),
    right: 0
  };

  // Handle infinite scroll reset
  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      if (isDragging) return;
      
      // Reset position for infinite scroll
      if (latest > -centerOffset + (CARD_WIDTH + CARD_SPACING)) {
        x.set(latest - centerOffset);
      } else if (latest < -centerOffset * 2 + (CARD_WIDTH + CARD_SPACING)) {
        x.set(latest + centerOffset);
      }
    });
    
    return unsubscribe;
  }, [x, centerOffset, isDragging, CARD_WIDTH, CARD_SPACING]);

  // Smooth snap to nearest card
  const snapToCard = (velocity: number = 0) => {
    const offset = x.get() + velocity * 0.2;
    const nearestIndex = Math.round(-offset / (CARD_WIDTH + CARD_SPACING));
    const targetX = -nearestIndex * (CARD_WIDTH + CARD_SPACING);
    
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      velocity: velocity,
      onComplete: () => {
        // Update current index based on position
        const actualIndex = Math.abs(Math.round(targetX / (CARD_WIDTH + CARD_SPACING))) % events.length;
        setCurrentIndex(actualIndex);
      }
    });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    snapToCard(info.velocity.x);
  };

  const goToNext = () => {
    const targetX = x.get() - (CARD_WIDTH + CARD_SPACING);
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }
    });
  };

  const goToPrevious = () => {
    const targetX = x.get() + (CARD_WIDTH + CARD_SPACING);
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
      }
    });
  };

  const goToSlide = (index: number) => {
    const currentPos = Math.round(-x.get() / (CARD_WIDTH + CARD_SPACING));
    const currentModIndex = currentPos % events.length;
    const diff = index - currentModIndex;
    const targetX = x.get() - diff * (CARD_WIDTH + CARD_SPACING);
    
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onComplete: () => {
        setCurrentIndex(index);
      }
    });
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay || events.length <= 1 || isPaused || isDragging) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, events.length, isPaused, isDragging, x]);

  // Initial position (start from center set)
  useEffect(() => {
    x.set(-centerOffset);
  }, [centerOffset, x]);

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-400">
        <div className="text-6xl mb-4">🎪</div>
        <p className="text-xl font-medium">No events scheduled</p>
        <p className="text-sm text-gray-500 mt-2">Check back later for updates</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Container */}
      <div className="relative h-[500px] overflow-hidden" ref={constraintsRef}>
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "center center",
          }}
        >
          {/* Draggable Cards Container */}
          <motion.div
            className="flex items-center absolute"
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x, cursor: isDragging ? "grabbing" : "grab" }}
            whileTap={{ cursor: "grabbing" }}
          >
            {infiniteEvents.map((event, index) => (
              <EventCard
                key={`${event.id}-${index}`}
                event={event}
                index={index}
                x={x}
                dragOffset={index * (CARD_WIDTH + CARD_SPACING)}
                totalCards={infiniteEvents.length}
                centerIndex={Math.floor(infiniteEvents.length / 2)}
                cardWidth={CARD_WIDTH}
                cardSpacing={CARD_SPACING}
                onCardClick={() => {
                  if (!isDragging) {
                    const eventIndex = index % events.length;
                    goToSlide(eventIndex);
                  }
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        {showArrows && events.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-gray-900/95 hover:bg-purple-600/90 border border-gray-700 hover:border-purple-400 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 group shadow-xl hover:scale-105"
              aria-label="Previous event"
            >
              <ChevronLeft size={20} className="group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-gray-900/95 hover:bg-purple-600/90 border border-gray-700 hover:border-purple-400 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 group shadow-xl hover:scale-105"
              aria-label="Next event"
            >
              <ChevronRight size={20} className="group-hover:scale-110 transition-transform duration-200" />
            </button>
          </>
        )}
      </div>

      {/* Progress Indicators */}
      {showIndicators && events.length > 1 && (
        <div className="flex justify-center gap-2 mt-6 sm:mt-8 px-4">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                index === currentIndex
                  ? "w-8 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/50"
                  : "w-2 h-2 bg-gray-600 hover:bg-gray-500 rounded-full border border-gray-700 hover:border-gray-600"
              }`}
              aria-label={`Go to event ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Individual Event Card Component
const EventCard: React.FC<{
  event: EventItem;
  index: number;
  x: any;
  dragOffset: number;
  totalCards: number;
  centerIndex: number;
  cardWidth: number;
  cardSpacing: number;
  onCardClick: () => void;
}> = ({ event, index, x, dragOffset, totalCards, centerIndex, cardWidth, cardSpacing, onCardClick }) => {
  // Calculate distance from center for 3D effects
  const distance = useTransform(
    x,
    (latest) => {
      const cardCenter = -dragOffset;
      const viewportCenter = -latest;
      return Math.abs(viewportCenter - cardCenter) / (cardWidth + cardSpacing);
    }
  );

  // 3D Transforms based on distance from center
  const scale = useTransform(distance, [0, 1, 2, 3], [1, 0.9, 0.85, 0.8]);
  const rotateY = useTransform(x, (latest) => {
    const cardCenter = -dragOffset;
    const viewportCenter = -latest;
    const diff = (viewportCenter - cardCenter) / (cardWidth + cardSpacing);
    return Math.max(-15, Math.min(15, diff * 8));
  });
  const z = useTransform(distance, [0, 1, 2, 3], [0, -50, -100, -150]);
  const opacity = useTransform(distance, [0, 1, 2, 3, 4], [1, 0.9, 0.7, 0.5, 0.3]);
  const brightness = useTransform(distance, [0, 1, 2], [1, 0.85, 0.7]);

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer"
      style={{
        width: cardWidth,
        marginRight: cardSpacing,
        scale,
        rotateY,
        z,
        opacity,
        transformStyle: "preserve-3d",
      }}
      onClick={onCardClick}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="relative w-full h-96 group"
        style={{ filter: useTransform(brightness, (b) => `brightness(${b})`) }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-700/50 bg-gray-800/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
          {/* Event Image */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="320px"
              priority={Math.abs(index - centerIndex) <= 2}
              loading={Math.abs(index - centerIndex) <= 2 ? "eager" : "lazy"}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
            
            {event.category && (
              <div className="absolute top-4 left-4 px-3 py-1.5 backdrop-blur-sm text-white text-sm font-medium rounded-full bg-purple-600/90 border border-purple-400/50">
                {event.category}
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="p-5 space-y-3">
            <h3 className="font-bold text-lg text-white line-clamp-2 leading-tight">
              {event.title}
            </h3>

            <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
              {event.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-400">
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

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventsCarousel;