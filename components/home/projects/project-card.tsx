import { motion, easeOut } from "framer-motion";
import { memo } from "react";

interface Project {
  title: string;
  description: string;
  githubUrl: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0.5 },
  visible: {
    opacity: 1,
    x: 0,

    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: easeOut },
  }),
};

export const ProjectCard = memo<ProjectCardProps>(({ project }) => {
  const handleClick = () => {
    window.open(project.githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="
        rounded-xl border border-[#222] 
        p-6 sm:p-8 lg:p-10 
        // w-[70vw] h-[70vmin] 
        flex flex-col justify-start text-left 
        group cursor-pointer 
        transition-all
        
        shadow-[inset_0_0_10px_rgba(255,255,255,0.40)]
        hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.50)]
      "
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,30,30,0.8) 100%)",
      }}
    >
      {/* Title */}
      <motion.div
        className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
        variants={textVariants}
        custom={0}
      >
        <motion.div
          className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-sm flex-shrink-0"
          style={{ backgroundColor: project.color }}
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
        <motion.h3
          className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold tracking-wide leading-tight truncate"
          variants={textVariants}
          custom={1}
        >
          {project.title}
        </motion.h3>
      </motion.div>

      {/* Description */}
      <div className="flex-grow flex flex-col justify-between overflow-hidden min-h-0">
        <motion.div
          className="flex-grow overflow-hidden"
          variants={textVariants}
          custom={2}
        >
          <motion.p
            className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-4 sm:line-clamp-6"
            variants={textVariants}
            custom={3}
          >
            {project.description}
          </motion.p>
        </motion.div>

        {/* GitHub Link Indicator */}
        <motion.div
          className="text-xs sm:text-sm lg:text-base text-gray-400 mt-4 sm:mt-6 flex items-center gap-2 flex-shrink-0"
          variants={textVariants}
          custom={4}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="font-medium group-hover:text-white transition-colors">
            View on GitHub
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";
