"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Project } from "../data/projects";

/**
 * Props for the ProjectModal component.
 */
interface ProjectModalProps {
    /** The project data to display. If null, the modal is hidden. */
    project: Project | null;
    /** Callback function to close the modal. */
    onClose: () => void;
}

/**
 * ProjectModal Component
 * 
 * A modal overlay that displays detailed information about a selected project.
 * It features a split layout with an image/banner on one side and a scrollable
 * description area on the other. Supports "Escape" key to close.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {

    // Effect: Handle "Escape" key press to close the modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Don't render anything if no project is selected
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Backdrop with blur effect */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-black border border-white/20 overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 rounded-3xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black border border-white hover:bg-white hover:text-black transition-colors rounded-full"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                {/* Left Panel: Project Image / Placeholder */}
                <div className="w-full md:w-1/3 h-48 md:h-auto relative border-b-2 md:border-b-0 md:border-r-2 border-white/20">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                            <span className="text-8xl font-black text-white/10 uppercase select-none">
                                {project.name.substring(0, 2)}
                            </span>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                        <h2 className="text-2xl font-bold text-white uppercase">
                            {project.name}
                        </h2>
                    </div>
                </div>

                {/* Right Panel: Content & Description */}
                <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto">
                    <div className="prose prose-invert max-w-none prose-sm font-sans">
                        {/* 
                           Simple Markdown Renderer 
                           Parses the readme string line-by-line to apply custom styling.
                           This is a lightweight alternative to using a full markdown library.
                        */}
                        {project.readme.split("\n").map((line, i) => {
                            if (line.startsWith("# "))
                                return (
                                    <h1 key={i} className="text-2xl font-bold mb-4 text-purple-400 uppercase font-pixel">
                                        {line.replace("# ", "")}
                                    </h1>
                                );
                            if (line.startsWith("## "))
                                return (
                                    <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-white uppercase font-pixel">
                                        {line.replace("## ", "")}
                                    </h2>
                                );
                            if (line.startsWith("### "))
                                return (
                                    <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-white font-pixel">
                                        {line.replace("### ", "")}
                                    </h3>
                                );
                            if (line.startsWith("- "))
                                return (
                                    <li key={i} className="ml-4 mb-1 text-gray-300">
                                        {line.replace("- ", "")}
                                    </li>
                                );
                            // Skip code fence markers for now
                            if (line.startsWith("```")) return null;

                            if (line.trim() === "") return <br key={i} />;

                            return (
                                <p key={i} className="mb-2 text-gray-300">
                                    {line}
                                </p>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                        <a
                            href="https://github.com/LNC-Network"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-colors"
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
