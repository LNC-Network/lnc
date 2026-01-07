"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export default function LoadingScreen() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);
  const maskRef = useRef<SVGSVGElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete: () => setIsComplete(true) });
      gsap.set(".hero-element", { opacity: 0 });
      tl.to(textRef.current, {
        scale: 60,
        duration: 3,
        transformOrigin: "50% 60%",
        ease: "power3.inOut",
      })
        .to(
          maskRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              if (maskRef.current) maskRef.current.style.display = "none";
            },
          },
          "<60%"
        )
        .to(
          ".hero-element",
          { opacity: 1, duration: 0.1, stagger: 0.1 },
          "<70%"
        );
    },
    { scope: container }
  );
  if (isComplete) return null;
  return (
    <section
      ref={container}
      className="relative w-full h-screen overflow-hidden font-pixel bg-background"
    >
      <svg
        ref={maskRef}
        className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="hero-mask">
            <rect width="100%" height="100%" fill="white" />
            <g ref={textRef}>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                className="font-pixel text-[15vw] font-bold"
              >
                L N C
              </text>
            </g>
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="#110023ff"
          mask="url(#hero-mask)"
        />
      </svg>
    </section>
  );
}
