"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { PROJECTS } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

/**
 * Projects Page
 * 
 * A catalog of all community projects.
 * Features:
 * - Search and Sort functionality.
 * - Grid layout with responsive cards.
 * - Direct links to GitHub repositories (via ProjectCard).
 */
export default function ProjectsPage() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "newest">("newest"); // Pseudo-sort since we don't have dates

    // Filter and Sort Logic
    const filteredProjects = useMemo(() => {
        let result = [...PROJECTS];

        // Search
        if (search.trim()) {
            const query = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        // Sort
        if (sortBy === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }
        // "newest" is just default order aka "featured" for this mock data

        return result;
    }, [search, sortBy]);

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 font-pixel relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-widest text-white drop-shadow-lg">
                        All Projects
                    </h1>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">
                        Search and explore our decentralized ecosystem
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center bg-white/5 p-6 border border-white/10 rounded-sm backdrop-blur-sm">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 text-white pl-10 pr-4 py-2 hover:border-purple-500 focus:border-purple-500 transition-colors outline-none text-sm font-sans"
                        />
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs uppercase text-gray-400 font-bold">Sort By:</span>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as "name" | "newest")}
                                className="appearance-none bg-black/50 border border-white/20 text-white pl-4 pr-10 py-2 hover:border-purple-500 focus:border-purple-500 transition-colors outline-none text-sm font-sans uppercase cursor-pointer"
                            >
                                <option value="newest">Featured</option>
                                <option value="name">Name (A-Z)</option>
                            </select>
                            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                className="w-full"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl uppercase">No projects found.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
