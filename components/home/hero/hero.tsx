"use client";

import { useEffect, useRef } from "react";
import { animate } from "@/lib/hero/animation";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      animate(canvasRef.current);
    }
  }, []);



  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        id="canvas"
        className="w-full h-full block"
      ></canvas>
    </div>
  );
};

export default Hero;
