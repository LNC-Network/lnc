"use client";

import React, { useEffect, useState, useRef } from "react";
import Spline from "@splinetool/react-spline";

type CounterProps = {
  end: number;
  duration?: number;
  shouldStart: boolean;
};

const Counter: React.FC<CounterProps> = ({ end, duration = 2000, shouldStart }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (shouldStart && !hasStarted) {
      setHasStarted(true);
      setCount(0);
      
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOutCubic * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [shouldStart, hasStarted, end, duration]);

  // Reset when shouldStart becomes false (for re-triggering)
  useEffect(() => {
    if (!shouldStart) {
      setHasStarted(false);
      setCount(0);
    }
  }, [shouldStart]);

  return <span>{count}+</span>;
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

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 min-[400px]:grid-cols-2 min-[900px]:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-8 sm:gap-y-12 text-center px-4 mt-8">
        {[
          { label: "Events", count: 5, color: "rgba(238, 185, 255, 1)" },
          { label: "Workshops", count: 3, color: "rgba(227, 128, 255, 0.3)" },
          {
            label: "Core Team Members",
            count: 25,
            color: "rgba(194, 116, 255, 1)",
          },
          { label: "Members", count: 1000, color: "rgba(255, 255, 255, 0.9)" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p
              className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold whitespace-nowrap"
              style={{ textShadow: `0 0 30px ${item.color}` }}
            >
              {item.label}
            </p>
            <p
              className="mt-2 text-[20px] sm:text-[24px] md:text-[28px] font-medium"
              style={{ textShadow: `0 0 20px ${item.color}` }}
            >
              <Counter end={item.count} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
