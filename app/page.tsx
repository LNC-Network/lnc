import HeroSection from "@/components/Hero";
import Projects from "@/components/Projects";
import Features from "@/components/Features";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="pt-24 flex flex-col items-center justify-center space-x-100">
      <div>
        <Header />
        <HeroSection />
        <Projects />
        <Features />
        <Community />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
