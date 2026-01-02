"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { animate } from "@/lib/hero/animation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const logoWrapperRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(true);
  const idleTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const starsRef = useRef<Array<{ x: number; y: number; z: number; color: string }>>([]);
  const currentSpeedRef = useRef(2);
  
  const textRef = useRef(null);
  const maskRef = useRef<SVGSVGElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");

  const fullText = "A builders-first open community focused on shipping real projects and learning by doing. Join us in building the future, one commit at a time.";

  // Loading animation with GSAP
  useGSAP(() => {
    if (!isLoading) return;

    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false)
    });

    gsap.set(".hero-content-element", { opacity: 0, y: 30 });

    tl.to(textRef.current, {
      scale: 60,
      duration: 3,
      transformOrigin: "50% 50%",
      ease: "power3.inOut",
    })
      .to(
        maskRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            if (maskRef.current) maskRef.current.style.display = "none";
          },
        },
        "<60%"
      )
      .to(
        ".hero-content-element",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        "<70%"
      );
  }, { scope: container, dependencies: [isLoading] });

  // Typewriter effect
  useEffect(() => {
    if (!showContent) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [showContent, fullText]);

  // Logo animation
  useEffect(() => {
    if (isLoading) return;

    const canvas = logoCanvasRef.current;
    if (!canvas) return;

    let cleanup: (() => void) | undefined;
    animate(canvas)
      .then((cleanupFn) => {
        cleanup = cleanupFn;
      })
      .catch(console.error);

    return () => {
      if (cleanup) cleanup();
    };
  }, [isLoading]);

  // Starfield with optimizations
  useEffect(() => {
    if (isLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    mouseRef.current = { x: width / 2, y: height / 2 };

    const NUM_STARS = 1200;
    const TARGET_SPEED = prefersReducedMotion ? 0 : 2;
    currentSpeedRef.current = TARGET_SPEED;

    if (starsRef.current.length === 0) {
      for (let i = 0; i < NUM_STARS; i++) {
        const isPurple = i % 12 === 0;
        starsRef.current.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width,
          color: isPurple
            ? `rgba(188, 19, 254, ${Math.random() * 0.5 + 0.4})`
            : `rgba(254, 254, 254, ${Math.random() * 0.4 + 0.3})`,
        });
      }
    }

    const stars = starsRef.current;
    isActiveRef.current = !prefersReducedMotion;
    const IDLE_TIMEOUT = 2500;

    const clearIdle = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const markActive = () => {
      clearIdle();
      isActiveRef.current = true;
      idleTimerRef.current = window.setTimeout(() => {
        isActiveRef.current = false;
      }, IDLE_TIMEOUT) as unknown as number;
    };

    markActive();

    const draw = () => {
      const target = isActiveRef.current ? TARGET_SPEED : 0;
      currentSpeedRef.current += (target - currentSpeedRef.current) * 0.12;

      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const repulsionRadius = 250;
      const moving = Math.abs(currentSpeedRef.current) > 0.001;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (moving) {
          star.z -= currentSpeedRef.current;
          if (star.z <= 0) {
            star.x = Math.random() * width - width / 2;
            star.y = Math.random() * height - height / 2;
            star.z = width;
          }
        }

        const k = 128 / Math.max(star.z, 0.0001);
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (moving) {
          const dx = px - mx;
          const dy = py - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < repulsionRadius * repulsionRadius) {
            const dist = Math.sqrt(distSq);
            const angle = Math.atan2(dy, dx);
            const force = (repulsionRadius - dist) / repulsionRadius;
            const power = 4 * force;
            star.x += Math.cos(angle) * power * (star.z / 100);
            star.y += Math.sin(angle) * power * (star.z / 100);
          }
        }

        const size = (1 - star.z / width) * 1.8;

        if (px >= -10 && px <= width + 10 && py >= -10 && py <= height + 10 && size > 0) {
          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let frameId: number;
    const tick = () => {
      draw();
      frameId = requestAnimationFrame(tick);
    };
    tick();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      markActive();
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches?.[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      markActive();
    };

    const handleScroll = () => markActive();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActiveRef.current = false;
      } else {
        markActive();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const logoWrapper = logoWrapperRef.current;
    const lastLerp = { x: 0, y: 0 };

    const logoParallaxLoop = () => {
      if (logoWrapper) {
        const rect = logoWrapper.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        const nx = ((mx - cx) / rect.width) * 2;
        const ny = ((my - cy) / rect.height) * 2;

        const tx = nx * 8;
        const ty = ny * 6;

        lastLerp.x += (tx - lastLerp.x) * 0.12;
        lastLerp.y += (ty - lastLerp.y) * 0.12;

        logoWrapper.style.transform = `translate(${lastLerp.x}px, ${lastLerp.y}px)`;
      }

      rafRef.current = requestAnimationFrame(logoParallaxLoop);
    };

    if (logoWrapper) {
      rafRef.current = requestAnimationFrame(logoParallaxLoop);
    }

    setTimeout(() => setShowContent(true), 100);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoading]);

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={container}>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full block z-0" />

      {/* Loading Mask */}
      <svg
        ref={maskRef}
        className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="hero-mask">
            <rect width="100%" height="100%" fill="white" />
            <g ref={textRef}>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                className="font-bold text-[12vw] md:text-[10vw] lg:text-[8.5vw]"
              >
                LNC
              </text>
            </g>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#110023ff" mask="url(#hero-mask)" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/70 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-[1]" />

      <div className="absolute inset-0 z-10 flex items-center px-6 md:px-12 lg:px-20 pointer-events-none">
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="hero-content-element lg:col-span-7 space-y-8 text-left pointer-events-auto">
           <div className="space-y-3">
  <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tighter">
    Code by Night
  </h1>
  <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[0.95] tracking-tight">
    Innovate by Light
  </h2>
</div>


            <div className="min-h-[120px] md:min-h-[100px]">
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                {typewriterText}
                {typewriterText.length < fullText.length && (
                  <span className="inline-block w-0.5 h-6 bg-purple-400 ml-1 animate-pulse" />
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold uppercase rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-95 pointer-events-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Start Contributing
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="group relative px-10 py-5 bg-white/5 backdrop-blur-sm text-white text-lg border-2 border-white/30 font-bold uppercase rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-[1.02] active:scale-95 pointer-events-auto">
                <span className="relative flex items-center justify-center gap-2">Join Discord</span>
              </button>
            </div>
          </div>

          <div className="hero-content-element lg:col-span-5 relative flex items-center justify-center lg:justify-end h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] pointer-events-auto">
            <div
              ref={logoWrapperRef}
              className="relative w-full max-w-[460px] aspect-square transform will-change-transform"
              aria-hidden="true"
            >
              {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-pink-600/20 blur-2xl -z-10 rounded-full" /> */}

              <canvas
                ref={logoCanvasRef}
                className="w-full h-full opacity-90 rounded-full"
                style={{ maxWidth: "460px", maxHeight: "460px" }}
              />

              {/* { <div
                className="absolute inset-0 rounded-full border border-purple-500/12 pointer-events-none"
                style={{ boxShadow: "0 0 80px rgba(168,85,247,0.06)" }}
              /> } */}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce-gentle z-10">
        <span className="text-xs text-white/50 uppercase tracking-wider">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-white/60 animate-scroll-indicator" />
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -10px); }
        }
        @keyframes scroll-indicator {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;