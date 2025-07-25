"use client";
import { CldImage } from "next-cloudinary";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      {/* Example usage of cloudinary */}
      <CldImage
        sizes="100vw"
        aspectRatio="16:9"
        crop="fill"
        fill={true}
        alt=""
        src="2_eqmqwh"
      />
    </div>
  );
}
