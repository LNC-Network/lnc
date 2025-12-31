import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import CallToAction from "./components/projects";
import Footer from "./components/Footer";
import Stats from "./components/Stats";

import EventsTimeline from "./components/EventsTimeline";
import RealVoices from "./components/RealVoices";

// Dynamic Imports for below-the-fold content optimization
const BlogsGallery = dynamic(() => import("./components/BlogsGallery"), {
  loading: () => <div className="h-150 w-full bg-transparent" />,
});
const Achievements = dynamic(() => import("./components/Achievements"), {
  loading: () => <div className="h-[600px] w-full bg-transparent" />,
});
const Partners = dynamic(() => import("./components/Partners"), {
  loading: () => <div className="h-[400px] w-full bg-transparent" />,
});

const Newsletter = dynamic(() => import("./components/Newsletter"), {
  loading: () => <div className="h-[500px] w-full bg-transparent" />,
});

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
