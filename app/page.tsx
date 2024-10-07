import HeroSection from "@/components/Hero";
import Projects from "@/components/Projects";
import Features from "@/components/Features";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="pt-24">
      <div className="relative px-3">
        <Header />
        <HeroSection />
        <Projects />
        <Features />
        <Community />
        <Footer />
      </div>
    </main>
  );
}
