// components/home/partners/hooks/usePartnerAnimation.ts
"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useAnimationFrame } from "framer-motion";
import { Partner } from "@/types/partners";

interface UsePartnerAnimationProps {
  partners: Partner[];
  speed: number;
  cardWidth: number;
  gap: number;
  autoPlay: boolean;
  pauseOnHover: boolean;
}

export const usePartnerAnimation = ({
  partners,
  speed,
  cardWidth,
  gap,
  autoPlay,
  pauseOnHover,
}: UsePartnerAnimationProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const translateXRef = useRef(0);
  const [, forceRender] = useState(0);

  // Calculate dimensions once
  const { duplicatedPartners, singleSetWidth } = useMemo(() => {
    if (!partners.length) return { duplicatedPartners: [], singleSetWidth: 0 };

    // Use only 2 sets for smoother performance
    const duplicated = [...partners, ...partners];
    const singleWidth = partners.length * (cardWidth + gap);

    return {
      duplicatedPartners: duplicated,
      singleSetWidth: singleWidth,
    };
  }, [partners, cardWidth, gap]);

  // Smooth continuous animation without visible resets
  useAnimationFrame((_, delta) => {
    if (autoPlay && (!pauseOnHover || !isHovered) && singleSetWidth > 0) {
      // Move smoothly to the left
      translateXRef.current -= delta * speed;

      // Reset position smoothly when one set has passed
      if (Math.abs(translateXRef.current) >= singleSetWidth) {
        translateXRef.current = translateXRef.current + singleSetWidth;
      }

      // Force re-render for smooth animation
      forceRender((prev) => prev + 1);
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsHovered(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsHovered(false);
  }, [pauseOnHover]);

  return {
    translateX: translateXRef.current,
    duplicatedPartners,
    singleSetWidth,
    handleMouseEnter,
    handleMouseLeave,
  };
};
