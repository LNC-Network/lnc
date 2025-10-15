"use client";
import React from "react";

const LearningPage = () => {
  const resources = [
    {
      title: "Introduction to React",
      description:
        "Learn the fundamentals of React including components, props, and state management.",
      link: "https://react.dev/learn",
    },
    {
      title: "TypeScript Documentation",
      description:
        "Official documentation for TypeScript, covering all essential concepts and features.",
      link: "https://www.typescriptlang.org/docs/",
    },
    {
      title: "Next.js Tutorial",
      description: "Comprehensive guide to building applications with Next.js framework.",
      link: "https://nextjs.org/learn",
    },
    // Add more resources as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-white h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">Learning Resources</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <LearningResource
            key={index}
            title={resource.title}
            description={resource.description}
            link={resource.link}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningPage;

interface LearningResourceProps {
  title: string;
  description: string;
  link: string;
}

const LearningResource: React.FC<LearningResourceProps> = ({ title, description, link }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2 text-black">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline"
      >
        Learn More →
      </a>
    </div>
  );
};
