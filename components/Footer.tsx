"use client";
import Image from "next/image";
import React from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <div id="footer"   
      className='relative h-[800px]'
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className='fixed bottom-0 w-full'>
        <div className="relative">
          {/* Spotlight effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-blue-300 to-transparent opacity-50 rounded-full blur-2xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <motion.p 
            className="md:mb-20 text-7xl md:text-[14rem] font-bold text-center relative z-10"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0], transition: { duration: 0.5 } }}
          >
            <motion.span
              className="inline-block animate-color-shift"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              L
            </motion.span>
            <motion.span
              className="inline-block animate-color-shift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              N
            </motion.span>
            <motion.span
              className="inline-block animate-color-shift"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              C
            </motion.span>
          </motion.p>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <h2 className="text-3xl font-bold mb-4">
                Answering your Questions!
              </h2>
              <p className="mb-4 text-[#d3d3d3]">
                Need some assistance? Feel free to reach out to us. We&apos;re
                here to help and ensure a seamless, satisfying experience.
              </p>
            </div>

            <div>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name *"
                    className="w-full bg-transparent border border-gray-500 p-2"
                  />
                  <input
                    type="email"
                    id="email"
                    placeholder="Email *"
                    className="w-full bg-transparent border border-gray-500 p-2"
                    required
                  />
                </div>
                <textarea
                  id="message"
                  className="w-full bg-transparent border border-gray-500 p-2 h-16 resize-none rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="Message *"
                  rows={2}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-5 gap-4 text-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=latenightcoders1@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-white p-3 rounded-lg shadow-md flex items-center justify-center"
            >
              <Image src="/svg/gmail.svg" alt="Gmail" width={32} height={32} />
            </a>
            <a
              href="https://github.com/LNC-Network"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-black p-3 rounded-lg shadow-md flex items-center justify-center"
            >
              <FaGithub className="h-8 w-8 text-white" />{" "}
            </a>
            <a
              href="https://www.linkedin.com/company/late-night-coders/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-[#0077B5] p-3 rounded-lg shadow-md flex items-center justify-center"
            >
              <FaLinkedin className="h-8 w-8 text-white" />
            </a>
            <a
              href="https://x.com/LNC_Community"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-black p-3 rounded-lg shadow-md flex items-center justify-center"
            >
              <FaXTwitter className="h-8 w-8 text-white" />
            </a>
            <a
              href="https://www.youtube.com/@Late-Night_Coders"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-[#FF0000] p-3 rounded-lg shadow-md flex items-center justify-center"
            >
              <FaYoutube className="h-8 w-8 text-white" />
            </a>
          </div>

          <div className="mt-2 text-center border-t border-gray-700 pt-6">
            <p>&copy; {new Date().getFullYear()} LNC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

