import { Button } from "@/components/ui/button";
import React from "react";
import { FaDiscord } from "react-icons/fa";
const Hero = () => {
  return (
    <>
      <div id="home" className="h-screen max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <h1 className="text-9xl font-semibold tracking-widest">{"{VOID}"}</h1>
          <h1 className="text-xl font-semibold tracking-widest">
            till then explore...
          </h1>
          <div className="flex items-center justify-center gap-8">
            {/* <Button className="text-lg h-10 px-8 py-4">Register</Button> */}
            <a href="https://discord.gg/late-night-coders" target="_blank">
              <Button variant="outline" className="text-lg h-10 px-8 py-4">
                Join Community
                <FaDiscord className="ml-2 w-6 h-6" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
