"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Prize from "../../components/Prize";
import Sponsor from "../../components/Sponsor";
import CommunityPartners from "../../components/CommunityPartners";
import Faq from "../../components/Faq";

export default function Events() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main
      style={{ wordSpacing: "0.5em", letterSpacing: "0.1em" }}
      className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white min-h-screen"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-purple-500 origin-left z-50"
        style={{ scaleX }}
      />
      <Navbar NavType="events" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <Prize
          Prize={{
            first: "Coming Soon",
            second: "Coming Soon",
            third: "Coming Soon",
          }}
        />
        <Sponsor />
        <CommunityPartners />
        <Faq />
      </motion.div>
    </main>
  );
}
