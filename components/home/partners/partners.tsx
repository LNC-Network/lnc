"use client";
import PartnersCarousel from "./PartnersCarousel";
import data from "./partners.json";

const Partners = () => {
  return (
    <section
      className="partners-section"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      <div className="mx-auto w-[90vw] shadow-[inset_0_5px_10px_rgba(200,200,200,0.3)] flex justify-center align-middle items-center rounded-sm">
        {/* Header */}
        <h2 className="text-xl font-bold text-white inline-block w-56">
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
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Partners;
