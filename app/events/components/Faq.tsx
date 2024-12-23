"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is {VOID}?",
    answer:
      "{VOID} is a 48-hour hackathon where participants come together to innovate, collaborate, and create cutting-edge solutions to real-world problems.",
  },
  {
    question: "Who can participate?",
    answer:
      "Anyone with a passion for technology and innovation can participate. Whether you're a student, professional, or hobbyist, you're welcome to join!",
  },
  {
    question: "Do I need to have a team?",
    answer:
      "You can participate solo or in a team of up to 4 members. Don't worry if you don't have a team - we'll have team formation activities at the start of the event!",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring your laptop, charger, and any other devices you might need. We'll provide food, drinks, and a comfortable hacking environment.",
  },
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
