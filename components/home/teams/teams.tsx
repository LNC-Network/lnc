"use client";
import Link from "next/link";

const members = [
  {
    name: "Deep Ghosh",
    role: "Founder - CEO",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "https://www.linkedin.com/in/deep-ghosh/",
  },
  {
    name: "Krish Gupta",
    role: "Co-Founder - CTO",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
  {
    name: "Jit Debnath",
    role: "Sales Manager",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
  {
    name: "Rohit Kumar Kundu",
    role: "UX Engeneer",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
  {
    name: "Snihita Nandi",
    role: "Interaction Designer",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
  {
    name: "Mania Rahaman",
    role: "Visual Designer",
    avatar:
      "https://raw.githubusercontent.com/Abhishekyadav26/profiles/main/assets/deep.png",
    link: "#",
  },
];

export default function TeamSection() {
  return (
    <section className=" text-white py-16 md:py-32" id="teams">
      <span className="text-7xl ml-16 -mt-3.5 font-bold   text-white">
          Team
        </span>
      <div className="mx-auto max-w-5xl border-gray-700 px-6">
        
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              The leads
            </h2>
          </div>
          <div className="mt-6 sm:mt-0">
            <p className="text-gray-300">
              During the working process, we perform regular fitting with the
              client because he is the only person who can feel whether a new
              suit fits or not.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={index} className="group overflow-hidden">
                <Link href={member.link}>
                  <img
                    className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl cursor-pointer"
                    src={member.avatar}
                    alt="team member"
                    width="826"
                    height="1239"
                  />
                </Link>
                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-white text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                      {member.name}
                    </h3>
                    <span className="text-xs text-gray-400">_0{index + 1}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-gray-400 inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {member.role}
                    </span>
                    <Link
                      href={member.link}
                      className="text-gray-400 hover:text-blue-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      {" "}
                      Linkedin
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}