"use client";
import Link from "next/link";
import { motion, easeOut, easeInOut } from "framer-motion";

const members = [
  {
    name: "Deep Ghosh",
    role: "Founder - CEO",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "https://www.linkedin.com/in/deep-ghosh/",
  },
  {
    name: "Krish Gupta",
    role: "Co-Founder - CTO",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
  {
    name: "Jit Debnath",
    role: "Sales Manager",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
  {
    name: "Rohit Kumar Kundu",
    role: "UX Engineer",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
  {
    name: "Snihita Nandi",
    role: "Interaction Designer",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
  {
    name: "Mania Rahaman",
    role: "Visual Designer",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
];

// Animation variants for performance optimization
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const imageVariants = {
  rest: {
    scale: 1,
    filter: "grayscale(100%)",
    borderRadius: "0.375rem", // rounded-md
  },
  hover: {
    scale: 1.02,
    filter: "grayscale(0%)",
    borderRadius: "0.75rem", // rounded-xl
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
};

const nameVariants = {
  rest: {
    letterSpacing: "0em",
  },
  hover: {
    letterSpacing: "0.1em",
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
};

const roleVariants = {
  rest: {
    opacity: 0,
    y: 24,
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

const linkVariants = {
  rest: {
    opacity: 0,
    y: 32,
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.1,
      ease: easeOut,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: easeOut,
    },
  },
};

export default function TeamSection() {
  return (
    <section
      className="text-white py-8 px-5 md:px-16 "
      id="teams"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      <motion.span
        className="text-lg"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Team
      </motion.span>

      <div className="mx-auto">
        {/* header */}
        <motion.div
          className="mt-5 md:mt-10 space-y-6 sm:space-y-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-semibold sm:text-6xl">The Leads</h2>

          <p className="text-gray-300">
            During the working process, we perform regular fitting with the
            client because he is the only person who can feel whether a new suit
            fits or not.
          </p>
        </motion.div>
        {/* images */}
        <div className="mt-12 md:mt-20">
          <motion.div
            className="grid gap-x-6 gap-y-12 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {members.map((member, index) => (
              <motion.div
                key={index}
                className="group overflow-hidden"
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <Link href={member.link}>
                  <motion.img
                    className="h-56 sm:h-72 lg:h-96 w-full object-cover object-top cursor-pointer"
                    src={member.avatar}
                    alt={`${member.name} - ${member.role}`}
                    width="826"
                    height="1239"
                    variants={imageVariants}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </Link>

                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <motion.h3
                      className="text-white text-base font-medium"
                      variants={nameVariants}
                    >
                      {member.name}
                    </motion.h3>
                    <span className="text-xs text-gray-400">_0{index + 1}</span>
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <motion.span
                      className="text-gray-400 text-sm"
                      variants={roleVariants}
                    >
                      {member.role}
                    </motion.span>

                    <motion.div variants={linkVariants}>
                      <Link
                        href={member.link}
                        className="text-gray-400 hover:text-blue-400 text-sm tracking-wide hover:underline"
                      >
                        LinkedIn
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}