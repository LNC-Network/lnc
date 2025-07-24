import About from "@/components/about/about";
import Archive from "@/components/archive/archive";
import Events from "@/components/events/events";
import Footer from "@/components/footer/footer";
import Hero from "@/components/hero/hero";
import Partners from "@/components/partners/partners";
import Projects from "@/components/projects/projects";
import Teams from "@/components/teams/teams";

export default function Home() {
  return (
    <div
      className="h-screen w-full "
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      <Hero />
      <Events />
      <Teams />
      <Projects />
      <Archive />
      <About />
      <Partners />
      <Footer />
    </div>
  );
}
