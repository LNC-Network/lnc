"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PROJECTS, Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Animation for the entry
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom", // Trigger as soon as section enters viewport
        },
      });

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".project-card",
        {
          y: 50,
          // Removed opacity: 0 to ensure visibility if animation stalls.
          // The cards will just slide up.
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.4"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-transparent py-20 px-6 md:px-12 w-full font-pixel relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-widest text-white">
            Project Showcase
          </h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">
            Explore what we are building
          </p>
        </div>

        {/* Project Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-20">
          <Link
            href="/projects"
            className="px-8 py-4 bg-purple-500 text-white font-bold uppercase tracking-widest hover:bg-purple-400 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            View All Projects
          </Link>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
