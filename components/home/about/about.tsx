"use client";

import React, { useEffect, useState, useRef } from "react";
import Spline from "@splinetool/react-spline";

type CounterProps = {
  end: number;
  duration?: number;
  shouldStart: boolean;
};

const Counter: React.FC<CounterProps> = ({ end, duration = 1200, shouldStart }) => {
  const [count, setCount] = useState(-100);
  const [shuffleCount, setShuffleCount] = useState(-100);
  const [hasStarted, setHasStarted] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    if (shouldStart && !hasStarted) {
      setHasStarted(true);
      setCount(-100);
      setIsShuffling(true);
      
      // Shuffling phase - rapid random numbers (including negatives)
      const shuffleDuration = duration * 0.3; // 30% of total duration for shuffling
      const shuffleInterval = 60; // Change number every 60ms for slower effect
      
      const shuffleTimer = setInterval(() => {
        // Random numbers from -150 to target * 1.2
        const randomRange = Math.random() * (end * 1.2 + 150) - 150;
        setShuffleCount(Math.floor(randomRange));
      }, shuffleInterval);
      
      // Stop shuffling and start counting from -100
      setTimeout(() => {
        clearInterval(shuffleTimer);
        setIsShuffling(false);
        
        const startTime = Date.now();
        const countingDuration = duration * 0.7; // 70% for actual counting
        const startValue = -100;
        const totalRange = end - startValue; // Total distance to cover
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / countingDuration, 1);
          
          // Easing function for smooth animation with dramatic acceleration
          const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentCount = Math.floor(startValue + (easeOutExpo * totalRange));
          
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(end);
          }
        };
        
        requestAnimationFrame(animate);
      }, shuffleDuration);
    }
  }, [shouldStart, hasStarted, end, duration]);

  // Reset when shouldStart becomes false (for re-triggering)
  useEffect(() => {
    if (!shouldStart) {
      setHasStarted(false);
      setCount(-100);
      setShuffleCount(-100);
      setIsShuffling(false);
    }
  }, [shouldStart]);

  const displayValue = isShuffling ? shuffleCount : count;
  const isNegative = displayValue < 0;

  return (
    <span className={`${isShuffling ? 'animate-pulse' : ''} ${isNegative ? 'text-red-400' : ''} transition-colors duration-300`}>
      {displayValue < 0 ? displayValue : `${displayValue}+`}
    </span>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };
    window.addEventListener("wheel", preventZoom, { passive: false });
    return () => window.removeEventListener("wheel", preventZoom);
  }, []);

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset when out of view for re-triggering
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: "-50px 0px -50px 0px", // Add some margin for better timing
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="flex flex-col items-center  text-white min-h-screen"
      style={{ background: "rgba(14, 14, 14, 1)" }}
    >
      <div className="flex flex-col justify-center p-8 mb-16 w-full max-w-screen-xl text-left">
        <h1 className="font-inter font-semibold text-[48px] sm:text-[72px] md:text-[96px] lg:text-[108.79px] leading-tight mb-8 text-left">
          About <span className="text-[#C274FF]">Us</span>
        </h1>

        <p className="font-inter font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-relaxed text-white mt-4 max-w-[90%] ">
          <strong>LNC</strong> is a fresh, dynamic tech community dedicated to
          reshaping how students and professionals connect, learn, and innovate.
        </p>

        <p className="font-inter font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-relaxed text-white mt-6 max-w-[90%] ">
          We offer a collaborative platform where tech enthusiasts can sharpen
          their skills, work on real-world projects, and engage with a network
          of like-minded individuals passionate about technology and growth.
        </p>
      </div>

      {/* Spline Globe Component */}
      <div className="relative w-[90vw] max-w-[900px] aspect-[1/1] overflow-hidden rounded-full drop-shadow-[0_30px_60px_#7E27C2] animate-pulse-slow">
        <Spline
          scene="/scene.splinecode"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 z-10 cursor-default"></div>
      </div>

      <div 
        ref={statsRef}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 min-[400px]:grid-cols-2 min-[900px]:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-8 sm:gap-y-12 text-center px-4 mt-8"
      >
        {[
          { label: "Events", count: 5, color: "rgba(238, 185, 255, 1)", duration: 1400 },
          { label: "Workshops", count: 3, color: "rgba(227, 128, 255, 0.3)", duration: 1200 },
          {
            label: "Core Team Members",
            count: 25,
            color: "rgba(194, 116, 255, 1)",
            duration: 1600,
          },
          { label: "Members", count: 1000, color: "rgba(255, 255, 255, 0.9)", duration: 2000 },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center transform transition-all duration-1000 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: `${index * 200}ms`, // Stagger the animations
            }}
          >
            <p
              className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold whitespace-nowrap transition-all duration-500"
              style={{ 
                textShadow: isVisible ? `0 0 30px ${item.color}` : `0 0 10px ${item.color}`,
                transform: isVisible ? 'scale(1)' : 'scale(0.95)',
              }}
            >
              {item.label}
            </p>
            <p
              className="mt-2 text-[20px] sm:text-[24px] md:text-[28px] font-medium transition-all duration-500"
              style={{ 
                textShadow: isVisible ? `0 0 20px ${item.color}` : `0 0 8px ${item.color}`,
                transform: isVisible ? 'scale(1)' : 'scale(0.95)',
              }}
            >
              <Counter 
                end={item.count} 
                duration={item.duration}
                shouldStart={isVisible}
              />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
