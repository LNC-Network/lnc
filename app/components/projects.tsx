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
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!triggerRef.current || !cardsRef.current || !headerRef.current)
        return;
      const scrollWidth = cardsRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const amountToScroll = scrollWidth - windowWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${amountToScroll + window.innerHeight * 3 + 2000}`, // Adjust total scroll length
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Initial States
      gsap.set(headerRef.current, {
        top: "50%",
        right: "50%",
        xPercent: 50,
        yPercent: -50,
      });

      gsap.set(cardsRef.current, {
        autoAlpha: 0,
        y: 100,
        x: 0,
      });

      // Animation Sequence
      tl.to(headerRef.current, {
        top: 0,
        right: 0,
        xPercent: 0,
        yPercent: 0,
        duration: 2,
        ease: "power2.inOut",
      })
        .to(
          cardsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "+=0.2"
        )
        .to(cardsRef.current, {
          x: -amountToScroll,
          duration: 6,
          ease: "none",
        });
    },
    { scope: triggerRef }
  );
  return (
    <section id="projects-section">
      <div
        ref={triggerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div className="relative h-full w-full bg-transparent">
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
