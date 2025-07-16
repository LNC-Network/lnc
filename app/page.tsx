'use client';

import About from '@/components/about/about'; // Keep the About import
import Projects from '@/components/projects/projects';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">

      {/* Only render the About component */}
      <div id="about">
        <About />
        <Projects />
      </div>

    </div>
  );
}