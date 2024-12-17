"use client";
import whyJoinUs from "@/public/data/whyJoinUs.json";
import { useEffect, useState } from "react";

function ScrollVideo() {
  const [percentage, setPercentage] = useState(0);
  const [bgColor, setBgColor] = useState("bg-black");

  useEffect(() => {
    function calculateScrollPercentage() {
      const element = document.getElementById("why-join-us");
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = rect.height;
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      const visiblePercentage = Math.round(
        (visibleHeight / elementHeight) * 100
      );
      setPercentage(visiblePercentage);
    }

    window.addEventListener("scroll", calculateScrollPercentage);
    return () => {
      window.removeEventListener("scroll", calculateScrollPercentage);
    };
  }, []);

  useEffect(() => {
    // Update background color based on percentage
    if (percentage === 10) setBgColor("bg-gray-950");
    else if (percentage === 50) setBgColor("bg-gray-900");
    else if (percentage === 100) setBgColor("bg-gray-850");
    else setBgColor("bg-black");
  }, [percentage]);

  return (
    <div
      id="why-join-us"
      className={`flex flex-col space-y-96 px-10 py-96 ${bgColor}`}
    >
      {whyJoinUs.whyJoinUs.map((item, index) => (
        <div
          key={index}
          className={
            index % 2
              ? "text-left flex items-start flex-col"
              : "text-right flex items-end flex-col"
          }
        >
          <h2
            className="text-5xl font-semibold text-gray-100 mb-2"
            style={{ maxWidth: "60ch" }}
          >
            {item.heading}
          </h2>
          <p className="text-gray-200 text-2xl" style={{ maxWidth: "60ch" }}>
            {item.paragraph}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ScrollVideo;
