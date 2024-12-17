import Prize from "@/app/events/components/Prize";
import Hero from "./components/Hero";
import About from "./components/About";
import Sponsor from "./components/Sponsor";
import Faq from "./components/Faq";
import Header from "@/components/Header";
import CommunityPartners from "./components/CommunityPartners";

export default function Events() {
  return (
    <main>
      <div className="relative">
        <Header NavType="events" />
        <Hero />
        <About />
        <Prize
          Prize={{
            first: 20000,
            second: 60000,
            third: 100000,
          }}
        />
        <Sponsor />
        <CommunityPartners />
        <Faq />
      </div>
    </main>
  );
}
