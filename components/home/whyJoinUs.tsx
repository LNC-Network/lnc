"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import whyJoinUs from "@/public/data/whyJoinUs.json";

function WhyJoinUs() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section: HTMLElement, index) => {
      const videoClass = ".video";
      const textClass = ".text";

      // Animate video
      gsap.fromTo(
        section.querySelector(videoClass),
        { x: index % 2 === 0 ? "100%" : "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "middle 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      // Animate text
      gsap.fromTo(
        section.querySelector(textClass),
        { opacity: 0, y: -250 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "middle 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative w-full h-full">
      <div id="why-join-us" className="flex flex-col space-y-48 md:space-y-96 ">
        {whyJoinUs.map((item, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              if (el) (sectionsRef.current as HTMLDivElement[])[index] = el;
            }}
            className="relative flex justify-between items-center w-full h-screen"
          >
            {/* Text Section */}
            <div
              className={`text z-10 md:px-20 absolute ${
                index % 2 === 0 ? "order-1 text-left left-0" : "order-2 text-right right-0"
              }`}
              // style={{ maxWidth: "50%" }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold text-gray-100 mb-4">
                {item.heading}
              </h2>
              <p className="text-xl md:text-2xl lg:text-4xl text-gray-200">
                {item.paragraph}
              </p>
            </div>

            {/* Video Section */}
            <div
              className={`video h-4/5 w-fit bg-yellow-300 absolute  ${
                index % 2 === 0 ? "order-2 right-0" : "order-1 left-0"
              }`}
            >
              <video
                src={item.video}
                autoPlay
                muted
                loop
                className="object-contain w-full h-full"
              ></video>
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
}

export default WhyJoinUs;
