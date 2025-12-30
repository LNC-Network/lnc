"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * LoadingScreen Component
 * 
 * Displays a full-screen loading overlay with a "cutout" text effect.
 * The animation sequence:
 * 1. Scales the "LNC" text to create a "flying through" effect.
 * 2. Fades out the black overlay to reveal the main site content.
 * 
 * Uses GSAP for high-performance animation sequencing.
 */
export default function LoadingScreen() {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef(null);
    const maskRef = useRef<SVGSVGElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true)
        });

        // Initial clean state
        gsap.set(".hero-element", { opacity: 0, y: 30 });

        // The Reveal Animation
        tl.to(textRef.current, {
            scale: 60,
            duration: 3,
            transformOrigin: "50% 50%",
            ease: "power3.inOut",
        })
            .to(
                maskRef.current,
                {
                    opacity: 0, // Fade out concurrently with the end of the zoom
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (maskRef.current) maskRef.current.style.display = "none";
                    },
                },
                "<60%" // Start this at 60% of the previous tween (Zoom)
            )
            // Bring in the actual text content early
            .to(
                ".hero-element",
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                },
                "<70%" // Start overlapping shortly after the fade begins
            );
    }, { scope: container });

    // Remove from DOM after animation completes to unblock interactions
    if (isComplete) return null;

    return (
        <section
            ref={container}
            className="relative w-full h-screen overflow-hidden font-pixel bg-background"
        >
            {/* The Magic Mask Layer */}
            <svg
                ref={maskRef}
                className="absolute inset-0 z-20 w-full h-full pointer-events-none"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <mask id="hero-mask">
                        <rect width="100%" height="100%" fill="white" />

                        {/* Wrap text inside group */}
                        <g ref={textRef}>
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="black"
                                className="font-pixel text-[15vw] font-bold"
                            >
                                LNC
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
