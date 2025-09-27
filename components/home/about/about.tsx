// "use client";

// import React, { useEffect, useState, useRef, memo } from "react";
// import Spline from "@splinetool/react-spline";

// const MemoizedSpline = memo(Spline);

// type CounterProps = {
//   end: number;
//   duration?: number;
//   shouldStart: boolean;
// };

// const Counter: React.FC<CounterProps> = ({
//   end,
//   duration = 1200,
//   shouldStart,
// }) => {
//   const [count, setCount] = useState(-100);
//   const hasStarted = useRef(false);

//   useEffect(() => {
//     if (!shouldStart || hasStarted.current) return;

//     hasStarted.current = true;
//     const startValue = -100;
//     const startTime = Date.now();

//     const animate = () => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
//       const currentCount = Math.floor(
//         startValue + easeOutExpo * (end - startValue)
//       );

//       setCount((prev) => (prev !== currentCount ? currentCount : prev));

//       if (progress < 1) requestAnimationFrame(animate);
//       else setCount(end);
//     };

//     requestAnimationFrame(animate);
//   }, [shouldStart, end, duration]);

//   return (
//     <span className={`${count < 0 ? "text-red-400" : ""}`}>
//       {count < 0 ? count : `${count}+`}
//     </span>
//   );
// };

// // Memoized stat card to prevent unnecessary re-renders
// const StatCard = memo(
//   ({
//     item,
//     isVisible,
//     index,
//   }: {
//     item: any;
//     isVisible: boolean;
//     index: number;
//   }) => (
//     <div
//       className={`flex flex-col items-center justify-center transform transition-all duration-1000 ease-out ${
//         isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//       }`}
//       style={{ transitionDelay: `${index * 200}ms` }}
//     >
//       <p
//         className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold whitespace-nowrap transition-all duration-500"
//         style={{
//           textShadow: isVisible
//             ? `0 0 30px ${item.color}`
//             : `0 0 10px ${item.color}`,
//           transform: isVisible ? "scale(1)" : "scale(0.95)",
//         }}
//       >
//         {item.label}
//       </p>
//       <p
//         className="mt-2 text-[20px] sm:text-[24px] md:text-[28px] font-medium transition-all duration-500"
//         style={{
//           textShadow: isVisible
//             ? `0 0 20px ${item.color}`
//             : `0 0 8px ${item.color}`,
//           transform: isVisible ? "scale(1)" : "scale(0.95)",
//         }}
//       >
//         <Counter
//           end={item.count}
//           duration={item.duration}
//           shouldStart={isVisible}
//         />
//       </p>
//     </div>
//   )
// );

// const About = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [showSpline, setShowSpline] = useState(false);
//   const statsRef = useRef<HTMLDivElement>(null);

//   // Lazy-load Spline after page is stable
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSpline(true), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Intersection observer to trigger counters & animations
//   useEffect(() => {
//     const target = statsRef.current;
//     if (!target) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//             observer.disconnect(); // stop observing after first trigger
//           }
//         });
//       },
//       { threshold: 0.3, rootMargin: "-50px 0px -50px 0px" }
//     );

//     observer.observe(target);
//     return () => observer.disconnect();
//   }, []);

//   const stats = [
//     {
//       label: "Events",
//       count: 5,
//       color: "rgba(238, 185, 255, 1)",
//       duration: 1400,
//     },
//     {
//       label: "Workshops",
//       count: 3,
//       color: "rgba(227, 128, 255, 0.3)",
//       duration: 1200,
//     },
//     {
//       label: "Core Team Members",
//       count: 25,
//       color: "rgba(194, 116, 255, 1)",
//       duration: 1600,
//     },
//     {
//       label: "Members",
//       count: 1000,
//       color: "rgba(255, 255, 255, 0.9)",
//       duration: 2000,
//     },
//   ];

//   return (
//     <section
//       id="about"
//       className="flex flex-col items-center text-white min-h-screen"
//       style={{ background: "rgba(14,14,14,1)" }}
//     >
//       {/* Heading */}
//       <div className="flex flex-col justify-center p-8 mb-16 w-full max-w-screen-xl text-left">
//         <h1 className="font-inter font-semibold text-[48px] sm:text-[72px] md:text-[96px] lg:text-[108.79px] leading-tight mb-8">
//           About <span className="text-[#C274FF]">Us</span>
//         </h1>
//         <p className="font-inter font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-relaxed mt-4 max-w-[90%]">
//           <strong>LNC</strong> is a fresh, dynamic tech community dedicated to
//           reshaping how students and professionals connect, learn, and innovate.
//         </p>
//         <p className="font-inter font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-relaxed mt-6 max-w-[90%]">
//           We offer a collaborative platform where tech enthusiasts can sharpen
//           their skills, work on real-world projects, and engage with a network
//           of like-minded individuals passionate about technology and growth.
//         </p>
//       </div>

//       {/* Spline Globe */}
//       <div className="relative w-[90vw] max-w-[900px] aspect-[1/1] overflow-hidden rounded-full drop-shadow-[0_20px_40px_#7E27C2]">
//         {showSpline && (
//           <MemoizedSpline
//             scene="/scene.splinecode"
//             className="absolute inset-0 w-full h-full"
//           />
//         )}
//         <div className="absolute inset-0 z-10 cursor-default"></div>
//       </div>

//       {/* Stats */}
//       <div
//         ref={statsRef}
//         className="w-full max-w-7xl mx-auto grid grid-cols-1 min-[400px]:grid-cols-2 min-[900px]:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-8 sm:gap-y-12 text-center px-4 mt-8"
//       >
//         {stats.map((item, index) => (
//           <StatCard
//             key={index}
//             item={item}
//             isVisible={isVisible}
//             index={index}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default About;
