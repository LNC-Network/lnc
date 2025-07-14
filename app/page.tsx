<<<<<<< Updated upstream
import Image from "next/image";
// import Footer from '@/components/footer/footer';
=======
'use client';

import Image from 'next/image';
import About from '@/components/about/about';
>>>>>>> Stashed changes

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center p-10 gap-6">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <a
          href="#about"
          className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
        >
          About Us
        </a>
      </section>
      <div id="about">
        <About />
      </div>

    </div>
  );
}
