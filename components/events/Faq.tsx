// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import faqs from "@/public/data/faqs.json";

// // Function to render the answer with clickable links
// const renderWithLinks = (text: string) => {
//   const linkRegex = /(https?:\/\/[^\s]+)/g; // Regex to detect URLs
//   const parts = text.split(linkRegex); // Split the text by URLs

//   return parts.map((part, index) => {
//     if (linkRegex.test(part)) {
//       return (
//         <a
//           key={index}
//           href={part}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 underline"
//         >
//           {part}
//         </a>
//       );
//     }
//     return part;
//   });
// };

// const FaqItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.div
//       className="border-b border-gray-700 py-4"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//     >
//       <motion.button
//         className="flex justify-between items-center w-full text-left"
//         onClick={() => setIsOpen(!isOpen)}
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         <span className="text-xl font-semibold">{question}</span>
//         <motion.div
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//         </motion.div>
//       </motion.button>
//       <motion.div
//         initial={{ height: 0, opacity: 0 }}
//         animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//         className="overflow-hidden"
//       >
//         <p className="mt-2 text-gray-400">{renderWithLinks(answer)}</p>
//       </motion.div>
//     </motion.div>
//   );
// };

// const Faq = () => {
//   return (
//     <motion.div
//       id="faq"
//       className="min-h-screen flex flex-col justify-center items-center py-20 px-4"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       <motion.h2
//         className="text-5xl font-bold mb-12 tracking-wider text-center "
//         initial={{ y: -50, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         viewport={{ once: true }}
//         style={{ wordSpacing: "0.2em" }}
//       >
//         Frequently Asked Questions
//       </motion.h2>
//       <div
//         className="max-w-3xl w-full text-xl"
//         style={{
//           wordSpacing: "0em",
//           letterSpacing: "0em",
//           fontFamily: "monospace",
//         }}
//       >
//         {faqs.map((faq, index) => (
//           <FaqItem key={index} question={faq.question} answer={faq.answer} />
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default Faq;

// // one type of Optimize 
// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import faqs from "@/public/data/faqs.json";

// // Function to render the answer with clickable links
// const renderWithLinks = (text) => {
//   const linkRegex = /(https?:\/\/[^\s]+)/g; // Regex to detect URLs
//   return text.split(linkRegex).map((part, index) =>
//     linkRegex.test(part) ? (
//       <a
//         key={index}
//         href={part}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-500 underline"
//       >
//         {part}
//       </a>
//     ) : (
//       part
//     )
//   );
// };

// const FaqItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.div
//       className="border-b border-gray-700 py-4"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//     >
//       <motion.button
//         className="flex justify-between items-center w-full text-left"
//         onClick={() => setIsOpen((prev) => !prev)}
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         <span className="text-xl font-semibold">{question}</span>
//         <motion.div
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//         </motion.div>
//       </motion.button>
//       {isOpen && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           transition={{ duration: 0.3 }}
//           className="overflow-hidden"
//         >
//           <p className="mt-2 text-gray-400">{renderWithLinks(answer)}</p>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// const Faq = () => (
//   <motion.div
//     id="faq"
//     className="min-h-screen flex flex-col justify-center items-center py-20 px-4"
//     initial={{ opacity: 0 }}
//     whileInView={{ opacity: 1 }}
//     transition={{ duration: 0.8 }}
//     viewport={{ once: true }}
//   >
//     <motion.h2
//       className="text-5xl font-bold mb-12 tracking-wider text-center"
//       initial={{ y: -50, opacity: 0 }}
//       whileInView={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//       style={{ wordSpacing: "0.2em" }}
//     >
//       Frequently Asked Questions
//     </motion.h2>
//     <div className="max-w-3xl w-full text-xl" style={{ fontFamily: "monospace" }}>
//       {faqs.map(({ question, answer }, index) => (
//         <FaqItem key={index} question={question} answer={answer} />
//       ))}
//     </div>
//   </motion.div>
// );

// export default Faq;

// type TWO of Optimize 

"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import faqs from "@/public/data/faqs.json";

// Types
interface FAQ {
  question: string;
  answer: string;
}

interface FaqItemProps extends FAQ {
  index: number;
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
  item: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true }
  },
  content: {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.3 }
  }
};

// Link rendering utility
const renderWithLinks = (text: string) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(linkRegex);
  
  return parts.map((part, index) => {
    if (linkRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-400 transition-colors"
          aria-label={`External link to ${part}`}
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

const FaqItem = React.memo(({ question, answer, index }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <motion.div
      className="border-b border-gray-700 py-4"
      {...ANIMATIONS.item}
    >
      <motion.button
        className="flex justify-between items-center w-full text-left group"
        onClick={toggleOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="text-xl font-semibold group-hover:text-gray-300 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 group-hover:text-gray-300"
        >
          {isOpen ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...ANIMATIONS.content}
            id={`faq-answer-${index}`}
            className="overflow-hidden"
          >
            <p className="mt-2 text-gray-400 leading-relaxed">
              {renderWithLinks(answer)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FaqItem.displayName = "FaqItem";

const Faq = () => (
  <motion.div
    id="faq"
    className="min-h-screen flex flex-col justify-center items-center py-20 px-4"
    {...ANIMATIONS.container}
  >
    <motion.h2
      className="text-5xl font-bold mb-12 tracking-wider text-center"
      {...ANIMATIONS.title}
      style={{ wordSpacing: "0.2em" }}
    >
      Frequently Asked Questions
    </motion.h2>
    
    <div 
      className="max-w-3xl w-full text-xl space-y-2"
      style={{ fontFamily: "monospace" }}
    >
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          {...faq}
          index={index}
        />
      ))}
    </div>
  </motion.div>
);

export default Faq;