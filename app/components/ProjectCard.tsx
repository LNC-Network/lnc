"use client";

import Image from "next/image";
import { Project } from "../data/projects";

/**
 * Props for the ProjectCard component.
 */
interface ProjectCardProps {
    /** The project data to display. */
    project: Project;
    /** Callback when card is clicked. */
    onClick: (project: Project) => void;
    /** Optional custom classes. */
    className?: string;
}

/**
 * ProjectCard Component
 * 
 * Displays a single project with a hover effect that reveals details.
 * Used in the CallToAction horizontal scroll list.
 */
export default function ProjectCard({ project, onClick, className = "" }: ProjectCardProps) {
    return (
        <div
            onClick={() => onClick(project)}
            className={`project-card group relative h-[300px] border border-white/20 hover:border-purple-500 bg-black/40 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 overflow-hidden rounded-3xl ${className}`}
        >
            {/* Image or Fallback */}
            <div className="absolute inset-0 z-0">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                    />
                ) : (
                    <div className={`w-full h-full opacity-80 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center`}>
                        <span className="text-6xl font-black text-white/20 uppercase select-none">
                            {project.name.substring(0, 2)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                <div className="flex gap-2 mb-3 flex-wrap">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] uppercase bg-white/10 px-2 py-1 border border-white/20 text-white/90"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase mb-2 group-hover:text-purple-400 transition-colors shadow-black drop-shadow-md">
                    {project.name}
                </h3>
                <p className="text-xs text-gray-200 line-clamp-2 mb-4 drop-shadow-sm">
                    {project.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest opacity-100 transform translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                    <span>View Details</span>
                    <span>→</span>
                </div>
            </div>
        </div>
    );
}
