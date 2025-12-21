import Link from "next/link";
import BlogsGallery from "./components/BlogsGallery";
import CallToAction from "./components/CallToAction";
import EventsShowcase from "./components/CoreValues";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import RealVoices from "./components/RealVoices";
import Stats from "./components/Stats";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <EventsShowcase />
        <RealVoices />
        <Stats />
        <CallToAction />
        <BlogsGallery />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
