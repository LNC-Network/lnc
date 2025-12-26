import { Trophy, Globe, Zap, Gem } from "lucide-react";
import React from "react";

/**
 * Data model for an achievement item.
 */
export interface Achievement {
    icon: React.ReactNode;
    title: string;
    description: string;
}

/**
 * List of key achievements to display.
 * Note: uses React components for icons.
 */
export const ACHIEVEMENTS: Achievement[] = [
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
