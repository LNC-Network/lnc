// components/home/partners/PartnersCarousel.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PartnersCarouselProps } from "@/types/partners";
import { usePartnerAnimation } from "@/hooks/usePartnerAnimation";

const PartnersCarousel: React.FC<PartnersCarouselProps> = ({
  partners,
  speed = 0.10,
  cardWidth = 120,
  gap = 20,
  autoPlay = true,
  pauseOnHover = true,
}) => {
  const {
    translateX,
    duplicatedPartners,
    handleMouseEnter,
    handleMouseLeave,
  } = usePartnerAnimation({
    partners,
    speed,
    cardWidth,
    gap,
    autoPlay,
    pauseOnHover,
  });

  const handlePartnerClick = (partner: typeof partners[0]) => {
    if (partner.website) {
      window.open(partner.website, "_blank", "noopener,noreferrer");
    }
  };

  if (!partners.length) return null;

  return (
    <div className="w-full flex justify-center">
      <div 
        className="relative overflow-hidden"
        style={{
          maxWidth: '100%',
          width: '100%',
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            gap: `${gap}px`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            perspective: '1000px',
          }}
        >
          {duplicatedPartners.map((partner, index) => {
            const setIndex = Math.floor(index / partners.length);
            const partnerIndex = index % partners.length;
            const uniqueKey = `${partner.id}-set${setIndex}-${partnerIndex}`;
            
            return (
              <div
                key={uniqueKey}
                className="partner-card flex-shrink-0 cursor-pointer group"
                style={{ 
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`,
                }}
                onClick={() => handlePartnerClick(partner)}
              >
                <motion.div 
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50
                            hover:bg-gray-700/50 hover:border-gray-600/60 
                            transition-all duration-300 ease-out
                            flex items-center justify-center h-20
                            group-hover:shadow-lg group-hover:shadow-blue-500/10"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {partner.logo ? (
                    <div className="relative w-16 h-8">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain opacity-70 group-hover:opacity-100 
                                 transition-opacity duration-300 filter brightness-0 invert"
                        sizes={`${cardWidth}px`}
                        priority={partnerIndex < partners.length && setIndex < 2}
                        loading={partnerIndex < partners.length && setIndex < 2 ? "eager" : "lazy"}
                      />
                    </div>
                  ) : (
                    <span className="text-gray-300 group-hover:text-white font-semibold text-lg
                                   transition-colors duration-300 select-none">
                      {partner.shortName}
                    </span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel;
