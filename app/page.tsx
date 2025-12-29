import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import Stats from "./components/Stats";

import EventsTimeline from "./components/EventsTimeline";
import RealVoices from "./components/RealVoices";

// Dynamic Imports for below-the-fold content optimization
const BlogsGallery = dynamic(() => import("./components/BlogsGallery"), {
  loading: () => <div className="h-[600px] w-full bg-transparent" />,
});
const Achievements = dynamic(() => import("./components/Achievements"));
const Partners = dynamic(() => import("./components/Partners"));

/**
 * Home Page
 * 
 * The main landing page of the application.
 * Composes various sections to tell the LNC community story.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <EventsTimeline />
        <RealVoices />
        <CallToAction />
        <BlogsGallery />
        <Stats />
        <Achievements />
        <Partners />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
