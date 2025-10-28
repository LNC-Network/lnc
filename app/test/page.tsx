"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Members from "@/public/Data/members.json";

interface Member {
  name: string;
  role: string;
  avatar: string;
  link: string;
}

export default function Page() {
  const allMembers: Member[] = Array.isArray(Members) ? Members : (Members as any).members;

  const [startIndex, setStartIndex] = useState(0);
  const visibleMembers = allMembers.slice(startIndex, startIndex + 6);

  const handlePrev = () => setStartIndex((p) => Math.max(p - 6, 0));
  const handleNext = () => startIndex + 6 < allMembers.length && setStartIndex((p) => p + 6);

  return (
    <div className="min-h-screen bg-black text-white px-8 py-16">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold mb-20 ml-4">
          Meet <span className="text-purple-500">Our</span> Team
        </h1>

        <div className="flex items-center justify-center gap-12">
          {/* Navigation Button - Left */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="flex-shrink-0 w-20 h-20 rounded-full bg-purple-900/30 border-2 border-purple-600 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:bg-purple-800/40 transition-all"
          >
            <ChevronLeft size={36} className="text-purple-800" />
          </button>

          {/* Images Grid */}
          <div className="grid grid-cols-3 gap-6">
            {visibleMembers.map((member, index) => (
              <Link key={index} href={member.link} target="_blank" className="group relative">
                <div className="relative w-[200px] h-[260px] rounded-3xl overflow-hidden border border-purple-500 bg-white">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Button - Right */}
          <button
            onClick={handleNext}
            disabled={startIndex + 6 >= allMembers.length}
            className="flex-shrink-0 w-20 h-20 rounded-full bg-purple-900/30 border-2 border-purple-600 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:bg-purple-800/40 transition-all"
          >
            <ChevronRight size={36} className="text-purple-400" />
          </button>

          {/* Member Names List */}
          <div className="flex flex-col justify-between h-[560px] min-w-[280px] ml-8">
            {visibleMembers.map((member, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-2xl font-semibold">{member.name}</span>
                <span className="text-sm text-gray-400 mt-1">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
