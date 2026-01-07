import Hero from "./components/Hero";
import CallToAction from "./components/projects";
import Footer from "./components/Footer";
import Stats from "./components/Stats";
import EventsTimeline from "./components/EventsTimeline";
import RealVoices from "./components/RealVoices";
import BlogsGallery from "./components/BlogsGallery";
import Achievements from "./components/Achievements";
import Partners from "./components/Partners";
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
        <Footer />
      </div>
    </>
  );
}
