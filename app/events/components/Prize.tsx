"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Event } from "@/types/event";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";
import { AnimatedBackground } from "./AnimatedBackground";

const PrizeCard = ({ place, amount, icon: Icon, delay }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      style={{ y }}
    >
      <Card className="bg-gray-800 border-purple-500 overflow-hidden relative group">
        <CardHeader className="text-2xl font-bold text-center pb-2 text-white">
          {place}
        </CardHeader>
        <CardContent className="text-4xl font-bold text-center text-purple-400">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            ${amount.toLocaleString()}
          </motion.div>
        </CardContent>
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Icon className="text-9xl text-purple-600" />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

const Prize = ({ Prize }: { Prize: Event["Prize"] }) => {
  return (
    <AnimatedBackground
      elementType="triangle"
      color="rgba(236, 72, 153, 0.4)"
      count={75}
    >
      <motion.div
        id="prize"
        className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-5xl font-bold mb-12 tracking-wider text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Prizes
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <PrizeCard
            place="1st Place"
            amount={Prize.first}
            icon={FaTrophy}
            delay={0.2}
          />
          <PrizeCard
            place="2nd Place"
            amount={Prize.second}
            icon={FaMedal}
            delay={0.3}
          />
          <PrizeCard
            place="3rd Place"
            amount={Prize.third}
            icon={FaAward}
            delay={0.4}
          />
        </div>
      </motion.div>
    </AnimatedBackground>
  );
};

export default Prize;
