"use client";

import React from "react";
import Hero from "./Hero";
import VideoEffect from "./VideoEffect";

const Home: React.FC = () => {
  return (
    <>
      <section id="home">
        <Hero />
        <VideoEffect />
      </section>
    </>
  );
};

export default Home;
