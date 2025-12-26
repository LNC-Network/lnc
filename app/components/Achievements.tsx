"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Globe, Zap, Gem } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
    {
        icon: <Trophy className="w-8 h-8 text-yellow-400" />,
        title: "50+ HACKATHON WINS",
        description: "Dominating the global circuit with consistent victories across major tech stacks.",
    },
    {
        icon: <Gem className="w-8 h-8 text-purple-400" />,
        title: "$200K+ PRIZE MONEY",
        description: "Capital earned from top-tier competitions and bounty programs worldwide.",
    },
    {
        icon: <Zap className="w-8 h-8 text-blue-400" />,
        title: "RAPID BUILDERS",
        description: "Shipping production-grade MVPs in 48 hours or less, repeatedly.",
    },
    {
        icon: <Globe className="w-8 h-8 text-green-400" />,
        title: "GLOBAL RECOGNITION",
        description: "Awarded by industry giants like ETHGlobal, Solana, and Y Combinator alumni.",
    },
];

export default function Achievements() {
    const container = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef(null);

    useGSAP(
        () => {
            // Header Animation
            gsap.from(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });

            // Cards Animation
            const cards = (cardsRef.current as any).children;
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 85%", // Trigger earlier
                    toggleActions: "play none none reverse",
                },
                y: 30, // Reduced distance
                opacity: 100,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)",
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
                <div ref={headerRef} className="mb-16 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide text-white leading-tight mb-6">
                        BUILT TO WIN
                    </h2>
                    <p className="text-sm md:text-base font-mono uppercase text-[#71717a] leading-relaxed max-w-2xl">
                        We don't just participate; we dominate. Our track record in the hackathon arena speaks for itself.
                    </p>
                </div>

                {/* Cards Grid */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {achievements.map((item, index) => (
                        <div
                            key={index}
                            className="group p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                {item.icon}
                            </div>

                            <div className="mb-6 p-3 bg-white/5 w-fit rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                                {item.title}
                            </h3>

                            <p className="text-sm text-[#71717a] font-mono leading-relaxed">
                                {item.description}
                            </p>

                            {/* Corner Accents */}
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
