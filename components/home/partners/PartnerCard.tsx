// components/home/partners/PartnerCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Partner } from "@/types/partners";

interface PartnerCardProps {
  partner: Partner;
  cardWidth: number;
  index: number;
  onClick: (partner: Partner) => void;
}

const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  cardWidth,
  index,
  onClick,
}) => {
  return (
    <motion.div
      className="partner-card flex-shrink-0 cursor-pointer group"
      style={{ width: `${cardWidth}px` }}
      onClick={() => onClick(partner)}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50
                    hover:bg-gray-700/50 hover:border-gray-600/60 
                    transition-all duration-300 ease-out
                    flex items-center justify-center h-20
                    group-hover:shadow-lg group-hover:shadow-blue-500/10">
        
        {partner.logo ? (
          <div className="relative w-16 h-8">
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              fill
              className="object-contain opacity-70 group-hover:opacity-100 
                       transition-opacity duration-300 filter brightness-0 invert"
              sizes={`${cardWidth}px`}
              priority={index < 6}
            />
          </div>
        ) : (
          <span className="text-gray-300 group-hover:text-white font-semibold text-lg
                         transition-colors duration-300">
            {partner.shortName}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default PartnerCard;
