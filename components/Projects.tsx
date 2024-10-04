"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoonIcon, CodeIcon, SunIcon } from "lucide-react";
import Animated from "@/components/Animation";

const projects = [
  {
    title: "Moonlit Debugging",
    link: "/project1",
    icon: <MoonIcon className="w-6 h-6" />,
  },
  {
    title: "Nocturnal Code Sprints",
    link: "/project2",
    icon: <CodeIcon className="w-6 h-6" />,
  },
  {
    title: "Starlight Solutions",
    link: "/project3",
    icon: <SunIcon className="w-6 h-6" />,
  },
  {
    title: "Midnight Innovations",
    link: "/project4",
    icon: <MoonIcon className="w-6 h-6" />,
  },
  {
    title: "Dawn of Development",
    link: "/project5",
    icon: <SunIcon className="w-6 h-6" />,
  },
];

const Projects: React.FC = () => {
  return (
    <Animated>
      <section className="py-16 px-6 bg-muted">
        <h2 className="text-3xl font-bold text-center mb-12">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Animated key={index}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex flex-col items-center p-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {project.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {project.title}
                  </h3>
                  <Button variant="outline" asChild>
                    <Link href={project.link}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </Animated>
          ))}
        </div>
      </section>
    </Animated>
  );
};

export default Projects;
