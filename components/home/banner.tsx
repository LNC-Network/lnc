"use client";
import Animated from "@/components/Animation";
import Slider from "@/components/ui/slider";
import { useEffect, useState } from "react";

const Banner = () => {
  const images = ["/images/1.jpg", "/images/2.jpg"];
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const translateX = Math.min(0, -70 + scrollPos / 10);

  return (
    <Animated>
      <section className="py-16 px-6 min-h-screen flex flex-col items-center justify-center">
        <div
          className="relative border-2 border-gray-200 rounded-lg p-5 flex justify-center items-center"
          style={{
            transform: `translateX(${translateX}%)`,
          }}
        >
          <Slider images={images} />
        </div>
      </section>
    </Animated>
  );
};

export default Banner;
