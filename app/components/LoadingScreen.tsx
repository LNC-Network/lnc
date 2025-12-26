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
            delay: 0.5,
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
        >
            {/* 
               SVG Mask Strategy:
               We use an SVG mask to cut out the "LNC" text from a black rectangle.
               This allows the underlying website to be visible *through* the text,
               creating a "window" effect before the animation expands it.
            */}
            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <mask id="lnc-mask">
                        {/* White pixels = Opaque (Mask), Black pixels = Transparent (Hole) */}
                        {/* Wait, usually in SVG Mask: White = Visible, Black = Hidden. */}
                        {/* We want the RECT to be black, and textual HOLE to be see-through. */}
                        {/* So we need a White Rect (full cover) and Black Text (hole)? */
                        /* actually, we want the "curtain" (black overlay) to be visible everywhere EXCEPT the text. */
                        /* So mask should be White everywhere (keep the curtain), and Black at text (remove the curtain). */}

                        <rect width="100%" height="100%" fill="white" />
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dy=".35em"
                            className="text-[20vw] font-black"
                            fill="black"
                        >
                            LNC
                        </text>
                    </mask>
                </defs>

                {/* The "Curtain" Element */}
                <rect
                    className="loading-text origin-center"
                    width="100%"
                    height="100%"
                    fill="black"
                    mask="url(#lnc-mask)"
                />
            </svg>
        </div>
    );
}
