// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { Event } from "@/types/event";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";
// import { AnimatedBackground } from "@/components/AnimatedBackground";

// const PrizeCard = ({ place, amount, icon: Icon, delay }) => {
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

//   return (
//     <motion.div
//       initial={{ y: 20, opacity: 0 }}
//       whileInView={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, delay }}
//       viewport={{ once: true }}
//       style={{ y }}
//     >
//       <Card className="bg-gray-800 border-purple-500 overflow-hidden relative group">
//         <CardHeader className="text-2xl font-bold text-center pb-2 text-white">
//           {place}
//         </CardHeader>
//         <CardContent className="text-4xl font-bold text-center text-purple-400">
//           <motion.div
//             initial={{ scale: 1 }}
//             whileHover={{ scale: 1.1 }}
//             transition={{ duration: 0.3 }}
//           >
//             ${amount.toLocaleString()}
//           </motion.div>
//         </CardContent>
//         <motion.div
//           className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300"
//           initial={{ rotate: 0 }}
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//         >
//           <Icon className="text-9xl text-purple-600" />
//         </motion.div>
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20"
//           initial={{ scale: 0 }}
//           whileHover={{ scale: 1 }}
//           transition={{ duration: 0.3 }}
//         />
//       </Card>
//     </motion.div>
//   );
// };

// const Prize = ({ Prize }: { Prize: Event["Prize"] }) => {
//   return (
//     <AnimatedBackground
//       elementType="triangle"
//       color="rgba(236, 72, 153, 0.4)"
//       count={75}
//     >
//       <motion.div
//         id="prize"
//         className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <motion.h2
//           className="text-5xl font-bold mb-12 tracking-wider text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
//           initial={{ y: -50, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//         >
//           Prizes
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
//           <PrizeCard
//             place="1st Place"
//             amount={Prize.first}
//             icon={FaTrophy}
//             delay={0.2}
//           />
//           <PrizeCard
//             place="2nd Place"
//             amount={Prize.second}
//             icon={FaMedal}
//             delay={0.3}
//           />
//           <PrizeCard
//             place="3rd Place"
//             amount={Prize.third}
//             icon={FaAward}
//             delay={0.4}
//           />
//         </div>
//       </motion.div>
//     </AnimatedBackground>
//   );
// };

// export default Prize;

////Type one of Optimize 

"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Event } from "@/types/event";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";
import { AnimatedBackground } from "@/components/AnimatedBackground";

// Types
interface PrizeCardProps {
  place: string;
  amount: number;
  icon: React.ComponentType<{ className: string }>;
  delay: number;
}

// Animation variants
const ANIMATIONS = {
  container: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.8 },
    viewport: { once: true }
  },
  title: {
    initial: { y: -50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
    viewport: { once: true }
  },
  card: {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true }
  },
  amount: {
    initial: { scale: 1 },
    whileHover: { scale: 1.1 },
    transition: { duration: 0.3 }
  },
  icon: {
    initial: { rotate: 0 },
    whileHover: { rotate: 360 },
    transition: { duration: 1, ease: "easeInOut" }
  },
  gradient: {
    initial: { scale: 0 },
    whileHover: { scale: 1 },
    transition: { duration: 0.3 }
  }
};

const PrizeCard = React.memo(({ place, amount, icon: Icon, delay }: PrizeCardProps) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      {...ANIMATIONS.card}
      transition={{ duration: 0.5, delay }}
      style={{ y }}
    >
      <Card className="bg-gray-800 border-purple-500 overflow-hidden relative group">
        <CardHeader className="text-2xl font-bold text-center pb-2 text-white">
          {place}
        </CardHeader>
        <CardContent className="text-4xl font-bold text-center text-purple-400">
          <motion.div {...ANIMATIONS.amount}>
            {amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </motion.div>
        </CardContent>
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300"
          {...ANIMATIONS.icon}
        >
          <Icon className="text-9xl text-purple-600" />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20"
          {...ANIMATIONS.gradient}
        />
      </Card>
    </motion.div>
  );
});

PrizeCard.displayName = "PrizeCard";

const PRIZE_DATA = [
  { id: "first", place: "1st Place", icon: FaTrophy, delay: 0.2 },
  { id: "second", place: "2nd Place", icon: FaMedal, delay: 0.3 },
  { id: "third", place: "3rd Place", icon: FaAward, delay: 0.4 }
];

const Prize = ({ Prize: prizeData }: { Prize: Event["Prize"] }) => {
  return (
    <AnimatedBackground
      elementType="triangle"
      color="rgba(236, 72, 153, 0.4)"
      count={75}
    >
      <motion.div
        id="prize"
        className="min-h-screen flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden"
        {...ANIMATIONS.container}
      >
        <motion.h2
          className="text-5xl font-bold mb-12 tracking-wider text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          {...ANIMATIONS.title}
        >
          Prizes
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          {PRIZE_DATA.map(({ place, icon, delay, id }) => (
            <PrizeCard
              key={place}
              place={place}
              amount={prizeData[id]}
              icon={icon}
              delay={delay}
            />
          ))}
        </div>
      </motion.div>
    </AnimatedBackground>
  );
};

export default Prize;