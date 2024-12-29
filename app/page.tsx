"use client"

import Home from "@/components/home/Home";
import WhyJoinUs from "@/components/home/whyJoinUs";
import Community from "@/components/home/Community";
import Footer from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import CoolNavbar from "@/components/CoolNavbar";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        src="/videos/stars.mp4"
        className="absolute top-0 left-0 w-screen h-screen object-cover -z-10"
      ></video> */}
      <div className="relative">
        <CoolNavbar />
        <Home />
        <AnimatedBackground elementType="star" count={400}>
          <WhyJoinUs />
          <Community />
        </AnimatedBackground>
        <Footer />
      </div>
    </main>
  );
}

