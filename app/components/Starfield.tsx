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
    const stars: { x: number; y: number; z: number }[] = [];
    const numStars = width < 768 ? 300 : 800;
    const speed = 2;
    for (let i = 0; i < numStars; i++)
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
      });
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      ctx.fillStyle = "rgba(254, 254, 254, 0.2)";
      ctx.beginPath();
      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
        }
        const k = 128 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;
        const size = (1 - star.z / width) * 1.5;
        if (px >= 0 && px <= width && py >= 0 && py <= height && size > 0) {
          ctx.moveTo(px + size, py);
          ctx.arc(px, py, size, 0, Math.PI * 2);
        }
      });
      ctx.fill();
    };
    gsap.ticker.add(draw);
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
