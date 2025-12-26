/**
 * Interface for a team member (Lead).
 */
export interface TeamMember {
    name: string;
    role: string;
    quote: string;
    image: string;
}

/**
 * Leadership Team Data
 */
export const LEADS: TeamMember[] = [
    {
        name: "Sarah Chen",
        role: "Lead Architect",
        quote: "We’re not just writing code. We’re architecting open collaboration.",
        image: "/avatar_sarah.png",
    },
    {
        name: "Marcus Rodriguez",
        role: "Community Lead",
        quote: "Communities scale only when every voice matters.",
        image: "/avatar_marcus.png",
    },
    {
        name: "Alex Thompson",
        role: "Design Lead",
        quote: "Design is how it feels to build together.",
        image: "/avatar_alex.png",
    },
    {
        name: "Emily Davis",
        role: "DevOps Lead",
        quote: "Speed means nothing without stability.",
        image: "/avatar_sarah.png",
    },
    {
        name: "David Kim",
        role: "Security Lead",
        quote: "Trust is our most valuable system.",
        image: "/avatar_marcus.png",
    },
    {
        name: "Jessica Lee",
        role: "Product Lead",
        quote: "Building the right thing comes first.",
        image: "/avatar_alex.png",
    },
    {
        name: "Ryan Park",
        role: "Education Lead",
        quote: "Teaching multiplies impact.",
        image: "/avatar_sarah.png",
    },
];
