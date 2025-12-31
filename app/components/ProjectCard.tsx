"use client";

import Link from "next/link";
import { Book, Star, GitFork, Circle } from "lucide-react";
import { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Rust: "#dea584",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Java: "#b07219",
  default: "#ccc",
};

/**
 * ProjectCard
 *
 * Designed to look like a GitHub repository card
 * with the site's dark/pixel theme.
 */
export default function ProjectCard({
  project,
  className = "",
}: ProjectCardProps) {
  const langColor = LANGUAGE_COLORS[project.language || "default"] || LANGUAGE_COLORS.default;

  return (
    <Link
      href={project.link || "#"}
      target="_blank"
      className={`
        flex flex-col justify-between
        h-44 w-full
        rounded-md
        bg-[#0d1117] /* GitHub Dark Dim bg */
        border border-white/10
        p-4
        transition-all duration-200
        hover:border-white/30
        group
        ${className}
      `}
    >
      {/* Top: Icon + Name + Public Badge */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Book size={16} className="text-[#8b949e]" />
          <span
            className="text-[#58a6ff] font-semibold text-sm group-hover:underline truncate max-w-[180px]"
          >
            {project.name}
          </span>
        </div>
        <span className="text-[10px] border border-white/20 text-[#8b949e] px-2 py-0.5 rounded-full font-medium">
          Public
        </span>
      </div>

      {/* Middle: Description */}
      <div className="flex-grow mt-3">
        <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Bottom: Stats & Language */}
      <div className="flex items-center gap-4 mt-4 text-xs text-[#8b949e]">
        {project.language && (
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full border border-white/10"
              style={{ backgroundColor: langColor }}
            />
            <span>{project.language}</span>
          </div>
        )}

        {project.stars !== undefined && (
          <div className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors">
            <Star size={14} />
            <span>{project.stars.toLocaleString()}</span>
          </div>
        )}

        {project.forks !== undefined && (
          <div className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors">
            <GitFork size={14} />
            <span>{project.forks.toLocaleString()}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
