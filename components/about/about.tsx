'use client';

import React, { useEffect, useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';


type CounterProps = {
  end: number;
  duration?: number;
};

const Counter: React.FC<CounterProps> = ({ end, duration = 1000 }) => {
  const [count, setCount] = useState(0);
  const start = useRef(0);

  useEffect(() => {
    start.current = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start.current += increment;
      if (start.current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start.current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}+</span>;
};

const About = () => {
  useEffect(() => {
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };
    window.addEventListener('wheel', preventZoom, { passive: false });
    return () => window.removeEventListener('wheel', preventZoom);
  }, []);

  return (
    <div
      className="flex flex-col items-center  text-white min-h-screen"
      style={{ background: 'rgba(14, 14, 14, 1)' }}
    >
      
      <div className="flex flex-col justify-center p-8 mb-16 w-full max-w-screen-xl text-left">
  <h1 className="font-inter font-semibold text-[48px] sm:text-[72px] md:text-[96px] lg:text-[108.79px] leading-tight mb-8 text-left">
    About <span className="text-[#C274FF]">Us</span>
  </h1>

        <p className="font-inter font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-relaxed text-white mt-4 max-w-[90%] ">
          <strong>LNC</strong> is a fresh, dynamic tech community dedicated to reshaping how students and professionals connect, learn, and innovate.
        </p>

        <p className="font-inter font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-relaxed text-white mt-6 max-w-[90%] ">
          We offer a collaborative platform where tech enthusiasts can sharpen their skills, work on real-world projects, and engage with a network of like-minded individuals passionate about technology and growth.
        </p>
      </div>

      
      <div className="w-full flex items-center justify-center drop-shadow-[0_30px_60px_#7E27C2] mb-16 mt-[-100px]">
      <div className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px]">
    <Spline scene="/scene.splinecode" className="absolute inset-0 w-full h-full" />
    <div className="absolute inset-0 z-10 cursor-default"></div>
  </div>
</div>

      
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-12 md:gap-y-0 text-center">
  {[
    { label: 'Events', count: 5, color: 'rgba(238, 185, 255, 1)' },
    { label: 'Workshops', count: 3, color: 'rgba(227, 128, 255, 0.3)' },
    { label: 'Core Team Members', count: 20, color: 'rgba(194, 116, 255, 1)' },
    { label: 'Members', count: 600, color: 'rgba(255, 255, 255, 0.9)' },
  ].map((item, index) => (
    <div key={index} className="flex flex-col items-center justify-center">
      <p
        className="text-[24px] sm:text-[30px] md:text-[36px] font-semibold whitespace-nowrap"
        style={{ textShadow: `0 0 30px ${item.color}` }}
      >
        {item.label}
      </p>
      <p
        className="mt-2 text-[24px] sm:text-[30px] md:text-[36px] font-medium"
        style={{ textShadow: `0 0 20px ${item.color}` }}
      >
        <Counter end={item.count} />
      </p>
    </div>
  ))}
</div>
    </div>
  );
};

export default About;
