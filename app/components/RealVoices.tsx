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

// repeat same data
const LOOPED_LEADS = [...LEADS, ...LEADS, ...LEADS];

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
      const scrollWidth = cardsRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      // Calculate how far to scroll left. 
      // We want to scroll until the end of the cards list.
      // Initial X of cards will be around 400px (header width) + padding. 
      // Let's say it settles at 25vw or similar.
      // Simplification: We'll calculate dynamic end based on where it lands.

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000", // Longer scroll distance for the multi-stage effect
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Header starts Centered (CSS default). 
      // Animate it to the Left.
      tl.to(headerRef.current, {
        left: "4rem",
        xPercent: 0, // Reset transform centering
        top: "50%",
        yPercent: -50, // Keep vertical center
        duration: 1,
        ease: "power2.inOut"
      });

      // Animate Background In
      tl.to(".header-bg", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut"
      }, "<0.5"); // Start halfway through the move

      // 2. Cards entering from right
      tl.fromTo(
        cardsRef.current,
        {
          x: windowWidth + 100, // Starts off screen right
          autoAlpha: 0,
        },
        {
          x: windowWidth * 0.35, // Lands somewhat to the right of header
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<0.2" // Start slightly after header moves
      );

      // 3. Horizontal Scroll of cards
      // We need to move them enough so the last card is visible.
      // Current X is windowWidth * 0.35.
      // We want final X to be: windowWidth - scrollWidth - padding.
      const finalX = -(scrollWidth - windowWidth + 100);

      tl.to(cardsRef.current, {
        x: finalX,
        duration: 3, // Takes more scroll space relative to the intro
        ease: "none",
      });
    }
  }, { scope: triggerRef });

  return (
    <section className="font-pixel">
      {/* The Trigger / Pin Wrapper */}
      <div ref={triggerRef} className="relative h-screen w-full overflow-hidden">

        {/* Background (Transparent as requested, but occupies space) */}
        <div ref={containerRef} className="relative h-full w-full">

          {/* Header: Absolute Centered Initially */}
          <div
            ref={headerRef}
            className="absolute left-1/2 top-1/2 z-20 flex w-max max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col justify-center px-6 py-28 text-center md:text-left"
          >
            {/* Animated Background Layer */}
            <div
              className="header-bg absolute inset-0 -z-10 bg-linear-to-r from-black/90 via-black/80 to-transparent opacity-1 backdrop-blur-sm"
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

          {/* Cards Container: Absolute, formatted as row */}
          {/* Mask Wrapper: Static, full width/height, applies the fade effect */}
          <div
            className="absolute inset-0 z-10"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 45%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 45%, black 100%)",
            }}
          >
            <div
              ref={cardsRef}
              className="absolute top-1/2 flex -translate-y-1/2 flex-row gap-8 opacity-0"
            >
              {LEADS.map((lead, i) => (
                <Card
                  key={i}
                  className="
                  relative flex h-[50vh] w-[300px] shrink-0 flex-col
                  justify-between border-2 border-white/20 bg-[#1f1f23]
                  p-8 shadow-[4px_4px_0px_0px_rgb(255,255,255)]
                  transition-all duration-200 md:w-[360px]
                  hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                  rounded-none
                "
                >
                  <div className="mb-6 text-6xl font-serif text-white/10">“</div>

                  <p className="mb-8 text-sm font-bold uppercase leading-relaxed text-white/90 md:text-base">
                    {lead.quote}
                  </p>

                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-white/20">
                      <Image
                        src={lead.image}
                        alt={lead.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-white">
                        {lead.name}
                      </h4>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
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
