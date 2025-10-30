"use client";
import PartnersCarousel from "./PartnersCarousel";
import data from "./partners.json";

const Partners = () => {
  return (
    <section
      className="partners-section py-8 sm:py-12"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      {/* Mobile View - 2 Carousels */}
      <div className="sm:hidden mx-auto w-[95vw] flex flex-col gap-6">
        {/* Header */}
        <h2 className="text-lg font-bold text-white text-center">
          Our Partners
        </h2>

        {/* First Carousel - Left to Right */}
        <div className="w-full">
          <PartnersCarousel
            partners={data.PT}
            speed={0.03}
            cardWidth={100}
            gap={20}
            autoPlay={true}
            pauseOnHover={false}
          />
        </div>

        {/* Second Carousel - Right to Left */}
        <div className="w-full">
          <PartnersCarousel
            partners={data.PT}
            speed={-0.03}
            cardWidth={100}
            gap={20}
            autoPlay={true}
            pauseOnHover={false}
          />
        </div>
      </div>

      {/* Desktop View - Original Single Carousel */}
      <div className="hidden sm:flex mx-auto w-[90vw] shadow-[inset_0_5px_10px_rgba(200,200,200,0.3)] justify-center align-middle items-center rounded-sm p-2">
        {/* Header */}
        <h2 className="text-xl lg:text-2xl font-bold text-white inline-block w-40 lg:w-56">
          Our Partners
        </h2>

        {/* Partners Carousel - Contained Width */}
        <div className="w-[70vw] p-2">
          <PartnersCarousel
            partners={data.PT}
            speed={0.03}
            cardWidth={100}
            gap={20}
            autoPlay={true}
            pauseOnHover={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Partners;
