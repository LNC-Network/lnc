"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import { AnimatedBackground } from "./AnimatedBackground";

const partners = [
  { name: "CodeCommunity", logo: "/placeholder.svg" },
  { name: "TechTalks", logo: "/placeholder.svg" },
  { name: "DevNetwork", logo: "/placeholder.svg" },
  { name: "HackerSpace", logo: "/placeholder.svg" },
  { name: "AI Alliance", logo: "/placeholder.svg" },
  { name: "BlockChain Hub", logo: "/placeholder.svg" },
  { name: "Cloud Innovators", logo: "/placeholder.svg" },
  { name: "Data Science Club", logo: "/placeholder.svg" },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const scrollAnimation = `
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 60s linear infinite;
}
`;

const CommunityPartners = () => {
  const shuffledPartners = useMemo(() => shuffleArray(partners), []);

  return (
    <AnimatedBackground
      elementType="circle"
      color="rgba(139, 92, 246, 0.1)"
      count={50}
    >
      <style jsx global>
        {scrollAnimation}
      </style>
      <motion.div
        id="community-partners"
        className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-5xl font-bold mb-12 tracking-wider text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Community Partners
        </motion.h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll">
            {[...shuffledPartners, ...shuffledPartners].map(
              (partner, index) => (
                <motion.div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 w-48 h-48 mx-4 bg-gray-800 p-6 rounded-lg flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0"
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={100}
                    className="max-w-full h-auto filter hover:brightness-110 transition-all duration-300 relative z-10"
                  />
                </motion.div>
              )
            )}
          </div>
        </div>
        <motion.div
          className="mt-16 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-300">
            Our community partners play a crucial role in fostering innovation
            and collaboration. Together, we're building a stronger tech
            ecosystem and empowering the next generation of developers.
          </p>
        </motion.div>
      </motion.div>
    </AnimatedBackground>
  );
};

export default CommunityPartners;
