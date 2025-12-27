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
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true)
        });

        // Animation Sequence:
        // 1. Scale the "LNC" text massively (100x) to simulate passing through it.
        // 2. Fade out the container to reveal the app underneath.
        tl.to(".loading-text", {
            scale: 100,
            duration: 2,
            ease: "power4.inOut",
            delay: 0.2,
        })
            .to(container.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            }, "-=0.5"); // Overlap the fade-out with the end of the scale

    }, { scope: container });

    // Remove from DOM after animation completes to unblock interactions
    if (isComplete) return null;

    return (
        <div
            ref={container}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black overflow-hidden"
        >
            <div className="relative z-10 flex items-center justify-center">
                <h1
                    className="loading-text font-black mix-blend-difference"
                    style={{
                        fontSize: "20vw",
                        lineHeight: 1,
                        backgroundImage: "linear-gradient(white, white)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    LNC
                </h1>
            </div>
        </div>
    );
}
