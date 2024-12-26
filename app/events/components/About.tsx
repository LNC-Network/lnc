"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FaLightbulb, FaUsers, FaRocket } from "react-icons/fa";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const features = [
  {
    icon: FaLightbulb,
    title: "Innovate",
    description: "Push the boundaries of technology",
  },
  {
    icon: FaUsers,
    title: "Collaborate",
    description: "Work with like-minded individuals",
  },
  {
    icon: FaRocket,
    title: "Launch",
    description: "Turn your ideas into reality",
  },
];

const About = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <AnimatedBackground
      elementType="circle"
      color="rgba(168, 85, 247, 0.4)"
      count={50}
    >
      <motion.div
        id="about"
        className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-5xl font-bold mb-12 tracking-wider text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          style={{ scale }}
        >
          About {"{VOID}"}
        </motion.h2>
        <motion.div
          className="max-w-4xl text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-300">
            {"{VOID}"} is not just a hackathon; it&apos;s a journey into the
            unknown. Join us for 48 hours of coding, creativity, and
            collaboration as we push the boundaries of what&apos;s possible.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg text-center backdrop-blur-sm relative overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(123, 31, 162, 0.5)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="text-5xl mb-4 text-purple-500 mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatedBackground>
  );
};

export default About;
