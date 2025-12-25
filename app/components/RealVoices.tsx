"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Card } from "@/components/ui/card";

const LEADS = [
  {
    name: "Sarah Chen",
    role: "Lead Architect",
    quote: "We’re not just writing code. We’re architecting open collaboration.",
    image: "/avatar_sarah.png",
  },
  {
    name: "Marcus Rodriguez",
    role: "Community Lead",
    quote: "Communities scale only when every voice matters.",
    image: "/avatar_marcus.png",
  },
  {
    name: "Alex Thompson",
    role: "Design Lead",
    quote: "Design is how it feels to build together.",
    image: "/avatar_alex.png",
  },
  {
    name: "Emily Davis",
    role: "DevOps Lead",
    quote: "Speed means nothing without stability.",
    image: "/avatar_sarah.png",
  },
  {
    name: "David Kim",
    role: "Security Lead",
    quote: "Trust is our most valuable system.",
    image: "/avatar_marcus.png",
  },
  {
    name: "Jessica Lee",
    role: "Product Lead",
    quote: "Building the right thing comes first.",
    image: "/avatar_alex.png",
  },
  {
    name: "Ryan Park",
    role: "Education Lead",
    quote: "Teaching multiplies impact.",
    image: "/avatar_sarah.png",
  },
];

export default function RealVoices() {
  const containerRef = useRef<HTMLDivElement>(null); // The pin wrapper
  const triggerRef = useRef<HTMLDivElement>(null); // The scroll trigger
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (
      containerRef.current &&
      triggerRef.current &&
      headerRef.current &&
      cardsRef.current
    ) {
      let mm = gsap.matchMedia();

      const scrollWidth = cardsRef.current.scrollWidth;
      const windowWidth = window.innerWidth;

      // --- DESKTOP ANIMATION ( > 768px ) ---
      mm.add("(min-width: 768px)", () => {
        // Reset to Desktop Center Layout
        gsap.set(headerRef.current, { left: "50%", top: "50%", xPercent: -50, yPercent: -50, opacity: 1 });
        gsap.set(cardsRef.current, { x: windowWidth + 100, autoAlpha: 0, top: "50%", bottom: "auto", yPercent: -50 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // 1. Header moves Left
        tl.to(headerRef.current, {
          left: "4rem",
          xPercent: 0,
          duration: 1,
          ease: "power2.inOut"
        });

        // Animate Background
        tl.to(".header-bg", { opacity: 1, duration: 0.5 }, "<0.5");

        // 2. Cards enter
        tl.to(cardsRef.current, {
          x: windowWidth * 0.35,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
        }, "<0.2");

        // 3. Horizontal Scroll
        const finalX = -(scrollWidth - windowWidth + 100);
        tl.to(cardsRef.current, {
          x: finalX,
          duration: 3,
          ease: "none",
        });
      });

      // --- MOBILE ANIMATION ( < 767px ) ---
      mm.add("(max-width: 767px)", () => {
        // Initial States: Header at Top, Cards explicitly below it using Top %
        gsap.set(headerRef.current, { left: "50%", top: "15%", xPercent: -50, yPercent: 0, opacity: 1 });
        // Set cards to 55% from top to guarantee they are below the header
        gsap.set(cardsRef.current, { x: windowWidth, autoAlpha: 0, top: "55%", bottom: "auto", yPercent: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // Header BG fade in (Immediate)
        tl.to(".header-bg", { opacity: 1, duration: 0.5 });

        // Cards enter from right
        tl.to(cardsRef.current, {
          x: 0, // Center/Start
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
        }, "<");

        // Horizontal Scroll
        const finalX = -(scrollWidth - windowWidth + 40); // 40px padding
        tl.to(cardsRef.current, {
          x: finalX,
          duration: 3,
          ease: "none",
        });
      });

      return () => mm.revert();
    }
  }, { scope: triggerRef });

  return (
    <section className="font-pixel">
      {/* The Trigger / Pin Wrapper */}
      <div ref={triggerRef} className="relative h-screen w-full overflow-hidden">

        {/* Background */}
        <div ref={containerRef} className="relative h-full w-full">

          {/* Header - Z-30 to stay on top */}
          <div
            ref={headerRef}
            className="absolute z-30 flex w-full max-w-2xl flex-col justify-center px-6 py-36 text-center md:text-left"
          >
            {/* Animated Background Layer */}
            <div
              className="header-bg absolute inset-0 -z-10 bg-linear-to-r from-black/90 via-black/80 to-transparent opacity-0 backdrop-blur-sm transition-opacity"
            />

            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">
              Leadership
            </p>
            <h2 className="text-4xl font-black uppercase tracking-wide text-white md:text-6xl">
              Meet the Leads
            </h2>
            <p className="mt-4 text-sm text-white/60">
              The minds behind the machine. clear vision, execution, and
              unwavering dedication.
            </p>
          </div>

          {/* Cards Container */}
          <div
            className="absolute inset-0 z-10 pointer-events-none md:pointer-events-auto"
          >
            <div
              ref={cardsRef}
              className="absolute flex flex-row gap-6 opacity-0 pointer-events-auto pl-6 md:pl-0"
            >
              {LEADS.map((lead, i) => (
                <Card
                  key={i}
                  className="
                  relative flex h-[40vh] md:h-[50vh] w-[280px] md:w-[360px] shrink-0 flex-col
                  justify-between border border-white/10 bg-[#1f1f23]
                  p-6 md:p-8
                  transition-all duration-200
                  hover:bg-[#25252a] hover:scale-[1.02]
                  rounded-3xl
                "
                >
                  <div className="mb-4 md:mb-6 text-5xl md:text-6xl font-serif text-white/10">“</div>

                  <p className="mb-6 md:mb-8 text-xs md:text-sm font-bold uppercase leading-relaxed text-white/90">
                    {lead.quote}
                  </p>

                  <div className="flex items-center gap-4 border-t border-white/10 pt-4 md:pt-6">
                    <div className="h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border border-white/20">
                      <Image
                        src={lead.image}
                        alt={lead.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-black uppercase tracking-wider text-white">
                        {lead.name}
                      </h4>
                      <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-wider text-white/40">
                        {lead.role}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
