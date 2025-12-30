"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * CallToAction (CTA) / Projects Showcase Section
 *
 * A horizontal scrolling section with GSAP animations for project cards
 */
export default function CallToAction() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      className="relative z-20 py-24 px-6 md:px-12 bg-transparent font-pixel overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-12">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white mb-2">
          Project Showcase
        </h2>
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">
          Explore what we are building
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={cardsContainerRef}
        className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar"
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard project={project} onClick={setSelectedProject} key={index} />
        ))}

        {/* "View All" Card */}
        <div
          ref={(el) => {
            cardsRef.current[PROJECTS.length] = el;
          }}
          className="min-w-[85vw] md:min-w-100 snap-center h-[50vh] md:h-[60vh] flex items-center justify-center border border-white/20 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
        >
          <Link
            href="https://github.com/LNC-Network"
            target="_blank"
            className="flex flex-col items-center gap-4"
          >
            <span className="text-2xl font-black text-white uppercase group-hover:scale-110 transition-transform">
              View All
            </span>
            <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              →
            </div>
          </Link>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Add custom scrollbar hiding */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
