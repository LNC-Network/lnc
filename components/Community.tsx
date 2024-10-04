"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Animated from "@/components/Animation";

const CommunitySection = () => {
  return (
    <Animated>
      <section className="py-24 px-6 text-center bg-primary text-primary-foreground">
        <h2 className="text-3xl font-bold mb-6">Join Our Community 🤝</h2>
        <p className="text-xl mb-8">Embrace the night. Code with might.</p>
        <Button
          size="lg"
          variant="secondary"
          className="hover:scale-105 transition-transform duration-300"
        >
          Get Started Now
        </Button>
      </section>
    </Animated>
  );
};

export default CommunitySection;
