"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_TREE, NavNode } from "@/app/data/nav-tree";

gsap.registerPlugin(ScrollTrigger);

/**
 * TreeNavbar Component
 * 
 * A radial, exploring navigation system.
 * - Root node expands into children nodes arranged in a radial arc.
 * - Supports depth navigation (clicking a node opens its children).
 * - Adapts layout (radius, spread) based on screen size (Mobile/Desktop).
 */
// Helper for Curved Text
const TwistedLabel = ({ id, text, isMobile }: { id: string, text: string, isMobile: boolean }) => {
    // Dynamic Path based on size
    // Mobile (Size 60, R=30) -> Label R ~24. Path 50-24=26 to 74.
    // Desktop (Size 80, R=40) -> Label R ~34. Path 50-34=16 to 84.
    const labelR = isMobile ? 24 : 34;
    const startX = 50 - labelR;
    const endX = 50 + labelR;
    const fontSize = isMobile ? 16 : 19;

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" viewBox="0 0 100 100">
            <defs>
                <path id={id} d={`M ${startX},50 A ${labelR},${labelR} 0 0,1 ${endX},50`} />
            </defs>
            {/* Strong drop shadow for text over images */}
            <filter id="textShadow">
                <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="black" floodOpacity="0.9" />
            </filter>
            <text fill="white" fontSize={fontSize} fontWeight="bold" letterSpacing="0.05em" filter="url(#textShadow)">
                <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
                    {text}
                </textPath>
            </text>
        </svg>
    );
};

export default function TreeNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const rootBtnRef = useRef<HTMLButtonElement>(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // --- Dynamic Layout Constants ---
    const BASE_NODE_SIZE = isMobile ? 60 : 80;
    const NAV_RADIUS = isMobile ? 200 : 270;
    // Tighter padding for mobile: 10px from edge. Desktop 20px.
    const PARENT_POS = { x: isMobile ? 10 : 20, y: isMobile ? 10 : 20 };
    const NODE_RADIUS = BASE_NODE_SIZE / 2;

    // --- Logic to get current view ---

    // 1. Identify the "Active Parent" Node
    const getActiveParent = (): NavNode => {
        let node = NAV_TREE;
        for (const index of activePath) {
            if (node.children && node.children[index]) {
                node = node.children[index];
            }
        }
        return node;
    };

    const activeParent = activePath.length > 0 ? getActiveParent() : NAV_TREE;

    // 2. Identify Children to show
    const visibleChildren = isOpen ? (activeParent.children || []) : [];

    // 3. Navigation Actions
    const handleInteraction = (index: number, node: NavNode) => {
        if (node.expandable) {
            setActivePath((prev) => [...prev, index]);
        }
    };

    const handleGoUp = () => {
        if (activePath.length > 0) {
            setActivePath((prev) => prev.slice(0, -1));
        } else {
            setIsOpen(false);
        }
    };

    const toggleRoot = () => {
        if (isOpen) {
            setIsOpen(false);
            setActivePath([]);
        } else {
            setIsOpen(true);
        }
    };

    // Helper to calculate child position (Radial Fan)
    const getChildPos = (i: number, total: number) => {
        // Dynamic Spread: Tighter for few items, max 90 degrees for many.
        // Fix for "children of children too far away" (sparse lists were spreading 80deg)
        const anglePerItem = isMobile ? 25 : 20; // Slightly wider spread on mobile to avoid overlap?
        const maxSpread = isMobile ? 70 : 80;

        // Calculate total spread based on count
        // For 2 items: 20deg spread. For 5 items: 80deg spread.
        const totalSpreadDeg = Math.min((total - 1) * anglePerItem, maxSpread);

        // Convert to radians
        const totalSpread = totalSpreadDeg * (Math.PI / 180);

        // Center the fan around 45 degrees (Middle of Right-Down quadrant)
        const centerAngle = 45 * (Math.PI / 180);
        const startAngle = centerAngle - (totalSpread / 2);

        const step = total > 1 ? totalSpread / (total - 1) : 0;
        const angle = total > 1 ? startAngle + (step * i) : centerAngle;

        const r = NAV_RADIUS;

        const x = PARENT_POS.x + (r * Math.cos(angle));
        const y = PARENT_POS.y + (r * Math.sin(angle));

        return { x, y };
    };

    // --- Animation ---
    useGSAP(() => {
        if (isOpen) {
            // Animate connections
            gsap.fromTo(".nav-connection",
                { drawSVG: "0%" },
                { drawSVG: "100%", duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
            // Animate nodes
            gsap.fromTo(".nav-child-node",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)" }
            );
        }
    }, [isOpen, activePath]);

    // Scroll Rotation logic removed per user request

    // Initial Entrance Animation
    useGSAP(() => {
        gsap.to(containerRef.current, {
            opacity: 1,
            duration: 1,
            delay: 4.5,
            ease: "power2.out"
        });
    }, []);

    // --- Planet Assets ---
    const getPlanetImage = (depth: number, label: string) => {
        const l = label.toUpperCase();

        // Depth 0: Main Planets
        if (depth === 0) {
            if (l.includes("HOME")) return "/assets/planets/earth.png";
            if (l.includes("SECTIONS") || l === "LEADS") return "/assets/planets/mars.png";
            if (l.includes("COMMUNITY")) return "/assets/planets/neptune.png";
            if (l.includes("RESOURCES") || l === "DOCS") return "/assets/planets/jupiter.png";
            return "/assets/planets/neptune.png"; // Fallback
        }

        // Depth 1+: Moons
        return "/assets/planets/moon.png";
    };



    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 backdrop-blur-md"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Nav Container - Fixed Top Left (0,0) so calculations are absolute */}
            <div
                ref={containerRef}
                className="fixed top-0 left-0 z-50 pointer-events-none opacity-0 nav-enter-anim"
            // pointer-events-none to let clicks pass through gaps, enable on elements
            >
                {/* SVG Layer for Lines */}
                <svg
                    className="absolute top-0 left-0 w-[100vw] h-[100vh] overflow-visible pointer-events-none"
                    style={{ opacity: isOpen ? 1 : 0 }}
                >
                    {isOpen && visibleChildren.map((_, i) => {
                        const { x: childX, y: childY } = getChildPos(i, visibleChildren.length);
                        // Connect Centers: Parent(TL) + R -> Child(TL) + R
                        return (
                            <line
                                key={`line-${i}`}
                                x1={PARENT_POS.x + NODE_RADIUS}
                                y1={PARENT_POS.y + NODE_RADIUS}
                                x2={childX + NODE_RADIUS}
                                y2={childY + NODE_RADIUS}
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                className="nav-connection"
                            />
                        );
                    })}
                </svg>

                {/* Nodes Layer */}
                <div className="relative pointer-events-auto">

                    {/* Active Parent (Root or Current Parent) -> SUN / GRAVITY SOURCE */}
                    <button
                        ref={rootBtnRef}
                        onClick={activePath.length === 0 ? toggleRoot : handleGoUp}
                        className={`
              absolute flex items-center justify-center
              rounded-full
              z-20
              transition-all duration-300
              hover:scale-105 active:scale-95
            `}
                        style={{
                            top: PARENT_POS.y,
                            left: PARENT_POS.x,
                            width: BASE_NODE_SIZE,
                            height: BASE_NODE_SIZE
                        }}
                    >
                        {/* Sun Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/planets/sun.png"
                            alt="Sun"
                            className="absolute inset-0 w-full h-full object-cover rounded-full"
                        />
                        <TwistedLabel id="root-label" text={activePath.length > 0 ? "back" : (isOpen ? "close" : "nav")} isMobile={isMobile} />
                    </button>


                    {/* Deep Navigation Label Indicator (Optional: Tiny satellite? Orbiting text?) */}
                    {/* Simplified: Left out as requested ("Children of children..."). Main focus is hierarchy visuals. */}


                    {/* Children Nodes (Planets/Moons) */}
                    {isOpen && visibleChildren.map((node, i) => {
                        const { x: childLeft, y: childTop } = getChildPos(i, visibleChildren.length);
                        const depth = activePath.length; // 0 = Planets, 1 = Moons
                        const planetImg = getPlanetImage(depth, node.label);

                        return (
                            <div
                                key={i}
                                className="nav-child-node absolute flex flex-col items-center justify-center group cursor-pointer"
                                style={{
                                    top: childTop,
                                    left: childLeft,
                                    width: BASE_NODE_SIZE,
                                    height: BASE_NODE_SIZE
                                }}
                                onClick={() => handleInteraction(i, node)}
                            >
                                {/* External Label (Above) */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-white font-bold tracking-widest text-sm whitespace-nowrap drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] z-30 pointer-events-none">
                                    {node.label}
                                </div>
                                {/* Planet Visual */}
                                <div className={`
                                    relative w-full h-full rounded-full flex items-center justify-center
                                    transition-all duration-300
                                    group-hover:scale-110 group-hover:brightness-110
                                    shadow-lg
                                `}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={planetImg}
                                        alt={node.label}
                                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                                    />

                                    {node.goto ? (
                                        <Link href={node.goto} className="w-full h-full absolute inset-0 z-20" />
                                    ) : (
                                        <div className="z-20 w-full h-full absolute inset-0" />
                                    )}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </>
    );
}
