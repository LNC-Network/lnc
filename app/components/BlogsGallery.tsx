"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, ExternalLink, Grid, LayoutTemplate } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Blog Data
const BLOG_POSTS = [
    {
        id: 1,
        title: "The Future of Decentralized Collaboration",
        excerpt: "Exploring how DAOs and web3 protocols are reshaping how we work together. We're building systems that trust code over central authorities.",
        author: "Sarah Chen",
        role: "Lead Architect",
        date: "Dec 15, 2024",
        link: "https://medium.com/", // Placeholder
        image: "/avatar_sarah.png",
        tag: "Web3",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Designing for Trust in Zero-Trust Systems",
        excerpt: "UX patterns that build confidence without centralized authority. How to create interfaces that feel secure and transparent to the end user.",
        author: "Alex Thompson",
        role: "Product Design",
        date: "Dec 10, 2024",
        link: "https://medium.com/", // Placeholder
        image: "/avatar_alex.png", // Using avatar as blog image for this design
        tag: "Design",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "Scaling Community-First Networks",
        excerpt: "Lessons learned from growing open source ecosystems to millions of users. Community management is the new product management.",
        author: "Marcus Rodriguez",
        role: "Community Lead",
        date: "Dec 05, 2024",
        link: "https://medium.com/", // Placeholder
        image: "/avatar_marcus.png",
        tag: "Community",
        readTime: "4 min read"
    },
];

// Gallery Images
const GALLERY_IMAGES = [
    { src: "/cta_builder.png", alt: "Community Building", tag: "Events" },
    { src: "/newsletter_feature.png", alt: "Latest Updates", tag: "News" },
    { src: "/avatar_sarah.png", alt: "Team Culture", tag: "Team" },
    { src: "/avatar_marcus.png", alt: "Collaboration", tag: "Work" },
    { src: "/avatar_alex.png", alt: "Design Systems", tag: "Design" },
    { src: "/cta_builder.png", alt: "Hackathon 2024", tag: "Hackathon" }, 
];

export default function BlogsGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<'blogs' | 'images'>('blogs');
    const [activeTab, setActiveTab] = useState(0); // For Blogs inner tabs

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

    return (
        <section ref={containerRef} className="relative z-10 w-full bg-black py-24 font-pixel text-white">
            <div className="container mx-auto px-4 md:px-6">
                
                {/* Header & Controls */}
                <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end">
                    <div className="header-reveal">
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00ff94]">
                            Community Hub
                        </p>
                        <h2 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
                            The <span className="text-white/50">Chronicles</span>
                        </h2>
                    </div>

                    {/* Top Level Tabs */}
                    <div className="header-reveal flex gap-2 rounded-lg bg-[#111] p-1.5">
                        <button
                            onClick={() => setActiveSection('blogs')}
                            className={cn(
                                "flex items-center gap-2 rounded-md px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all",
                                activeSection === 'blogs' 
                                    ? "bg-[#00ff94] text-black shadow-[0_0_15px_rgba(0,255,148,0.3)]" 
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <LayoutTemplate className="h-4 w-4" />
                            Blogs
                        </button>
                        <button
                            onClick={() => setActiveSection('images')}
                            className={cn(
                                "flex items-center gap-2 rounded-md px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all",
                                activeSection === 'images' 
                                    ? "bg-[#00ff94] text-black shadow-[0_0_15px_rgba(0,255,148,0.3)]" 
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
                                            "group relative flex min-w-[280px] cursor-pointer items-center gap-4 rounded-lg border border-transparent bg-[#111] p-3 text-left transition-all hover:bg-[#1a1a1a] lg:min-w-0 w-full",
                                            activeTab === index ? "border-[#00ff94] bg-[#1a1a1a]" : "border-white/5"
                                        )}
                                    >
                                        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-black">
                                            <Image 
                                                src={post.image} 
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="mb-1 flex items-center gap-2 text-[10px] uppercase text-white/40">
                                                <span className={cn(activeTab === index ? "text-[#00ff94]" : "")}>{post.tag}</span>
                                                <span>•</span>
                                                <span>{post.date}</span>
                                            </div>
                                            <h4 className={cn(
                                                "truncate text-sm font-bold transition-colors",
                                                activeTab === index ? "text-white" : "text-white/60 group-hover:text-white"
                                            )}>
                                                {post.title}
                                            </h4>
                                        </div>
                                        {activeTab === index && (
                                            <div className="absolute -right-1 top-1/2 hidden h-8 w-1 -translate-y-1/2 rounded-l-full bg-[#00ff94] lg:block shadow-[0_0_10px_#00ff94]" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Right: Active Blog Content */}
                            <div className="relative lg:col-span-8">
                                <div className="active-content-anim relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
                                    {/* Background Blur/Glow */}
                                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00ff94]/5 blur-[100px]" />
                                    
                                    <div className="relative aspect-video w-full overflow-hidden border-b border-white/10">
                                        <Image
                                            src={BLOG_POSTS[activeTab].image}
                                            alt={BLOG_POSTS[activeTab].title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                                        
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase backdrop-blur-md">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#00ff94] animate-pulse" />
                                                {BLOG_POSTS[activeTab].tag}
                                            </div>
                                            <h3 className="text-2xl font-bold leading-tight md:text-4xl text-white shadow-black drop-shadow-lg">
                                                {BLOG_POSTS[activeTab].title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8">
                                        <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-6 text-xs text-white/40 font-mono">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-white/10 overflow-hidden relative">
                                                         <Image src={BLOG_POSTS[activeTab].image} alt="author" fill className="object-cover opacity-80" />
                                                    </div>
                                                    <span className="text-white/80">{BLOG_POSTS[activeTab].author}</span>
                                                </div>
                                                <span>/</span>
                                                <span>{BLOG_POSTS[activeTab].role}</span>
                                            </div>
                                            <span>{BLOG_POSTS[activeTab].readTime}</span>
                                        </div>

                                        <p className="mb-8 text-lg font-medium leading-relaxed text-white/70">
                                            {BLOG_POSTS[activeTab].excerpt}
                                        </p>

                                        <Link 
                                            href={BLOG_POSTS[activeTab].link}
                                            className="group inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm font-bold uppercase text-black transition-all hover:bg-[#00ff94] hover:shadow-[0_0_20px_rgba(0,255,148,0.4)]"
                                        >
                                            Read Full Story
                                            <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* IMAGES VIEW */}
                    {activeSection === 'images' && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {GALLERY_IMAGES.map((img, i) => (
                                <div
                                    key={i}
                                    className="group relative aspect-square overflow-hidden rounded-xl border-2 border-white/10 bg-[#111] transition-all hover:border-[#00ff94]/50"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <p className="font-mono text-xs font-bold uppercase text-[#00ff94] mb-1">
                                            {img.tag}
                                        </p>
                                        <p className="font-bold uppercase text-white">
                                            {img.alt}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
