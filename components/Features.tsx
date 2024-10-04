"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CodeIcon, MoonIcon, GlobeIcon } from "lucide-react";
import Animated from "@/components/Animation";

const Features = () => {
  const features = [
    {
      title: "Collaborative Coding",
      description:
        "Join forces with fellow night owls to tackle complex problems and create innovative solutions.",
      icon: <CodeIcon className="w-6 h-6" />,
    },
    {
      title: "24/7 Productivity",
      description:
        "Harness the power of round-the-clock development to accelerate project timelines and meet deadlines.",
      icon: <MoonIcon className="w-6 h-6" />,
    },
    {
      title: "Cutting-edge Tech Stack",
      description:
        "Stay ahead of the curve with our carefully curated selection of modern tools and frameworks.",
      icon: <CodeIcon className="w-6 h-6" />,
    },
    {
      title: "Global Network",
      description:
        "Connect with developers across time zones and tap into a diverse pool of expertise and perspectives.",
      icon: <GlobeIcon className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose Late Night Coders?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Animated key={index} direction={index % 2 === 0 ? "left" : "right"}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="flex items-start p-6">
                <div className="mr-4">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          </Animated>
        ))}
      </div>
    </section>
  );
};

export default Features;
