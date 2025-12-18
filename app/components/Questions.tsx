"use client";

import { useRef } from "react";
import {
  Link,
  FlaskConical,
  FileText,
  CircleDollarSign,
  Calendar,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Questions() {
  const container = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Grid Animation
      const items = (gridRef.current as any).children;
      gsap.from(items, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-transparent py-24 px-6 md:px-12 w-full text-center font-pixel text-white border-t-2 border-dashed border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef}>
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 tracking-widest leading-normal">
            QUESTIONS
          </h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#d8b4fe] mb-20 max-w-2xl mx-auto">
            EVERYTHING YOU NEED TO KNOW ABOUT JOINING AND CONTRIBUTING TO LNC.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20 mb-24"
        >
          {/* Question 1 */}
          <div className="flex flex-col items-center">
            <Link className="w-10 h-10 mb-6 text-white" strokeWidth={1.5} />
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">
              HOW DO I JOIN?
            </h3>
            <p className="text-[#d8b4fe] text-xs font-mono leading-relaxed max-w-xs">
              SIGN UP ON OUR SITE AND INTRODUCE YOURSELF IN THE COMMUNITY CHAT.
            </p>
          </div>

          {/* Question 2 */}
          <div className="flex flex-col items-center">
            <FlaskConical
              className="w-10 h-10 mb-6 text-white"
              strokeWidth={1.5}
            />
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">
              DO I NEED EXPERIENCE?
            </h3>
            <p className="text-[#d8b4fe] text-xs font-mono leading-relaxed max-w-xs">
              NO. WE HAVE PROJECTS FOR EVERY SKILL LEVEL AND PEOPLE WHO WANT TO
              MENTOR.
            </p>
          </div>

          {/* Question 3 */}
          <div className="flex flex-col items-center">
            <FileText
              className="w-10 h-10 mb-6 text-white"
              strokeWidth={1.5}
            />
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">
              WHAT KIND OF PROJECTS?
            </h3>
            <p className="text-[#d8b4fe] text-xs font-mono leading-relaxed max-w-xs">
              EVERYTHING FROM TOOLS AND LIBRARIES TO DOCUMENTATION AND DESIGN
              SYSTEMS.
            </p>
          </div>

          {/* Question 4 */}
          <div className="flex flex-col items-center">
            <CircleDollarSign
              className="w-10 h-10 mb-6 text-white"
              strokeWidth={1.5}
            />
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">
              IS THERE A COST?
            </h3>
            <p className="text-[#d8b4fe] text-xs font-mono leading-relaxed max-w-xs">
              LNC IS FREE. WE'RE BUILT ON THE BELIEF THAT GOOD WORK SHOULDN'T
              HAVE A PRICE TAG.
            </p>
          </div>

          {/* Question 5 */}
          <div className="flex flex-col items-center">
            <Calendar
              className="w-10 h-10 mb-6 text-white"
              strokeWidth={1.5}
            />
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">
              HOW OFTEN DO YOU MEET?
            </h3>
            <p className="text-[#d8b4fe] text-xs font-mono leading-relaxed max-w-xs">
              WE HOST EVENTS THROUGHOUT THE YEAR. CHECK OUR CALENDAR FOR WHAT'S
              COMING NEXT.
            </p>
          </div>

          {/* Question 6 */}
          <div className="flex flex-col items-center">
            <ArrowRight
              className="w-10 h-10 mb-6 text-white"
              strokeWidth={1.5}
            />
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">
              CAN I START MY OWN PROJECT?
            </h3>
            <p className="text-[#d8b4fe] text-xs font-mono leading-relaxed max-w-xs">
              YES. WE SUPPORT MEMBERS WHO WANT TO LEAD THEIR OWN INITIATIVES
              WITHIN LNC.
            </p>
          </div>
        </div>

        {/* Footer Contact */}
        <div className="flex flex-col items-center">
          <h4 className="text-xl md:text-2xl font-bold uppercase mb-4 tracking-widest">
            WANT MORE ANSWERS?
          </h4>
          <p className="text-[#d8b4fe] text-xs md:text-sm font-bold uppercase mb-8 max-w-md">
            REACH OUT TO US DIRECTLY AND WE'LL HELP YOU FIND WHAT YOU'RE LOOKING
            FOR.
          </p>
          <button className="px-8 py-3 bg-[#e9d5ff] text-black font-bold text-xs uppercase tracking-widest border-2 border-white hover:bg-white transition shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            CONTACT
          </button>
        </div>
      </div>
    </section>
  );
}
