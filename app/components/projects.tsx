"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../data/projects";
import ProjectCard from "./ProjectCard";
export default function ProjectsShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!triggerRef.current || !containerRef.current || !cardsRef.current)
        return;
      const scrollWidth = cardsRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.set(cardsRef.current, { x: -(scrollWidth + 200) });
      tl.to(cardsRef.current, {
        x: -windowWidth * 0.2,
        duration: 1,
        ease: "power2.out",
      });
      tl.to(cardsRef.current, { x: 0, duration: 3, ease: "none" });
      tl.to(containerRef.current, {
        xPercent: 100,
        duration: 1.5,
        ease: "power2.inOut",
      });
    },
    { scope: triggerRef }
  );
  return (
    <section id="projects-section" className="font-pixel">
      <div
        ref={triggerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div ref={containerRef} className="relative h-full w-full bg-black">
          <div
            ref={headerRef}
            className="absolute top-0 right-0 z-30 px-6 md:px-12 py-20"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white">
              Project Showcase
            </h2>
            <p className="mt-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/40">
              Explore what we are building
            </p>
          </div>
          <div className="absolute inset-0 flex items-center">
            <div
              ref={cardsRef}
              className="flex gap-8 px-6 md:px-12 w-max will-change-transform"
            >
              {PROJECTS.map((project) => (
                <div key={project.id} className="w-[85vw] md:w-88 shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}
              <div className="w-[85vw] md:w-88 shrink-0 flex items-center justify-center border border-white/20 rounded-md bg-[#0d1117]">
                <Link href="/projects">
                  <span className="text-xl font-bold text-[#58a6ff]">
                    View All Projects →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
