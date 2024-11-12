import Home from "@/components/Home";
import Projects from "@/components/Projects";
import WhyJoinUs from "@/components/whyJoinUs";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <main>
      <div className="relative">
        <Header />
        <Home />
        <Projects />
        <WhyJoinUs />
        <Community />
        <Footer />
      </div>
    </main>
  );
}
