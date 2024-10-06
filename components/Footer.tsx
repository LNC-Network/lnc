"use client";
import Image from "next/image";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

const Footer = () => {
  const IconButton = ({ icon }: { icon: string }) => (
    <Image src={`/icons/${icon}.svg`} alt={icon} width={32} height={32} />
  );
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Grid Layout for Contact and Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <h2 className="text-3xl font-bold mb-4">
              Answering your Questions!<span className="font-light"></span>
            </h2>
            <p className="mb-4 text-[#d3d3d3] py-400">
              Need some assistance? Feel free to reach out to us. We&rsquo;re
              here to help and ensure a seamless, satisfying experience.
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Name *"
                  className="w-full bg-transparent border border-gray-500"
                />
                <Input
                  type="text"
                  id="email"
                  placeholder="Email *"
                  className="w-full bg-transparent border border-gray-500"
                />
              </div>
              <Textarea
                id="message"
                className="w-full bg-transparent border border-gray-500 p-2 h-24"
                placeholder="Message *"
                rows={4}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                SUBMIT
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media Section with smaller and refined icons */}
        <div className="mt-8 grid grid-cols-4 gap-4 text-center">
          {/* Gmail */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=latenightcoders1@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 bg-white p-3 rounded-lg shadow-md flex items-center justify-center"
          >
            <IconButton icon="gmail" />
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
            <FaXTwitter className="h-8 w-8 text-white" />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-2 text-center border-t border-gray-700 pt-6">
          <p>© {new Date().getFullYear()} LNC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
