"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
    "NEXT.JS",
    "VERCEL",
    "SUPABASE",
    "TURBOREPO",
    "TAILWIND",
    "FRAMER",
];

export default function Partners() {
    const container = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useGSAP(
        () => {
            // Header Animation
            gsap.from(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });

            // Grid Items Animation
            const items = (gridRef.current as any).children;
            gsap.from(items, {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                },
                y: 20,
                opacity: 100,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
            });
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="bg-transparent py-20 px-6 md:px-12 w-full font-pixel border-t-2 border-dashed border-white/10"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div ref={headerRef} className="mb-12 flex flex-col items-center text-center">
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-white mb-4">
                        POWERED BY THE BEST
                    </h2>
                    <div className="h-1 w-24 bg-purple-500 rounded-full" />
                </div>

                {/* Partners Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
                >
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="group relative w-full aspect-video flex items-center justify-center border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-crosshair"
                        >
                            <span className="text-sm md:text-base font-bold text-white/50 group-hover:text-white transition-colors duration-300 tracking-widest">
                                {partner}
                            </span>

                            {/* Corner Markers */}
                            <div className="absolute top-0 left-0 w-1 h-1 bg-white/20 group-hover:bg-purple-500 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/20 group-hover:bg-purple-500 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
