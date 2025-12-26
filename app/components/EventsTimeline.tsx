"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, ArrowRight, Circle, Activity } from "lucide-react";
import { EVENTS } from "../data/events";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function EventsTimeline() {
    const container = useRef(null);
    const groupsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Memoize the events to prevent re-renders (though static import is fine)
    // We can also calculate derived positions here if needed.

    useGSAP(
        () => {
            const groups = groupsRef.current.filter(Boolean);
            if (!groups.length) return;

            // Distance between cards in Z space
            const Z_SPACING = 800;
            const totalDepth = groups.length * Z_SPACING;

            // Initial Setup: Position groups deep in Z space
            gsap.set(groups, {
                z: (i) => -i * Z_SPACING,
                opacity: 0,
                // We don't touch X/Y here, as we want the group centered. 
                // X offsets are handled by the children (card vs node).
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: `+=${totalDepth}`, // Reduced scroll distance to prevent empty space
                    scrub: 1.5, // Smoother scrub
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // Animate groups towards the camera
            tl.to(groups, {
                z: (i) => totalDepth - i * Z_SPACING + 800, // Move forward past camera
                ease: "none",
                stagger: {
                    each: 0,
                },
            });

            // Opacity & Scale Effects based on Z position
            tl.eventCallback("onUpdate", () => {
                groups.forEach((group) => {
                    if (!group) return;
                    // @ts-ignore
                    const z = gsap.getProperty(group, "z") as number;

                    // Simple logic:
                    // Far away (< -3000): 0 opacity
                    // Approaching (-3000 to -500): fade in
                    // Active Zone (-500 to 200): full opacity
                    // Passed Camera (> 200): fade out rapidly

                    let opacity = 0;
                    if (z < -4000) opacity = 0;
                    else if (z < -500) opacity = gsap.utils.mapRange(-4000, -500, 0, 1, z);
                    else if (z < 300) opacity = 1;
                    else opacity = gsap.utils.mapRange(300, 800, 1, 0, z);

                    // Optional: Scale effect to enhance depth perception
                    // const scale = gsap.utils.mapRange(-4000, 500, 0.5, 1.2, z);

                    gsap.set(group, { opacity });
                });
            });
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="relative h-screen w-full bg-transparent overflow-hidden flex flex-col items-center justify-center font-pixel"
            style={{ perspective: "1000px" }}
        >
            {/* Speed Lines / Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Header */}
            <div className="absolute top-10 z-20 text-center">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#71717a] mb-2">
                    Timeline
                </h3>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide text-white">
                    Upcoming Events
                </h2>
                <p className="text-white/50 text-xs mt-2 font-mono animate-pulse">Scroll to Travel Time</p>
            </div>

            {/* 3D Container */}
            <div
                className="relative w-full h-full flex items-center justify-center pointer-events-none"
                style={{ transformStyle: "preserve-3d" }}
            >
                {EVENTS.map((event, i) => {
                    const isEven = i % 2 === 0;

                    return (
                        <div
                            key={event.id}
                            ref={(el) => { if (el) groupsRef.current[i] = el; }}
                            className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >

                            {/* Group Content: Central Node + Connector + Card */}


                            {/* 3. The Event Card */}
                            <div
                                className={`
                                    absolute top-1/2 -translate-y-1/2 w-[320px] md:w-[420px] 
                                    ${isEven ? "right-[20px] pr-8" : "left-[20px] pl-8"}
                                    pointer-events-auto group
                                `}
                            >
                                {/* Card Body */}
                                <div className={`
                                    relative p-6 bg-black/40 border border-white/10 
                                    backdrop-blur-md rounded-xl overflow-hidden
                                    transition-all duration-500 hover:border-purple-500/50 hover:bg-black/60
                                    group-hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]
                                `}>
                                    {/* Glass Shine Effect */}
                                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Date Header */}
                                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                                        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                                            <Calendar className="w-3 h-3" />
                                            <span>{event.date}</span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-widest text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
                                            {event.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 tracking-wide text-white group-hover:text-purple-100 transition-colors">
                                        {event.title}
                                    </h3>

                                    {/* Body Text */}
                                    <p className="text-white/60 text-xs md:text-sm font-sans leading-relaxed mb-4 line-clamp-3">
                                        {event.description}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[#71717a] text-xs font-mono">
                                            <MapPin className="w-3 h-3" />
                                            <span>{event.location}</span>
                                        </div>

                                        <div className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                            <ArrowRight className="w-4 h-4 text-purple-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Bottom cta (optional) */}
            <div className="absolute bottom-10 z-20">
                <Link href="https://linktr.ee/lnc_community" target="_blank" className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest border border-white hover:bg-black hover:text-white transition-all duration-300 rounded-full hover:scale-105">
                    View All Events
                </Link>
            </div>
        </section>
    );
}
