"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PROJECTS, Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

/**
 * CallToAction (CTA) / Projects Showcase Section
 * 
 * A horizontal scrolling section that showcases projects in a timeline-like fashion.
 * It uses GSAP ScrollTrigger to pin the section while scrolling horizontally through the content.
 */
export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      const scrollContainer = sectionRef.current;
      if (!scrollContainer) return;

      // Create a horizontal scroll animation linked to vertical scroll
      gsap.to(scrollContainer, {
        x: () => -(scrollContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + scrollContainer.scrollWidth, // Scroll distance = width of content
          invalidateOnRefresh: true, // Recalculate on window resize
        },
      });
    },
    { scope: triggerRef }
  );

  return (
    <section ref={triggerRef} className="overflow-hidden bg-transparent font-pixel relative">
      {/* Sticky Header: Remains visible while the user scrolls through the projects */}
      <div className="absolute top-10 left-6 md:left-12 z-20 pointer-events-none mix-blend-difference">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white mb-2">
          Project Showcase
        </h2>
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">
          Explore what we are building
        </p>
      </div>

      {/* 
        Horizontal Scroll Container 
        Moves left as the user scrolls down.
      */}
      <div
        ref={sectionRef}
        className="flex gap-8 items-center h-screen px-6 md:px-12 w-fit pt-20"
      >
        {/* Intro Spacer to offset the first item */}
        <div className="w-[10vw] md:w-[20vw] shrink-0" />

        {PROJECTS.map((project) => (
          <div key={project.id} className="w-[85vw] md:w-[600px] shrink-0">
            <ProjectCard
              project={project}
              onClick={setSelectedProject}
              className="h-[60vh] md:h-[70vh]"
            />
          </div>
        ))}

        {/* "View All" Card at the end of the list */}
        <div className="w-[85vw] md:w-[400px] shrink-0 h-[60vh] md:h-[70vh] flex items-center justify-center border border-white/20 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
          <Link
            href="https://github.com/LNC-Network"
            target="_blank"
            className="flex flex-col items-center gap-4"
          >
            <span className="text-2xl font-black text-white uppercase group-hover:scale-110 transition-transform">View All</span>
            <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              →
            </div>
          </Link>
        </div>

        {/* Outro Spacer to allow scrolling past the last item */}
        <div className="w-[10vw] md:w-[10vw] shrink-0" />
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
