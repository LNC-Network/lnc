"use client";

import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-transparent text-white pt-20 pb-10 px-6 md:px-12 w-full font-pixel border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Newsletter Header - Simplified version inside footer as per design */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 border-b border-white/10 pb-16">
          <div className="max-w-md">
            <h2 className="text-xl md:text-2xl font-black uppercase mb-4 tracking-widest">
              STAY IN THE LOOP
            </h2>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#d8b4fe] mb-4">
              GET UPDATES ON NEW PROJECTS AND COMMUNITY EVENTS
            </p>
          </div>
          <form className="flex w-full md:max-w-md gap-0">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 bg-white/5 border border-white/20 p-3 text-xs font-mono placeholder:text-white/30 text-white outline-none focus:border-white/50"
            />
            <button className="px-6 py-3 bg-[#e9d5ff] text-black font-bold text-xs uppercase tracking-widest border border-white/20 hover:bg-white transition">
              SUBSCRIBE
            </button>
          </form>
          <p className="text-[8px] uppercase font-bold text-[#d8b4fe] tracking-wider md:hidden">
            WE RESPECT YOUR PRIVACY. UNSUBSCRIBE ANYTIME.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-20">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">
              COMMUNITY
            </h4>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">ABOUT US</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">GET INVOLVED</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">CODE CONDUCT</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">EVENTS</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">RESOURCES</a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">
              DEVELOPMENT
            </h4>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">DOCUMENTATION</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">API REFERENCE</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">CONTRIBUTE</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">ROADMAP</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">SUPPORT</a>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">
              CONNECT
            </h4>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">DISCORD SERVER</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">GITHUB REPOS</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">TWITTER</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">LINKEDIN</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">EMAIL US</a>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">
              LEGAL
            </h4>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">PRIVACY POLICY</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">TERMS OF SERVICE</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">COOKIE POLICY</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">ACCESSIBILITY</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">SECURITY</a>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">
              MORE
            </h4>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">BRAND GUIDELINES</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">PRESS KIT</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">SPONSORSHIP</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">PARTNERSHIPS</a>
            <a href="#" className="text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">CAREERS</a>
          </div>

          {/* Column 6 - Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-white">
              SOCIAL
            </h4>
            <a href="#" className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">
              FOLLOW ON GITHUB
            </a>
            <a href="#" className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">
              FOLLOW ON DISCORD
            </a>
            <a href="#" className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">
              FOLLOW ON TWITTER
            </a>
            <a href="#" className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">
              FOLLOW ON LINKEDIN
            </a>
            <a href="#" className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#d8b4fe] hover:text-white">
              CONTACT US
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <div className="text-2xl font-pixel italic mb-4 md:mb-0">
            Logo
          </div>
          <p className="text-[10px] font-bold uppercase text-[#d8b4fe] tracking-wider">
            © 2025 LNC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer >
  );
}
