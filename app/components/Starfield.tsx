"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const stars: { x: number; y: number; z: number; color: string }[] = [];
        const numStars = 500;
        const speed = 2; // Slightly faster for more energy

        // Initialize stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
                color: `rgba(254, 254, 254, 0.2)`, // Toned down opacity
            });
        }

        const draw = () => {
            // Clear with trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Low opacity for trails
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            stars.forEach((star) => {
                // Move star closer
                star.z -= speed;

                // Reset if behind camera
                if (star.z <= 0) {
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                    star.z = width;
                }

                // Projection
                const k = 128 / star.z; // Field of view
                const px = star.x * k + cx;
                const py = star.y * k + cy;

                // Size based on depth
                const size = (1 - star.z / width) * 1.5;

                // Initial check if on screen
                if (px >= 0 && px <= width && py >= 0 && py <= height && size > 0) {
                    ctx.beginPath();
                    ctx.fillStyle = star.color;
                    ctx.arc(px, py, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        };

        // Use GSAP ticker for optimized rendering
        const ticker = gsap.ticker.add(draw);

        // Event Handlers
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            gsap.ticker.remove(draw);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full block z-0 pointer-events-none"
        />
    );
}
