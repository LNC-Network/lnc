import HeroSection from "@/components/Hero";
import Projects from "@/components/Projects";
import WhyJoinUs from "@/components/whyJoinUs";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Header />
        <HeroSection />
        <Projects />
        <WhyJoinUs />
        <Community />
        <Footer />
      </div>
    </main>
  );
}
