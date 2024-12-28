"use client";

import { motion, useScroll, useTransform, /*useSpring*/ } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaRocket, FaStar } from "react-icons/fa";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <AnimatedBackground
      elementType="star"
      color="rgba(255, 255, 255, 0.7)"
      count={200}
    >
      <motion.div
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center space-y-8 z-10"
          style={{ y, opacity, scale }}
        >
          <motion.h1
            className="text-7xl md:text-9xl font-bold tracking-wider"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {"{"}
            </motion.span>
            <motion.span
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              VOID
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, -5, 0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {"}"}
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl font-semibold tracking-wide text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore the unknown, create the impossible
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button className="text-lg h-12 px-8 py-2 bg-purple-600 hover:bg-purple-700 transition-colors duration-300 group relative overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="relative z-10 flex items-center"
                // animate={{ rotate: 360 }}
                // transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FaRocket className="mr-2" />
                Register Now
              </motion.span>
            </Button>
            <a
              href="https://discord.gg/late-night-coders"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="text-lg h-12 px-8 py-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 group relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-purple-500"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span className="relative z-10 flex items-center">
                  Join Community
                  <motion.span
                    className="inline-block ml-2"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <FaDiscord className="w-6 h-6" />
                  </motion.span>
                </motion.span>
              </Button>
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaStar className="text-4xl text-yellow-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatedBackground>
  );
};

export default Hero;
