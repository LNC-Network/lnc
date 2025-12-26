import BlogsGallery from "./components/BlogsGallery";
import CallToAction from "./components/CallToAction";
import EventsTimeline from "./components/EventsTimeline";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import RealVoices from "./components/RealVoices";
import Stats from "./components/Stats";

import Achievements from "./components/Achievements";
import Partners from "./components/Partners";

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
