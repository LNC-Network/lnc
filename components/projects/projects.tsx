"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Project {
  title: string;
  quote: string;
  author: {
    name: string;
    position: string;
    company: string;
  };
  color: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Memoized ProjectCard component to prevent unnecessary re-renders
const ProjectCard = React.memo<ProjectCardProps>(({ project, index }) => {
  return (
    <div
      key={index}
      className="bg-[#111] rounded-2xl border-2 border-[#7E27C2] p-6 sm:p-8 lg:p-10 w-[70vmin] h-[70vmin] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[#7E27C2] flex flex-col justify-start text-left group"
      style={
        {
          boxShadow:
            "inset 0 0 5px rgba(255, 255, 255, 0.30), inset 0 0 10px rgba(255, 255, 255, 0.30), inset 0 0 15px rgba(255, 255, 255, 0.30)",
          "--project-color": project.color,
        } as React.CSSProperties & { "--project-color": string }
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "inset 0 0 1px rgba(126, 39, 194, 0.75), inset 0 0 10px rgba(126, 39, 194, 0.75), inset 0 0 15px rgba(126, 39, 194, 0.75), inset 0 0 30px rgba(126, 39, 194, 0.75)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "inset 0 0 1px rgba(255, 255, 255, 0.25), inset 0 0 5px rgba(255, 255, 255, 0.25), inset 0 0 10px rgba(255, 255, 255, 0.25)";
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div
          className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-sm flex-shrink-0"
          style={{ backgroundColor: project.color }}
        />
        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold tracking-wide leading-tight truncate">
          {project.title}
        </h3>
      </div>

      <div className="flex-grow flex flex-col justify-between overflow-hidden min-h-0">
        <div className="flex-grow overflow-hidden">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 mb-3 sm:mb-4">
            &ldquo;
          </div>
          <blockquote className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 overflow-hidden">
            <div className="line-clamp-6 sm:line-clamp-8 lg:line-clamp-10">
              {project.quote}
            </div>
          </blockquote>
        </div>

        <div className="text-xs sm:text-sm lg:text-base text-gray-400 space-y-1 mt-auto flex-shrink-0">
          <p className="font-bold text-white truncate">{project.author.name}</p>
          <p className="text-gray-300 truncate">{project.author.position}</p>
          <p className="text-gray-400 truncate">{project.author.company}</p>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

const Projects: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/Data/projects.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev === 0 ? projectData.length - 1 : prev - 1));
  }, [projectData.length]);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % projectData.length);
  }, [projectData.length]);

  const currentProjects = useMemo(() => {
    if (projectData.length === 0) return [];
    return [index, (index + 1) % projectData.length];
  }, [index, projectData.length]);

  if (loading) {
    return (
      <section className="bg-black text-white px-6 py-12 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
          <div className="text-2xl">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-black text-white px-6 py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-red-400 mb-4">
            Error loading projects
          </div>
          <div className="text-gray-400">{error}</div>
        </div>
      </section>
    );
  }

  if (projectData.length === 0) {
    return (
      <section className="bg-black text-white px-6 py-12 min-h-screen flex items-center justify-center">
        <div className="text-2xl">No projects found.</div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="bg-black text-white px-4 sm:px-6 lg:px-12 py-8 sm:py-12 min-h-screen"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 sm:mb-16 gap-4">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold">Projects</h2>

        {/* Navigation buttons */}
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            disabled={projectData.length <= 1}
            className="p-2 sm:p-3 rounded-full bg-black border-2 border-[#7E27C2] hover:bg-[#7E27C2] cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: "0 0 5px #7E27C2, 0 0 15px #7E27C2, 0 0 60px #7E27C2",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.boxShadow =
                  "0 0 20px #7E27C2, 0 0 40px #7E27C2, 0 0 60px #7E27C2, 0 0 80px #7E27C2";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 5px #7E27C2, 0 0 15px #7E27C2, 0 0 60px #7E27C2";
            }}
          >
            <ArrowLeft className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next project"
            disabled={projectData.length <= 1}
            // className="p-2 sm:p-3 rounded-full bg-[#7E27C2] border-2 border-[#7E27C2] hover:bg-[#9333ea] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            className="p-2 sm:p-3 rounded-full bg-black border-2 border-[#7E27C2] hover:bg-[#7E27C2] cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: "0 0 5px #7E27C2, 0 0 15px #7E27C2, 0 0 60px #7E27C2",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.boxShadow =
                  "0 0 20px #7E27C2, 0 0 40px #7E27C2, 0 0 60px #7E27C2, 0 0 80px #7E27C2";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 5px #7E27C2, 0 0 15px #7E27C2, 0 0 60px #7E27C2";
            }}
          >
            <ArrowRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
        {currentProjects.map((i) => {
          const project = projectData[i];
          return (
            <ProjectCard
              key={`${i}-${project.title}`}
              project={project}
              index={i}
            />
          );
        })}
      </div>

      {/* Project indicators */}
      {projectData.length > 1 && (
        <div className="flex justify-center mt-6 sm:mt-8 gap-2">
          {projectData.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                i === index
                  ? "bg-violet-500 scale-125"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
