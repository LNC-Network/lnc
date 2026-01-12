"use client";
import React, { useEffect, useState } from "react";
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.round((scrollTop / docHeight) * 100));
    };
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-none mix-blend-difference">
      <div className="flex items-end gap-1 font-pixel text-[#9810fa]">
        <span className="text-4xl font-bold tracking-tighter">{progress}</span>
        <span className="text-sm mb-1">%</span>
      </div>
    </div>
  );
}
