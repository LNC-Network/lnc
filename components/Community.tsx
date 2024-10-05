"use client";
import { useState } from "react";
import React from "react";
import Animated from "@/components/Animation";
import Modal from "react-modal";
import JoinUs from "./ui/join-us";
import Image from "next/image";

const CommunitySection = () => {
  const formForeground = () => {
    return "bg-slate-600 rounded-lg p-6 w-full max-w-lg mx-auto relative bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50";
  };
  const formBackground = () => {
    return "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center";
  };
  const IconButton = ({ icon }: { icon: string }) => (
    <button className="p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
      <Image src={`/icons/${icon}.svg`} alt={icon} width={40} height={40} />
    </button>
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Animated>
      <section className="py-24 px-6 text-center bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-200">
            Join Our Nocturnal Community 🌙
          </h2>
          <p className="text-xl mb-10 text-gray-200">
            Embrace the night. Code with might. Connect with fellow night owls.
          </p>
          <button
            onClick={openModal}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 font-semibold"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 opacity-70 transition-all duration-400 group-hover:opacity-100 group-hover:blur-sm"></span>
            <span className="relative rounded-full bg-black bg-opacity-80 px-6 py-3 transition-all duration-400 group-hover:bg-opacity-90">
              <span className="relative text-white text-lg">
                Get Started Now
              </span>
            </span>
          </button>
        </div>
        <div className="mt-16 flex justify-center space-x-6">
          <a href="https://github.com">
            <IconButton icon="github" />
          </a>
          <a href="https://discord.com">
            <IconButton icon="discord" />
          </a>
          <a href="https://twitter.com/">
            <IconButton icon="twitter" />
          </a>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={formForeground()}
        overlayClassName={formBackground()}
      >
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl font-bold text-white">Enrollment Form</h2>
          <button
            onClick={closeModal}
            className="text-white text-2xl absolute right-6 top-4"
          >
            &times;
          </button>
        </div>
        <JoinUs />
      </Modal>
    </Animated>
  );
};

export default CommunitySection;
