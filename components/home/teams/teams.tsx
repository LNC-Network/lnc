"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sigma } from "lucide-react";
import { useRouter } from "next/navigation";

const members = [
  {
    name: "Deep Ghosh",
    role: "Vice President",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQEsLgXJhIcjfA/profile-displayphoto-scale_400_400/B56ZmmY_NcHUAg-/0/1759433194398?e=1762387200&v=beta&t=JmmDkiPDzBWqQpXFo2UwlVnxoxutgXOc45O49ZP2xEc",
    link: "https://www.linkedin.com/in/deep-ghosh/",
  },
  {
    name: "Krish Gupta",
    role: "Dev Lead",
    avatar: "/no-face-man.jpg",
    link: "#",
  },
  {
    name: "Jit Debnath",
    role: "Dev Lead",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQFRAh9IagkQlQ/profile-displayphoto-scale_400_400/B56Zk0hiTeHcAg-/0/1757522832474?e=1762387200&v=beta&t=gQxcoz8NYEK7pAWxAPR76ShSzIKGib4FyrMx6_kuTlY",
    link: "https://www.linkedin.com/in/jit-deb-nath/",
  },
  {
    name: "Rohit Kumar Kundu",
    role: "HR/POC",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQHkd1mfPPuQeg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727883990929?e=1762387200&v=beta&t=7VZUDiEz53_7scO8cwNQGk_HLfFW2awOBDkeJn7hBrw",
    link: "https://www.linkedin.com/in/rohit-kumar-kundu/",
  },
  {
    name: "Snihita Nandi",
    role: "Designing Lead",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQEYEK16Wct7kw/profile-displayphoto-scale_400_400/B4DZeq0rOpHAAg-/0/1750917625467?e=1762387200&v=beta&t=0XALHFcVSBkLj1VDKsjPr-uV0kNpypkDTnH8ITVByeY",
    link: "https://www.linkedin.com/in/snihita-nandi/",
  },
  {
    name: "Mania Rahaman",
    role: "Designing Lead",
    avatar: "/no-face-woman.jpg",
    link: "#",
  },
  {
    name: "Prachi Jha",
    role: "Marketing Lead",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQEx7di9nnYpow/profile-displayphoto-shrink_400_400/B56ZXLUTv1HoAg-/0/1742872856884?e=1762387200&v=beta&t=uwCz-0sMswbT2NpUMiIw1vR6oCBAf7xiOkNz1yz0qTQ",
    link: "https://www.linkedin.com/in/prachi-jha-297b962b3/",
  },
];
interface Member {
  name: string;
  role: string;
  avatar: string;
  link: string;
}
interface TeamCardProps {
  member: Member;
  index: number;
}

function TeamCard({ member, index }: TeamCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isHovered = hoveredIndex === index;

  return (
    <motion.div
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative h-64 sm:h-80 md:h-96"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      {/* Main card */}
      <div className="relative h-full rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
        {/* Image */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={member.avatar}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
            priority={index < 4}
          />

          {/* Dark overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black"
            animate={isHovered ? { opacity: 0.4 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Text overlay - positioned at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 sm:p-6"
          animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={isHovered ? { y: -8 } : { y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white text-lg sm:text-xl font-light tracking-tight">
              {member.name}
            </h3>
            <p className="text-white text-xs sm:text-sm font-light mt-1 tracking-wide uppercase">
              {member.role}
            </p>
          </motion.div>

          {/* Link on hover */}
          <motion.a
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 sm:mt-4 text-white text-xs tracking-widest uppercase font-light hover:opacity-75 transition-opacity"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            View Profile →
          </motion.a>
        </motion.div>

        {/* Index badge - top right */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-xs font-light text-white/60">
          _0{index + 1}
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const router = useRouter();

  return (
    <section
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-16 lg:px-24"
      id="teams"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-xs tracking-widest text-white/70 uppercase">
            The Team
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mt-4 sm:mt-6 tracking-tight leading-tight">
            Leadership <span className="font-thin">Collective</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-light mt-6 sm:mt-8 max-w-xl leading-relaxed">
            Diverse expertise unified by vision. Each member contributes
            distinctive perspective and depth to drive excellence.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {members.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
            }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="group w-full h-full border border-white/30 rounded-md flex justify-center items-center text-white/80 hover:text-white font-light tracking-widest cursor-pointer"
            onClick={() => {
              router.push("/team");
            }}
          >
            <span className="relative flex justify-center items-center">
              <Sigma className="mr-2" />
              Full Squad
              <span
                className="absolute left-0 bottom-[-2px] h-[1px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
                style={{ width: "100%" }}
              />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
