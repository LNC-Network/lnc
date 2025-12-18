"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (docHeight <= 0) {
                setProgress(0);
                return;
            }

            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(Math.round(scrollPercent));
        };

        window.addEventListener("scroll", updateScroll);
        // Initial call
        updateScroll();

        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    // Always render, even at 0%
    return (
        <div className="fixed bottom-6 right-6 z-40 pointer-events-none mix-blend-difference">
            <div className="flex items-end gap-1 font-pixel text-[#d8b4fe] opacity-80">
                <span className="text-2xl font-bold tracking-tighter">
                    {progress}
                </span>
                <span className="text-sm mb-1">%</span>
            </div>
        </div>
    );
}
