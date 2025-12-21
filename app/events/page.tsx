"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EVENTS, EventCategory } from "../data/events";
import EventCard from "../components/EventCard";
import TreeNavbar from "../components/TreeNavbar";
import Footer from "../components/Footer";
import { Search } from "lucide-react";

const CATEGORIES: ("All" | EventCategory)[] = [
    "All",
    "Hackathon",
    "Workshop",
    "Social",
    "Conference",
];

export default function EventsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<"All" | EventCategory>("All");
    const containerRef = useRef(null);
    const gridRef = useRef(null);

    const filteredEvents = EVENTS.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    useGSAP(
        () => {
            gsap.from(".fade-in", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });

            if (gridRef.current) {
                gsap.from((gridRef.current as any).children, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.3
                });
            }
        },
        { scope: containerRef, dependencies: [selectedCategory, searchTerm] } // Re-run animation on filter change
    );

    return (
        <main ref={containerRef} className="bg-black min-h-screen font-pixel selection:bg-purple-500/30">
            <TreeNavbar />

            <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="fade-in text-4xl md:text-6xl font-black uppercase tracking-wider text-white mb-6">
                        Community Events
                    </h1>
                    <p className="fade-in text-white/60 text-sm md:text-base font-mono max-w-2xl mx-auto">
                        Connect, learn, and build with fellow developers. Filter by category or search to find your next adventure.
                    </p>
                </div>

                {/* Controls */}
                <div className="fade-in flex flex-col md:flex-row gap-6 justify-between items-center mb-12 py-6 border-y border-white/10">

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-200 
                  ${selectedCategory === cat
                                        ? "bg-purple-500 border-purple-500 text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
                                        : "bg-transparent border-white/20 text-white/60 hover:border-white hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 text-white text-sm py-2 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-colors placeholder:text-white/20 font-mono"
                        />
                    </div>
                </div>

                {/* Events Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/40">
                            <p className="text-lg font-mono">No events found.</p>
                            <button onClick={() => { setSearchTerm(""); setSelectedCategory("All") }} className="mt-4 text-purple-400 hover:underline text-sm uppercase tracking-widest">Clear Filters</button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
