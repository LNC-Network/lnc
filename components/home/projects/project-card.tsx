import { motion, easeOut } from "framer-motion";
import { memo } from "react";

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
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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

      {/* Body */}
      <div className="flex-grow flex flex-col justify-between overflow-hidden min-h-0">
        <motion.div
          className="flex-grow overflow-hidden"
          variants={textVariants}
          custom={2}
        >
          <motion.div
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 mb-3 sm:mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            &ldquo;
          </motion.div>
          <motion.blockquote
            className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 overflow-hidden"
            variants={textVariants}
            custom={3}
          >
            <div className="line-clamp-6 sm:line-clamp-8 lg:line-clamp-10">
              {project.quote}
            </div>
          </motion.blockquote>
        </motion.div>

        {/* Author */}
        <motion.div
          className="text-xs sm:text-sm lg:text-base text-gray-400 space-y-1 mt-auto flex-shrink-0"
          variants={textVariants}
          custom={4}
        >
          <motion.p
            className="font-bold text-white truncate"
            whileHover={{ color: project.color }}
            transition={{ duration: 0.2 }}
          >
            {project.author.name}
          </motion.p>
          <p className="text-gray-300 truncate">{project.author.position}</p>
          <p className="text-gray-400 truncate">{project.author.company}</p>
        </motion.div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";
