import Hero from "./components/Hero";
import CoreValues from "./components/CoreValues";
import RealVoices from "./components/RealVoices";
import Stats from "./components/Stats";
import CallToAction from "./components/CallToAction";
import Newsletter from "./components/Newsletter";
import Questions from "./components/Questions";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <CoreValues />
        <RealVoices />
        <Stats />
        <CallToAction />
        <Newsletter />
        <Questions />
        <Footer />
      </div>
    </>
  );
}
