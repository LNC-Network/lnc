"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Grid, LayoutTemplate } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { cn } from "@/lib/utils";
import { BLOG_POSTS, GALLERY_IMAGES } from "@/app/data/blogs";
export default function BlogsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<"blogs" | "images">(
    "blogs"
  );
  const [activeTab, setActiveTab] = useState(0);
  const [visibleImages, setVisibleImages] = useState(6);

  // We keep a reference to the timeline/scrollTrigger to control it manually if needed
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });
      tl.from(".header-reveal", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (activeSection !== "blogs") return;
      const totalPosts = BLOG_POSTS.length;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalPosts * 50}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Calculate the exact index based on progress
          const index = Math.min(
            Math.floor(self.progress * totalPosts),
            totalPosts - 1
          );
          if (index !== activeTab) {
            setActiveTab(index);
          }
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
      };
    },
    { scope: containerRef, dependencies: [activeSection] } // Removed activeTab dependency to prevent re-creation
  );

  // Handle manual tab click - Syncs scroll position
  const handleTabClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (st && activeSection === "blogs") {
      const totalPosts = BLOG_POSTS.length;
      // Calculate the target progress for the start of this slide's segment
      // Adding a small buffer (0.5 / totalPosts) centers it nicely in the segment
      const progress = (index + 0.1) / totalPosts;
      const scrollPos = st.start + (st.end - st.start) * progress;

      gsap.to(window, {
        scrollTo: scrollPos,
        duration: 0.8,
        ease: "power2.out",
      });
    } else {
      setActiveTab(index);
    }
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".section-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    },
    { scope: containerRef, dependencies: [activeSection] }
  );

  const handleLoadMore = () => {
    setVisibleImages((prev) => prev + 6);
  };

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative z-10 w-full h-screen bg-transparent font-pixel text-white border-t border-white/10 flex flex-col overflow-hidden"
    >
      <div
        ref={containerRef}
        className="container mx-auto px-4 md:px-12 py-12 flex-1 flex flex-col"
      >
        <div className="mb-10 flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end shrink-0">
          <div className="header-reveal">
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
              The <span className="text-white/50">Chronicles</span>
            </h2>
          </div>
          <div className="header-reveal flex gap-0 border border-white/20 bg-black/40 rounded-full overflow-hidden p-1">
            <button
              onClick={() => setActiveSection("blogs")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all rounded-full",
                activeSection === "blogs"
                  ? "bg-purple-500 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <LayoutTemplate className="h-4 w-4" />
              Blogs
            </button>
            <button
              onClick={() => setActiveSection("images")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all rounded-full",
                activeSection === "images"
                  ? "bg-purple-500 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Grid className="h-4 w-4" />
              Images
            </button>
          </div>
        </div>
        <div className="flex-1 section-content overflow-hidden relative">
          {activeSection === "blogs" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-2">
              <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                {BLOG_POSTS.map((post, index) => (
                  <button
                    key={post.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex w-full cursor-pointer items-center gap-4 border p-4 text-left transition-all rounded-2xl",
                      activeTab === index
                        ? "border-purple-500 bg-white/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                        : "border-white/10 bg-black/40 hover:bg-white/5 hover:border-purple-500/50"
                    )}
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-black/50 border border-white/10 rounded-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center gap-2 text-[10px] uppercase text-white/40 font-mono">
                        <span
                          className={cn(
                            activeTab === index ? "text-purple-400" : ""
                          )}
                        >
                          {post.tag}
                        </span>
                      </div>
                      <h4
                        className={cn(
                          "truncate text-sm font-bold transition-colors uppercase",
                          activeTab === index
                            ? "text-white"
                            : "text-white/60 group-hover:text-white"
                        )}
                      >
                        {post.title}
                      </h4>
                    </div>
                    {activeTab === index && (
                      <div className="absolute right-4 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
              <div className="col-span-1 lg:col-span-8 relative h-full">
                {BLOG_POSTS.map((post, index) => (
                  <div
                    key={post.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-300 ease-out flex flex-col",
                      activeTab === index
                        ? "opacity-100 pointer-events-auto z-10"
                        : "opacity-0 pointer-events-none z-0 delay-0"
                    )}
                  >
                    <div className="flex-1 w-full group relative overflow-hidden border border-white/10 bg-black/60 backdrop-blur-sm rounded-3xl shadow-2xl shadow-purple-500/10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                        <div className="relative h-1/2 lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-black/80 via-black/20 to-transparent" />
                          <div className="absolute top-4 left-4 inline-flex items-center gap-2 border border-purple-500/50 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase text-purple-400 rounded-full">
                            {post.tag}
                          </div>
                        </div>
                        <div className="relative h-1/2 lg:h-full p-6 lg:p-10 flex flex-col justify-center">
                          <div className="absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 border-white/20" />
                          <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-white/20" />
                          <div className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-white/20" />
                          <div className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-white/20" />
                          <h3 className="text-2xl lg:text-4xl font-black leading-tight text-white uppercase tracking-wide mb-6 drop-shadow-lg">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-3 mb-6 text-xs text-white/50 font-mono uppercase">
                            <div className="relative h-8 w-8 rounded-full border border-white/20 overflow-hidden">
                              <Image
                                src={post.image}
                                alt="author"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white font-medium">
                                {post.author}
                              </span>
                              <span className="text-purple-400">
                                {post.role}
                              </span>
                            </div>
                            <span className="ml-auto text-white/40">
                              {post.date}
                            </span>
                          </div>
                          <p className="text-sm lg:text-lg font-mono leading-relaxed text-white/70 mb-8 line-clamp-4 lg:line-clamp-none">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 mt-auto">
                            <Link
                              href={post.link}
                              className="flex-1 group/btn inline-flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 px-6 py-4 text-sm font-bold uppercase text-white transition-all rounded-xl hover:scale-105 shadow-lg shadow-purple-500/20"
                            >
                              Read Story
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                            <span className="px-4 text-xs text-white/40 font-mono uppercase">
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="lg:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                  {BLOG_POSTS.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        activeTab === i
                          ? "w-6 bg-purple-500"
                          : "w-1.5 bg-white/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeSection === "images" && (
            <div className="flex flex-col items-center gap-12 h-full overflow-y-auto pb-20 custom-scrollbar">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
                {GALLERY_IMAGES.slice(0, visibleImages).map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square overflow-hidden border border-white/10 bg-[#111] transition-all hover:border-purple-500 rounded-2xl cursor-pointer"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="font-mono text-xs font-bold uppercase text-purple-400 mb-1">
                        {img.tag}
                      </p>
                      <p className="font-bold uppercase text-white text-xl">
                        {img.alt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {visibleImages < GALLERY_IMAGES.length && (
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 border border-white/20 bg-transparent text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded-full mb-12"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
