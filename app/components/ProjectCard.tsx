"use client";

import { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  className?: string;
}

/**
 * ProjectCard
 *
 * Minimal, solid card.
 * All details are intentionally deferred to the modal.
 */
export default function ProjectCard({
  project,
  onClick,
  className = "",
}: ProjectCardProps) {
  return (
    <div
      onClick={() => onClick(project)}
      className={`
        h-65
        rounded-2xl
        bg-zinc-900
        border border-white/10
        p-6
        flex flex-col justify-between
        cursor-pointer
        transition
        hover:border-white/30
        hover:scale-[1.02]
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-xl">
          {project.icon || "📦"}
        </div>

        <div>
          <h3 className="text-lg font-black uppercase text-white tracking-wide">
            {project.name}
          </h3>
          <p className="text-xs uppercase tracking-widest text-white/40">
            {project.category || "Project"}
          </p>
        </div>
      </div>

      {/* Footer hint */}
      <span className="text-xs uppercase tracking-widest text-white/30">
        Click to view
      </span>
    </div>
  );
}
