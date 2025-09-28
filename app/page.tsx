// import About from "@/components/home/about/about";
import Archive from "@/components/home/archive/archive";
import Events from "@/components/home/events/events";
import Footer from "@/components/home/footer/footer";
import Hero from "@/components/home/hero/hero";
import Projects from "@/components/home/projects/projects";
import Teams from "@/components/home/teams/teams";
import Navbar from "@/components/home/navbar/navbar";
import Partners from "@/components/home/partners/partners";

export default function Home() {
  return (
    <div
      className="h-screen w-full "
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      <Navbar />
      <Hero />
      <Events />
      <Teams />
      <Projects />
      <Archive />
      {/* <About /> */}
      <Partners />
      <Footer />
    </div>
  );
}
