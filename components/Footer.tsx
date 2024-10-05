"use client";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Grid Layout for Contact and Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">CONTACT US</h4>
            <h2 className="text-3xl font-bold mb-4">
              Answering your Questions!<span className="font-light"></span>
            </h2>
            <p className="mb-4 text-[#d3d3d3] py-400">
              Need some assistance? Feel free to reach out to us. We're here to
              help and ensure a seamless, satisfying experience.
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  className="w-full bg-transparent border border-gray-500 p-2 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full bg-transparent border border-gray-500 p-2 rounded-lg"
                />
              </div>
              <textarea
                placeholder="Message *"
                className="w-full bg-transparent border border-gray-500 p-2 rounded-lg h-24"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
                type="submit"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Section with smaller and refined icons */}
        <div className="mt-8 grid grid-cols-4 gap-4 text-center">
          {/* Gmail */}
          <a
            href="mailto:latenightcoders1@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-white p-3 rounded-lg shadow-md flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 48 48"
              className="h-8 w-8"
            >
              <path
                fill="#4caf50"
                d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
              ></path>
              <path
                fill="#1e88e5"
                d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
              ></path>
              <polygon
                fill="#e53935"
                points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
              ></polygon>
              <path
                fill="#c62828"
                d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
              ></path>
              <path
                fill="#fbc02d"
                d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
              ></path>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/LNC-Network"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-gray-800 p-3 rounded-lg shadow-md flex items-center justify-center"
          >
            <FaGithub className="h-8 w-8 text-white" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/late-night-coders/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-[#0077B5] p-3 rounded-lg shadow-md flex items-center justify-center"
          >
            <FaLinkedin className="h-8 w-8 text-white" />
          </a>

          {/* Twitter (X) */}
          <a
            href="https://x.com/Deep_Ghosh_"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-black p-3 rounded-lg shadow-md flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 256 256"
              className="h-8 w-8"
            >
              <g
                fill="#ffffff"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g transform="scale(8.53333,8.53333)">
                  <path d="M26.37,26l-8.795,-12.822l0.015,0.012l7.93,-9.19h-2.65l-6.46,7.48l-5.13,-7.48h-6.95l8.211,11.971l-0.001,-0.001l-8.66,10.03h2.65l7.182,-8.322l5.708,8.322zM10.23,6l12.34,18h-2.1l-12.35,-18z"></path>
                </g>
              </g>
            </svg>
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-2 text-center border-t border-gray-700 pt-6">
          <p>&copy; 2025 LNC . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
