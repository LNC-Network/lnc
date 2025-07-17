import About from "@/components/about/about";
import Archive from "@/components/archive/archive";
import Events from "@/components/events/events";
import Hero from "@/components/hero/hero";
import Projects from "@/components/projects/projects";
import Teams from "@/components/teams/teams";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <Hero />
      <Events />
      <Teams />
      <Projects />
      <Archive />
      <About />
    </div>
  );
}