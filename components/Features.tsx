"use client";

import React from "react";
import Animated from "@/components/Animation";
import StyleText from "./ui/StyleText";

const Features = () => {
  const features = [
    {
      title: "Collaborative Coding",
      description:
        "Join forces with fellow night owls to tackle complex problems and create innovative solutions.",
      textColor: "#3b82f6",
    },
    {
      title: "24/7 Productivity",
      description:
        "Harness the power of round-the-clock development to accelerate project timelines and meet deadlines.",
      textColor: "#22c55e",
    },
    {
      title: "Cutting-edge Tech Stack",
      description:
        "Stay ahead of the curve with our carefully curated selection of modern tools and frameworks.",
      textColor: "#a855f7",
    },
    {
      title: "Global Network",
      description:
        "Connect with developers across time zones and tap into a diverse pool of expertise and perspectives.",
      textColor: "#eab308",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 px-6 flex flex-col justify-center min-h-screen"
    >
      <h2 className="text-xl font-bold text-center mb-12">
        Why Join Late Night Coders? 👩🏻‍💻
      </h2>
      <div className="flex flex-col justify-between items-center text-center md:gap-14">
        {features.map((feature, index) => (
          <Animated key={index} direction={index % 2 === 0 ? "left" : "right"}>
            <StyleText
              title={feature.title}
              description={feature.description}
              textColor={feature.textColor}
            />
          </Animated>
        ))}
      </div>
    </section>
  );
};

export default Features;
