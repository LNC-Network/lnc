"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data/projects";
import ProjectCard from "./ProjectCard";

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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = cardsContainerRef.current;
    const section = sectionRef.current;
    const header = headerRef.current;

    if (!container || !section || !header) return;

    const getScrollAmount = () => {
      const cardsWidth = container.scrollWidth;
      return -(cardsWidth - window.innerWidth);
    };

    // Start with both header and cards hidden
    gsap.set([header, container], { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // Fade in header and cards together at the start
    tl.to([header, container], {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    }, 0);

    // Horizontal scroll animation for cards
    tl.to(container, {
      x: getScrollAmount,
      ease: "none",
    }, 0.3);
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      className="relative z-20 h-screen flex flex-col justify-center bg-transparent font-pixel overflow-hidden border border-white"
    >
      {/* Header */}
      <div ref={headerRef} className="px-6 md:px-12 mb-12">
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
        className="flex gap-8 px-6 md:px-12 w-max will-change-transform"
      >
        {PROJECTS.map((project) => (
          <div key={project.id} className="w-[85vw] md:w-88 shrink-0">
            <ProjectCard project={project} />
          </div>
        ))}

        {/* "View All" Card */}
        <div
          className="w-[85vw] md:w-88 shrink-0 h-44 flex items-center justify-center border border-white/20 rounded-md bg-[#0d1117] hover:bg-white/5 transition-colors group cursor-pointer"
        >
          <Link
            href="/projects"
            className="flex flex-col items-center gap-2 w-full h-full justify-center"
          >
            <span className="text-xl font-bold text-[#58a6ff] group-hover:underline">
              View All Projects
            </span>
            <span className="text-sm text-[#8b949e]">
              Explore more →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
