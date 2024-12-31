"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

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

const sponsors = {
  diamond: [
    { name: "TechCorp", logo: "/placeholder.svg" },
    { name: "InnovateTech", logo: "/placeholder.svg" },
    { name: "FutureTech", logo: "/placeholder.svg" },
    { name: "MegaSoft", logo: "/placeholder.svg" },
  ],
  platinum: [
    { name: "FutureSoft", logo: "/placeholder.svg" },
    { name: "CodeMasters", logo: "/placeholder.svg" },
    { name: "DataPro", logo: "/placeholder.svg" },
    { name: "CloudGurus", logo: "/placeholder.svg" },
  ],
  gold: [
    { name: "DataDynamics", logo: "/placeholder.svg" },
    { name: "CloudNine", logo: "/placeholder.svg" },
    { name: "AI Solutions", logo: "/placeholder.svg" },
    { name: "Quantum Systems", logo: "/placeholder.svg" },
    { name: "TechInnovate", logo: "/placeholder.svg" },
    { name: "CyberSecure", logo: "/placeholder.svg" },
    { name: "BlockChain Co", logo: "/placeholder.svg" },
    { name: "ML Masters", logo: "/placeholder.svg" },
  ],
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SponsorSlideshow = ({ tier, sponsors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shuffledSponsors = useMemo(() => shuffleArray(sponsors), [sponsors]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % sponsors.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [sponsors.length]);

  const tierColors = {
    diamond: "from-blue-400 to-teal-300",
    platinum: "from-gray-300 to-gray-100",
  };

  return (
    <div className="relative w-full h-64 mb-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={`absolute inset-0 bg-gray-800 p-2 md:p-6 rounded-lg flex items-center justify-between overflow-hidden gap-2`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${tierColors[tier]} opacity-0.1`}
          />
          {[currentIndex, (currentIndex + 1) % sponsors.length].map((index) =>
            shuffledSponsors[index].logo &&
            shuffledSponsors[index].logo !== "/placeholder.svg" ? (
              <>
                <div className="flex flex-col gap-2 relative h-fit items-center justify-between ">
                  <Image
                    key={shuffledSponsors[index].name}
                    src={shuffledSponsors[index].logo}
                    alt={shuffledSponsors[index].name}
                    width={200}
                    height={120}
                    className=" h-full filter brightness-110 transition-all duration-300 relative z-10"
                  />
                  <div className="relative text-center font-mono">
                    {shuffledSponsors[index].name}
                  </div>
                </div>
              </>
            ) : (
              <div
                key={shuffledSponsors[index].name}
                className="h-[200px] w-[200px] text-white text-xl font-bold bg-gray-700/30 flex items-center justify-center backdrop-blur rounded z-10"
              >
                Coming Soon
              </div>
            )
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const GoldSponsors = ({ sponsors }) => {
  const shuffledSponsors = useMemo(() => shuffleArray(sponsors), [sponsors]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex animate-scroll">
        {[...shuffledSponsors, ...shuffledSponsors].map((sponsor, index) =>
          sponsor?.logo && sponsor.logo !== "/placeholder.svg" ? (
            <motion.div
              key={`${sponsor.name}-${index}`}
              className="flex-shrink-0 w-64 h-64 mx-4 bg-gray-800 p-6 rounded-lg flex items-center justify-center relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(123, 31, 162, 0.5)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-200 opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={150}
                height={150}
                className="max-w-full h-auto filter hover:brightness-110 transition-all duration-300 relative z-10"
              />
            </motion.div>
          ) : (
            <div
              key={`${sponsor.name}-${index}`}
              className="flex-shrink-0 w-64 h-64 mx-4 bg-gray-800 p-6 rounded-lg flex items-center justify-center text-white text-xl font-bold relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700 opacity-10" />
              Coming Soon
            </div>
          )
        )}
      </div>
    </div>
  );
};

const Sponsor = () => {
  return (
    <AnimatedBackground
      elementType="square"
      color="rgba(255, 255, 255, 0.1)"
      count={100}
    >
      <style jsx global>
        {scrollAnimation}
      </style>
      <motion.div
        id="sponsor"
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
          Our Sponsors
        </motion.h2>
        <div className="max-w-6xl w-full">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
              Diamond Sponsors
            </h3>
            <SponsorSlideshow tier="diamond" sponsors={sponsors.diamond} />
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
              Platinum Sponsors
            </h3>
            <SponsorSlideshow tier="platinum" sponsors={sponsors.platinum} />
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Gold Sponsors
            </h3>
            <GoldSponsors sponsors={sponsors.gold} />
          </motion.div>
        </div>
      </motion.div>
    </AnimatedBackground>
  );
};

export default Sponsor;
