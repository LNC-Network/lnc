"use client";
import Image from "next/image";
import React from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
//import { motion } from "framer-motion";

 const Footer: React.FC = () => {
//   const [isVisible, setIsVisible] = useState<boolean>(false);

//   const handleScroll = () => {
//     const scrollPosition = window.scrollY + window.innerHeight;
//     const documentHeight = document.documentElement.scrollHeight;
//     const threshold = 1;

//     // Show footer when reaching the bottom of the document (within the threshold)
//     if (scrollPosition >= documentHeight - threshold) {
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div id ="footer"   
      className='relative h-[800px]'
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className='fixed bottom-0 w-full'>
        {/* <motion.footer
    //   className={`bg-gray-900 text-white py-12 fixed bottom-0 left-0 right-0 ${
    //     isVisible ? "translate-y-0" : "translate-y-full"
    //   }`}
    //   initial={{ y: "100%" }} // Start off-screen
    //   animate={{ y: isVisible ? 0 : "100%" }} // Slide in/out based on visibility
    //   transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
    // > */}
        <p className="md:mb-20 text-7xl md:text-[14rem]  font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          LNC
        </p>
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
        {/* </motion.footer> */}
      </div>
    </div>
  );
};

export default Footer;
