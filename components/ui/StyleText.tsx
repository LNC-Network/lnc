import React from "react";

// Utility function to convert hex code to RGBA
const hexToRgba = (hex: string, opacity: number): string => {
  const cleanedHex = hex.replace("#", "");
  const normalizedHex =
    cleanedHex.length === 3
      ? cleanedHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanedHex;
  const r = parseInt(normalizedHex.substring(0, 2), 16);
  const g = parseInt(normalizedHex.substring(2, 4), 16);
  const b = parseInt(normalizedHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
interface StyleTextProps {
  title: string;
  description: string;
  textColor: string;
}

const StyleText: React.FC<StyleTextProps> = ({
  title,
  description,
  textColor,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      <div className="cursor-pointer hover:-translate-y-2 transition-all duration-300">
        <div
          className="text-4xl md:text-8xl uppercase font-bold"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            color: textColor,
            WebkitTextStroke: "1px",
            WebkitTextFillColor: isHovered
              ? textColor
              : hexToRgba(textColor, 0.05),
          }}
        >
          {title}
        </div>
        <div
          className="md:text-xl font-bold"
          style={{
            color: isHovered ? textColor : "transparent",
          }}
        >
          {description}
        </div>
      </div>
    </>
  );
};

export default StyleText;
