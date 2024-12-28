import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

interface SliderProps {
  images: string[];
  interval?: number; // Interval for autoplay in milliseconds (optional)
}

const ImageSlider: React.FC<SliderProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [side, setSide] = useState<number>(0);

  // Update the `side` value based on the window width
  useEffect(() => {
    const updateSide = () => {
      const newSide =
        window.innerWidth > 768 ? window.innerWidth / 3 : window.innerWidth;
      setSide(newSide);
    };

    updateSide();

    window.addEventListener("resize", updateSide);
    return () => {
      window.removeEventListener("resize", updateSide);
    };
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Automatically transition images
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [handleNext, interval]);

  return (
    <div className="slider-container">
      {side > 0 && (
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slider-image"
          width={side}
          height={side}
        />
      )}
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`slider-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
