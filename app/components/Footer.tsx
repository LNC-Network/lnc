"use client";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Disc,
  Hash,
  ArrowRight,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);
export default function Footer() {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from(".footer-reveal", {
        scrollTrigger: { trigger: container.current, start: "top 90%" },
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: container }
  );
  return (
    <footer
      ref={container}
      className="relative z-10 w-full bg-transparent border-t border-white/10 pt-16 pb-8 font-pixel text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          <div className="footer-reveal flex flex-col gap-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              LNC <span className="text-white/40">Community</span>
            </h2>
            <p className="max-w-md text-sm text-white/60 leading-relaxed font-mono">
              Building the future of decentralized collaboration. Join us in
              shaping the next generation of open source tools.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink
                href="https://github.com/LNC-Network"
                icon={<Github className="w-4 h-4" />}
              />
              <SocialLink
                href="https://linktr.ee/lnc_community"
                icon={<Disc className="w-4 h-4" />}
              />
              <SocialLink
                href="https://x.com/LNC_Community"
                icon={<Twitter className="w-4 h-4" />}
              />
              <SocialLink
                href="https://www.linkedin.com/company/lnc-community"
                icon={<Linkedin className="w-4 h-4" />}
              />
              <SocialLink
                href="mailto:latenightcoders@proton.me"
                icon={<Mail className="w-4 h-4" />}
              />
            </div>
          </div>
          <div className="footer-reveal w-full max-w-md lg:ml-auto bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 text-white/80">
              Stay in the loop
            </h3>
            <p className="text-[10px] text-white/50 mb-4 font-mono">
              Get updates on new projects and events.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/20"
              />
              <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-4 py-2 transition-transform hover:scale-105 active:scale-95">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="footer-reveal w-full h-px bg-white/10 mb-12" />
        <div className="footer-reveal grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <FooterColumn title="Platform">
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Projects</FooterLink>
            <FooterLink href="#">Events</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </FooterColumn>
          <FooterColumn title="Resources">
            <FooterLink href="#">Documentation</FooterLink>
            <FooterLink href="#">API Reference</FooterLink>
            <FooterLink href="#">Brand Kit</FooterLink>
            <FooterLink href="#">Partners</FooterLink>
          </FooterColumn>
          <FooterColumn title="Community">
            <FooterLink href="#">Code of Conduct</FooterLink>
            <FooterLink href="#">Contributing</FooterLink>
            <FooterLink href="#">Support</FooterLink>
            <FooterLink href="#">Sponsorship</FooterLink>
          </FooterColumn>
          <FooterColumn title="Legal">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
            <FooterLink href="#">Security</FooterLink>
          </FooterColumn>
        </div>
        <div className="footer-reveal flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase text-white/30 tracking-wider font-mono">
          <p>©2026 LNC Community. All rights reserved.</p>
          <p>Designed by LNC Dev Lead</p>
        </div>
      </div>
    </footer>
  );
}
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
        {title}
      </h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-xs font-medium text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200"
    >
      {children}
    </a>
  );
}
