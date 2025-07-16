'use client';

import About from '@/components/about/about'; // Keep the About import
import Projects from '@/components/projects/projects';
import Archive from '@/components/archive/archive';
import Partners from '@/components/partners/partners';
import Footer from '@/components/footer/footer';
import Events from '@/components/events/events';
import Hero from '@/components/hero/hero';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">

      {/* Only render the About component */}
      <div id="about">
        <Hero />
        <Events />
        <Projects />
        <Archive />
        <About />
        <Partners />
        <Footer />

        
      </div>

    </div>
  );
}