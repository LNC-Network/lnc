// components/home/partners/PartnersSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import PartnersCarousel from "./PartnersCarousel";
import { Partner } from "@/types/partners";

const Partners: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch partners data from JSON file
    const fetchPartners = async () => {
      try {
        const response = await fetch("/data/partners.json");

        if (!response.ok) {
          throw new Error("Failed to fetch partners data");
        }

        const data = await response.json();
        setPartners(data.partners);
        setError(null);
      } catch (err) {
        console.error("Error loading partners:", err);
        setError("Failed to load partners");
        setPartners([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    // Prevent initial flicker by delaying start
    if (!loading && partners.length > 0) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [loading, partners]);

  // Show loading state
  if (loading) {
    return (
      <section
        className="partners-section py-6"
        style={{ backgroundColor: "rgb(14,14,14)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-12">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              OUR PARTNERS
            </h2>
          </div>
          <div className="w-full flex justify-center">
            <div className="flex gap-5 overflow-hidden max-w-4xl">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[120px] h-20 bg-gray-800/40 rounded-xl animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section
        className="partners-section py-6"
        style={{ backgroundColor: "rgb(14,14,14)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-12">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              OUR PARTNERS
            </h2>
          </div>
          <div className="text-center text-gray-400">
            <p>Unable to load partners at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="partners-section py-6"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      <div className="max-w-7xl mx-auto px-6 ">
        <div className="flex flex-col items-center justify-center mb-10 ">
          {/* Header */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white  tracking-tight">
              OUR PARTNERS
            </h2>
          </div>

          {/* Partners Carousel - Contained Width */}
          <div className="max-w-full border border-gray-400 p-2 rounded-2xl shadow-[inset_0_3px_5px_rgba(200,200,200,0.3)]">
            {isLoaded ? (
              <PartnersCarousel
                partners={partners}
                speed={0.03}
                cardWidth={120}
                gap={20}
                autoPlay={true}
                pauseOnHover={true}
              />
            ) : (
              // Loading skeleton matching your design
              <div className="w-full flex justify-center">
                <div className="flex gap-5 overflow-hidden max-w-4xl">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[120px] h-20 bg-gray-800/40 rounded-xl animate-pulse flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Centered Button */}
        <div className="text-center">
          <button
            className="bg-transparent border border-gray-600 text-gray-300 hover:text-white 
                       hover:border-gray-500 px-8 py-3 rounded-lg font-medium
                       transition-all duration-300 hover:bg-gray-800/50"
            onClick={() => {
              console.log("Become our partner clicked");
            }}
          >
            Become our partner
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
