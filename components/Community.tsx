"use client";
import { useState } from "react";
import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import Animated from "@/components/Animation";

const CommunitySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Animated>
      <section className="py-24 px-6 text-center bg-primary text-primary-foreground">
        <h2 className="text-3xl font-bold mb-6">Join Our Community 🤝</h2>

        <p className="text-xl mb-8">Embrace the night. Code with might.</p>

        <button
          onClick={openModal}
          className="bg-slate-800 no-underline group cursor-pointer relative shadow-xl h-12 shadow-zinc-300 rounded-full text-xs font-semibold leading-6 text-white inline-block"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,1)_0%,rgba(56,189,248,0.6)_50%,rgba(56,189,248,0)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>

          <div className="relative flex space-x-2 items-center z-10 h-5/6 rounded-full bg-zinc-950 py-0.5 px-4 m-1 ring-1 ring-black/10 group-hover:bg-zinc-950 transition-colors duration-500">
            <span>{`Get Started Now`}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10.75 8.75L14.25 12L10.75 15.25"
              ></path>
            </svg>
          </div>
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-background rounded-lg shadow-lg"
        >
          <h2 className="text-3xl">Join Us</h2>
          <IoCloseSharp
            onClick={closeModal}
            className="text-lg hover:cursor-pointer absolute top-5 right-5"
          />
          <form className="flex flex-col justify-center align-middle gap-5">
            <input
              type="text"
              placeholder="Name"
              required
              className="h-10 bg-slate-800 w-56 p-2"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="h-10 bg-slate-800 w-56 p-2"
            />
            <button type="submit" className="w-40 h-10 bg-slate-800">
              Submit
            </button>
          </form>
        </Modal>
      </section>
    </Animated>
  );
};

export default CommunitySection;
