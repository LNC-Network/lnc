import Home from "@/components/home/Home";
import Projects from "@/components/home/Projects";
import WhyJoinUs from "@/components/home/whyJoinUs";
import Community from "@/components/home/Community";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <main>
      <div className="relative">
        <Header NavType="home" />
        <Home />
        <Projects />
        <WhyJoinUs />
        <Community />
      </div>
    </main>
  );
}
