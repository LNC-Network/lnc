"use client";

import { ReactNode, useMemo } from "react";

interface AnimatedBackgroundProps {
  children: ReactNode;
  className?: string;
  elementType?: "star" | "circle" | "square" | "triangle";
  color?: string;
  count?: number;
}

const getElementPath = (type: string) => {
  switch (type) {
    case "square":
      return "M0 0h1v1H0z";
    case "triangle":
      return "M0 1L0.5 0L1 1Z";
    default: // circle
      return "M0.5 1A0.5 0.5 0 1 1 0.5 0A0.5 0.5 0 0 1 0.5 1Z";
  }
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  className = "",
  elementType = "star",
  color = "rgba(230, 230, 240, 1)",
  count = 100,
}) => {
  const elements = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 2}s`,
    }));
  }, [count]);

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        {elements.map(({ id, top, left, width, height, delay, duration }) => (
          <div
            key={id}
            className="absolute star-animation shadow-2xl shadow-white"
            style={
              {
                top,
                left,
                width,
                height,
                "--random-delay": delay,
                "--random-duration": duration,
              } as React.CSSProperties
            }
          >
            {elementType === "star" ? (
              <svg
                viewBox="0 0 24 24"
                fill={color}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0L14.91 8.09L23 9.18L17.5 15.31L18.82 23L12 19.77L5.18 23L6.5 15.31L1 9.18L9.09 8.09L12 0Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
                <path d={getElementPath(elementType)} fill={color} />
              </svg>
            )}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};
