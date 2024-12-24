import Home from "@/components/home/Home";
// import Projects from "@/components/home/Projects";
import WhyJoinUs from "@/components/home/whyJoinUs";
import Community from "@/components/home/Community";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/videos/stars.mp4"
        className="absolute top-0 left-0 w-screen h-screen object-cover -z-10"
      ></video>
      <div className="relative">
        <Header NavType="home" />
        <Home />
        {/* <Projects /> */}
        <WhyJoinUs />
        <Community />
        <Footer />
      </div>
    </main>
  );
}
