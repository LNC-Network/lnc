"use client";
import React, { useState } from "react";
import { z } from "zod";
import { FaLinkedin, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const emailSchema = z.object({
    email: z.email({ message: "Please enter a valid email address." }),
  });

  const subscribe = async () => {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });

      if (!res.ok) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
      const success = await subscribe();
      if (!success) {
        setError("Subscription failed. Please try again later.");
        return;
      }
      console.log("Email submitted:", result.data.email);
      setEmail("");
    }
  };

  return (
    <div
      className="pl-10 pr-10 pt-20 pb-10"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      <footer className="relative bg-fuchsia-950/20 border-b-3 border-r-3 border-[#3F185D] rounded-xl p-20 mx-auto overflow-hidden ">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 800 200"
        >
          <path
            d="M0,100 C200,0 400,200 800,100"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
            className="animate-pulse"
          />
          <path
            d="M0,150 C300,50 500,250 800,150"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />
        </svg>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="relative z-10 w-full ">
          <div className="flex flex-col sm:flex-row items-center w-full gap-2">
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                                w-full h-12
                                pl-6 pr-6 sm:pr-[190px]
                                text-lg text-white
                                border-2 border-[#8e5bb5]
                                bg-gradient-to-r from-[#5F1D95] to-[#561189]
                                rounded-full
                                placeholder-[#987CAf]
                                placeholder:font-thin
                                placeholder:text-base
                                focus:outline-none
                                focus:border-[#D6C6E2]
                                hover:border-[#D6C6E2]
                                transition-colors duration-300 ease-in-out
                                font-inter
                            "
              />

              {/* glow behind button */}
              <span
                className="
                                absolute top-1/2 -translate-y-1/2 right-2
                                w-[160px] h-12
                                bg-[#8e5bb5]
                                rounded-full
                                filter blur-[30px]
                                opacity-60
                                hidden sm:block
                            "
              />

              <button
                type="submit"
                className="
                                absolute top-1/2 -translate-y-1/2 right-0
                                h-12 px-8
                                text-sm font-normal text-white
                                items-center justify-center
                                bg-gradient-to-r from-[#5F1D95] to-[#561189]
                                border-2 border-[#D6C6E2]
                                rounded-full
                                drop-shadow-[0_0_20px_rgba(86,17,137,0.7)]
                                transform transition duration-300 ease-in-out
                                hover:scale-105
                                hover:bg-opacity-80
                                cursor-pointer
                                hidden sm:flex
                            "
              >
                SUBSCRIBE NOW
              </button>
            </div>

            {/* mobile button */}
            <button
              type="submit"
              className="
                            sm:hidden
                            w-full h-12 mt-1
                            text-sm font-normal text-white
                            bg-gradient-to-r from-[#5F1D95] to-[#561189]
                            border-2 border-[#D6C6E2]
                            rounded-full
                            drop-shadow-[0_0_20px_rgba(86,17,137,0.7)]
                            transform transition duration-300 ease-in-out
                            hover:scale-105
                            hover:bg-opacity-80
                            cursor-pointer
                            "
            >
              SUBSCRIBE NOW
            </button>
          </div>
        </form>

        {error && (
          <p className="relative z-10 text-red-400 mt-2 text-center">{error}</p>
        )}

        {/* Footer Bottom */}
        <div className="relative z-10 mt-10">
          <p className="text-[#767279] text-left mb-4 text-xs">
            latenightcoders1@gmail.com
          </p>
          <hr className="border-[#B9B8BA] mb-2.5" />
          <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-2 gap-2">
            <p className="text-xs text-[#99969B]">
              &copy; Late Night Coders. All rights reserved.
            </p>
            <div className="flex space-x-4 text-[#9A969B]">
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin className="w-4 h-4 transition transform duration-200 ease-in-out hover:scale-125 hover:text-purple-400" />
              </a>
              <a href="#" aria-label="X">
                <SiX className="w-4 h-4 transition transform duration-200 ease-in-out hover:scale-125 hover:text-purple-400" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="w-4 h-4 transition transform duration-200 ease-in-out hover:scale-125 hover:text-purple-400" />
              </a>
              <a href="#" aria-label="GitHub">
                <FaGithub className="w-4 h-4 transition transform duration-200 ease-in-out hover:scale-125 hover:text-purple-400" />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="w-4 h-4 transition transform duration-200 ease-in-out hover:scale-125 hover:text-purple-400" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
