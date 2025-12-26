"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { NAV_TREE, NavNode } from "@/app/data/nav-tree";

// --- Kinetic Typography Component ---
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|{}[]";

/**
 * Pixel Art Icons as SVG Paths.
 * Used for the mobile view or compact dock items.
 */
const PIXEL_ICONS: Record<string, React.ReactNode> = {
    home: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M4 10v10h16V10h-2v8H6v-8H4zm8-8l8 8h-2l-6-6-6 6H4l8-8z" />
            <path d="M10 14h4v6h-4z" />
        </svg>
    ),
    sections: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M2 13h20v2H2v-2zm0-4h20v2H2V9zm0-4h20v2H2V5zm0 12h20v2H2v-2z" />
        </svg>
    ),
    resources: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M4 4h14v2H6v12h12v-8h2v10H4V4zm14 2h2v4h-2V6zM8 8h8v2H8V8zm0 4h8v2H8v-2z" />
        </svg>
    ),
    community: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M4 4h16v16H4V4zm2 2v10h12V6H6zm3 2h2v2H9V8zm6 0h2v2h-2V8zM9 12h6v2H9v-2z" />
        </svg>
    )
};

/**
 * ScrambleText Component.
 * 
 * Provides a "decoding" text effect on hover.
 */
const ScrambleText = ({ text, active }: { text: string; active: boolean }) => {
    const [display, setDisplay] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!active) {
            const t = setTimeout(() => setDisplay(text), 0);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return () => clearTimeout(t);
        }

        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplay(() =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 2; // Speed of reveal
        }, 30);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [active, text]);

    return <span>{display}</span>;
};

/**
 * Single item in the Crystal Dock.
 * Handles hover states and sub-menu rendering.
 */
const DockItem = ({
    node,
    isOpen,
    onToggle
}: {
    node: NavNode;
    isOpen: boolean;
    onToggle: () => void;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const elRef = useRef<HTMLButtonElement>(null);

    // Handle click for sub-menus
    const handleClick = (e: React.MouseEvent) => {
        if (node.expandable && node.children) {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
        }
    };

    return (
        <div
            className="relative flex flex-col items-center justify-end group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Sub-menu Stack with 'Holographic' feel */}
            {node.children && isOpen && (
                <div
                    className="absolute md:bottom-full md:mb-4 max-md:top-full max-md:mt-4 left-0 flex flex-col gap-1 p-2 bg-[#050505]/100 backdrop-blur-2xl border border-white/10 rounded-lg min-w-[160px] z-50 animate-in fade-in md:slide-in-from-bottom-2 max-md:slide-in-from-top-2 duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)] box-border overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Glossy sheen overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                    {node.children.map((child, i) => {
                        return (
                            <Link
                                key={i}
                                href={child.goto || "#"}
                                className="relative group/child flex items-center gap-3 p-2 px-3 rounded hover:bg-white/10 text-xs text-white/70 hover:text-white transition-all font-pixel tracking-wide"
                            >
                                <div className="w-1 h-1 bg-white/20 rounded-full group-hover/child:bg-cyan-400 transition-colors" />
                                <span>{child.label}</span>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Main Link/Button */}
            <button
                ref={elRef}
                onClick={handleClick}
                className={`dock-item relative z-10 flex items-center justify-center max-md:px-2 md:px-6 h-12 transition-all duration-300 cursor-pointer font-pixel text-sm tracking-wider uppercase
                    ${isOpen ? "text-black" : "text-white/80 hover:text-white"}
                `}
            >
                {/* Active Background Pill */}
                {isOpen && (
                    <div className="absolute inset-0 bg-white rounded shadow-[0_0_20px_rgba(255,255,255,0.3)] z-[-1]" />
                )}

                {/* Hover Glow Pill (only if not open) */}
                {!isOpen && (
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded transition-colors z-[-1]" />
                )}

                {/* Content */}
                <div className="relative flex items-center gap-2">
                    {/* Status Dot */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 hidden md:block ${isHovered || isOpen ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" : "bg-white/20"}`} />

                    {node.goto ? (
                        <Link href={node.goto} className="flex items-center justify-center w-full h-full">
                            {/* Desktop: Text */}
                            <span className="hidden md:block">
                                <ScrambleText text={node.label} active={isHovered} />
                            </span>
                            {/* Mobile: Icon + Label */}
                            <span className="md:hidden flex flex-col items-center gap-1 w-full max-w-[60px]">
                                {node.icon && PIXEL_ICONS[node.icon] ? PIXEL_ICONS[node.icon] : null}
                                <span className="text-[8px] uppercase tracking-wider font-pixel opacity-70 w-full text-center truncate px-0.5 block">{node.label}</span>
                            </span>
                        </Link>
                    ) : (
                        <>
                            <span className="hidden md:block">
                                <ScrambleText text={node.label} active={isHovered} />
                            </span>
                            <span className="md:hidden flex flex-col items-center gap-1">
                                {node.icon && PIXEL_ICONS[node.icon] ? PIXEL_ICONS[node.icon] : null}
                                <span className="text-[8px] uppercase tracking-wider font-pixel opacity-70">{node.label}</span>
                            </span>
                        </>
                    )}
                </div>
            </button>
        </div>
    );
};

/**
 * CrystalDock Component
 * 
 * A futuristic, responsive navigation dock.
 * - Desktop: Floats at the bottom.
 * - Mobile: Floats at the top.
 * - Features complex hover effects and sub-menus.
 */
export default function CrystalDock() {
    const dockRef = useRef<HTMLDivElement>(null);
    const [activeLabel, setActiveLabel] = useState<string | null>(null);

    const items = NAV_TREE.children || [];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
                setActiveLabel(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";

    useEffect(() => {
        // If we are NOT on the home page, show immediately
        if (pathname !== "/") {
            const t = setTimeout(() => setIsVisible(true), 0);
            return () => clearTimeout(t);
        }

        // If we ARE on the home page, wait for the event
        const handleReveal = () => {
            setIsVisible(true);
        };

        window.addEventListener("reveal-dock", handleReveal);
        return () => {
            window.removeEventListener("reveal-dock", handleReveal);
        };
    }, [pathname]);

    const handleToggle = (label: string) => {
        setActiveLabel((prev) => (prev === label ? null : label));
    };

    return (
        <div className="fixed z-50 md:bottom-10 md:left-1/2 md:-translate-x-1/2 md:max-w-fit md:px-4 max-md:top-6 max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-auto max-md:max-w-[95vw]">
            {/* 
              Responsive Container:
              - Mobile: Floating Top Dock (rounded, centered)
              - Desktop: Floating Bottom Dock (rounded, centered)
            */}
            <div
                ref={dockRef}
                className={`
                    relative flex items-center justify-center gap-2 
                    bg-[#050505]/80 backdrop-blur-2xl
                    transition-all duration-1000 ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}

                    /* Mobile Styles (Floating) */
                    max-md:p-3 max-md:px-5 max-md:border max-md:border-white/10 max-md:rounded-2xl max-md:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)]
                    
                    /* Desktop Styles */
                    md:p-2 md:px-3 md:border md:border-white/5 md:rounded-2xl 
                    md:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_-1px_0_rgba(255,255,255,0.1)]
                    md:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),inset_0_-1px_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.05)]
                    md:hover:scale-[1.01]
                `}
            >
                {/* Decorative top sheen (Desktop only) */}
                <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block" />

                {items.map((node, i) => (
                    <DockItem
                        key={i}
                        node={node}
                        isOpen={activeLabel === node.label}
                        onToggle={() => handleToggle(node.label)}
                    />
                ))}
            </div>
        </div >
    );
}
