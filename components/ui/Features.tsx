"use client";
import React from "react";
import { motion } from "framer-motion";

interface obj {
  className: string;
}

const Features: React.FC<obj> = ({ className }) => {
  const items = [
    {
      title: "Collaborative Coding",
      text: "Join forces with fellow night owls to tackle complex problems and create innovative solutions.",
      alignment: "align-start",
    },
    {
      title: "24/7 Productivity",
      text: "Harness the power of round-the-clock development to accelerate project timelines and meet deadlines.",
      alignment: "items-end text-end",
    },
    {
      title: "Cutting-edge Tech Stack",
      text: "Stay ahead of the curve with our carefully curated selection of modern tools and frameworks.",
      alignment: "items-start",
    },
    {
      title: "Global Network",
      text: "Connect with developers across time zones and tap into a diverse pool of expertise and perspectives.",
      alignment: "items-end text-end",
    },
  ];

  const wordVariant = {
    hidden: { opacity: 0, rotate: -45 },
    visible: (i: number) => ({
      opacity: 1,
      rotate: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
    hover: { rotate: 0, transition: { duration: 0.3 } },
  };

  return (
    <div id="about" className={`${className}`}>
      {items.map((section, index) => (
        <motion.div
          key={index}
          className={`w-full h-screen p-10 flex flex-col justify-center  ${section.alignment}`}
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.h1 className="text-5xl font-bold mb-4">
            {section.title}
          </motion.h1>
          <div className="text-3xl space-y-2 mt-2 flex flex-col items-start w-3/5 lg:w-2/5">
            {section.text.split(". ").map((line, i) => (
              <motion.p
                key={i}
                className={`leading-relaxed flex ${section.alignment}`}
                variants={wordVariant}
                custom={i}
                whileHover="hover"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Features;
