"use client";
import whyJoinUs from "@/public/data/whyJoinUs.json";

function WhyJoinUs() {
  return (
    <div className="relative w-full h-full">
      <div className="z-10 -top-20">
        <div id="why-join-us" className="flex flex-col space-y-96 px-10 py-96">
          {whyJoinUs.whyJoinUs?.map((item, index) => (
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
              <p
                className="text-gray-200 text-2xl"
                style={{ maxWidth: "60ch" }}
              >
                {item.paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyJoinUs;
