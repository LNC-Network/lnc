"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is Hackathon?",
    answer:
      "A hackathon is social coding event where programmers, designers, and developers collaborate to solve a problem and compete for cash prizes. It's one part party, one part work-hard overnight battle against the clock and the competition.",
  },
  {
    question: "Who can participate in Hackathon?",
    answer:
      "Students currently enrolled in any course in High School or College can participate in LNC 1.0. Along with that current year passouts can participate too.",
  },
  {
    question: "How much much does it cost to participate?",
    answer:
      "Nothing, participation in LNC 1.0 is absolutely FREE!!🎉 We'll have meals, snacks, and beverages onsite at the hackathon, in addition to swags, prizes, fun mini-events and more.",
  },
  {
    question: "Team Size",
    answer:
      "We encourage you to make a team of minimum 2 and maximum 4 members. If you are a Solo Hacker and do not have a team, you can still register and we will help you find a team on our Discord Server.",
  },
  {
    question: "What is the duration of the Hackathon",
    answer: "The duration of the Hackathon is 24 hours.",
  },
  {
    question:"What will be provided for participants at the venue", 
    answer: 
      "Coming soon...."
  },
  {
    question:"Will hardware toolkits be avilable on-dite?", 
    answer: 
      "Coming soon...."
  },
  {
    question:"What are the guidlines for the teans participating in the Hardware track?", 
    answer: 
      "Coming soon...."
  },
  {
    question:"I have more question, where and how can I reach out?", 
    answer: 
      "Reach out on our WhatsApp group ({<a> herf = https://chat.whatsapp.com/KtylUkytoAYDgbzAS2EQfR </a>}) or Discord server (https://discord.gg/z7W9dHGy). We will be happy to answer any questions you have."
  }
];

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-700 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-xl font-semibold">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </motion.div>
      </motion.button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-2 text-gray-400">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const Faq = () => {
  return (
    <motion.div
      id="faq"
      className="min-h-screen flex flex-col justify-center items-center py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-5xl font-bold mb-12 tracking-wider text-center"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="max-w-3xl w-full">
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </motion.div>
  );
};

export default Faq;
