"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoadingScreen() {
    const container = useRef(null);
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true)
        });

        // Initial state: Black screen, text visible
        // We want the text to be a "hole" to the content, or just white text that expands?
        // "Mask with written LNC" -> Text is transparent, background is black.
        // We see the site *through* the text?
        // OR: Text is white, background black, and we zoom into the white text until it fills screen (turning screen white/transparent)?

        // Let's go with: Text acts as a window to the content (Mask).
        // To do this naturally in CSS: 
        // 1. A Black overlay.
        // 2. Text with `mix-blend-mode: destination-out;` (on canvas) or simpler `background-clip: text` transparency?
        // Actually, CSS `clip-path` is hard for text.
        // Easier: SVG Mask.

        // Animation sequence:
        // 1. Screen is Black. "LNC" is transparent (showing the site behind? or just glowing?).
        // If the user says "in the loading", usually the site isn't ready.
        // Maybe the text is filled with a cool animated texture/gradient first.

        // Let's implement:
        // Huge "LNC" text.
        // Animation: Scale the text from normal -> Massive (camera flies through a letter).

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
            }, "-=0.5");

    }, { scope: container });

    if (isComplete) return null;

    return (
        <div ref={container} className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden pointer-events-none">
            {/* 
               SVG Mask approach for perfect text cutout:
               A black rectangle with LNC text cut out.
               The site behind will be visible through the text.
            */}
            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <mask id="lnc-mask">
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
                {/* The "curtain" that covers the screen, masked by the text */}
                <rect
                    className="loading-text origin-center"
                    width="100%"
                    height="100%"
                    fill="black"
                    mask="url(#lnc-mask)"
                />
            </svg>

            {/* Optional: Add a subtle loading spinner or subtext that fades out first */}
        </div>
    );
}
