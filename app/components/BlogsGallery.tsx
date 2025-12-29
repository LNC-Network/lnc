"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Grid, LayoutTemplate } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

import { BLOG_POSTS, GALLERY_IMAGES } from "@/app/data/blogs";

/**
 * BlogsGallery Component
 * 
 * A tabbed section displaying either specific blog highlights or a gallery of images.
 * Features:
 * - GSAP animations for tab switching and content reveal.
 * - Dynamic filtering between "Blogs" and "Images" views.
 * - Integrated pixel-art styling suitable for the broader theme.
 */
export default function BlogsGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<'blogs' | 'images'>('blogs');
    const [activeTab, setActiveTab] = useState(0); // For Blogs inner tabs
    const [visibleImages, setVisibleImages] = useState(6); // Pagination state

    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            tl.from(".header-reveal", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1
            });
        },
        { scope: containerRef }
    );

    // Animation when section changes
    useGSAP(() => {
        gsap.fromTo(".section-content",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    }, { scope: containerRef, dependencies: [activeSection] });

    // Animation when blog tab changes
    useGSAP(() => {
        if (activeSection === 'blogs') {
            gsap.fromTo(".active-content-anim",
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
        }
    }, { scope: containerRef, dependencies: [activeTab, activeSection] });

    const handleLoadMore = () => {
        setVisibleImages(prev => prev + 6);
    };

    return (
        <section id="community" ref={containerRef} className="relative z-10 w-full bg-transparent py-24 font-pixel text-white border-t border-white/10">
            <div className="container mx-auto px-4 md:px-12">

                {/* Header & Controls */}
                <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end">
                    <div className="header-reveal">
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-purple-400">
                            Community Hub
                        </p>
                        <h2 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
                            The <span className="text-white/50">Chronicles</span>
                        </h2>
                    </div>

                    {/* Top Level Tabs */}
                    <div className="header-reveal flex gap-0 border border-white/20 bg-black/40 rounded-full overflow-hidden p-1">
                        <button
                            onClick={() => setActiveSection('blogs')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all rounded-full",
                                activeSection === 'blogs'
                                    ? "bg-purple-500 text-white"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <LayoutTemplate className="h-4 w-4" />
                            Blogs
                        </button>
                        <button
                            onClick={() => setActiveSection('images')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all rounded-full",
                                activeSection === 'images'
                                    ? "bg-purple-500 text-white"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Grid className="h-4 w-4" />
                            Images
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[600px] section-content">

                    {/* BLOGS VIEW */}
                    {activeSection === 'blogs' && (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                            {/* Left: Blog Tabs */}
                            <div className="flex gap-4 overflow-x-auto pb-4 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
                                {BLOG_POSTS.map((post, index) => (
                                    <button
                                        key={post.id}
                                        onClick={() => setActiveTab(index)}
                                        className={cn(
                                            "group relative flex min-w-[280px] cursor-pointer items-start gap-4 border p-4 text-left transition-all lg:min-w-0 w-full hover:bg-white/5 rounded-2xl",
                                            activeTab === index
                                                ? "border-purple-500 bg-white/5"
                                                : "border-white/10 bg-black/40 hover:border-purple-500/50"
                                        )}
                                    >
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-black/50 border border-white/10 rounded-xl">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase text-white/40 font-mono">
                                                <span className={cn(activeTab === index ? "text-purple-400" : "")}>{post.tag}</span>
                                                <span>/</span>
                                                <span>{post.date}</span>
                                            </div>
                                            <h4 className={cn(
                                                "truncate text-sm font-bold transition-colors uppercase",
                                                activeTab === index ? "text-white" : "text-white/60 group-hover:text-white"
                                            )}>
                                                {post.title}
                                            </h4>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Right: Active Blog Content */}
                            <div className="relative lg:col-span-8">
                                <div className="active-content-anim group relative h-full overflow-hidden border border-white/10 bg-black/60 rounded-3xl">
                                    {/* Corner Brackets removed for rounded look */}

                                    <div className="relative aspect-video w-full overflow-hidden border-b border-white/10">
                                        <Image
                                            src={BLOG_POSTS[activeTab].image}
                                            alt={BLOG_POSTS[activeTab].title}
                                            fill
                                            className="object-cover opacity-80"
                                            priority
                                        />
                                        {/* Pixel Pattern Overlay */}
                                        <div className="absolute inset-0 bg-[url('/pixel-pattern.png')] opacity-20 pointer-events-none" />
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="mb-4 inline-flex items-center gap-2 border border-purple-500 bg-black/80 px-4 py-1 text-xs font-bold uppercase text-purple-400 rounded-full">
                                                {BLOG_POSTS[activeTab].tag}
                                            </div>
                                            <h3 className="text-2xl font-black leading-tight md:text-4xl text-white uppercase tracking-wide drop-shadow-lg">
                                                {BLOG_POSTS[activeTab].title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-10">
                                        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6 text-xs text-white/40 font-mono uppercase tracking-wider">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full border border-white/20 overflow-hidden relative">
                                                        <Image src={BLOG_POSTS[activeTab].image} alt="author" fill className="object-cover grayscale" />
                                                    </div>
                                                    <span className="text-white">{BLOG_POSTS[activeTab].author}</span>
                                                </div>
                                                <span>{'//'}</span>
                                                <span className="text-purple-400">{BLOG_POSTS[activeTab].role}</span>
                                            </div>
                                            <span>{BLOG_POSTS[activeTab].readTime}</span>
                                        </div>

                                        <p className="mb-10 text-lg font-mono leading-relaxed text-white/70">
                                            {BLOG_POSTS[activeTab].excerpt}
                                        </p>

                                        <Link
                                            href={BLOG_POSTS[activeTab].link}
                                            className="group/btn relative inline-flex items-center gap-3 border border-white bg-white px-8 py-4 text-sm font-bold uppercase text-black transition-all hover:bg-black hover:text-white hover:border-white rounded-full hover:scale-105"
                                        >
                                            Read Full Story
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* IMAGES VIEW */}
                    {activeSection === 'images' && (
                        <div className="flex flex-col items-center gap-12">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
                                {GALLERY_IMAGES.slice(0, visibleImages).map((img, i) => (
                                    <div
                                        key={i}
                                        className="group relative aspect-square overflow-hidden border border-white/10 bg-[#111] transition-all hover:border-purple-500 rounded-2xl"
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />


                                        {/* Corner Brackets on Hover */}
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
                                    className="px-8 py-3 border border-white/20 bg-transparent text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded-full"
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
