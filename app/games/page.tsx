"use client";
import React, { useState } from "react";
import {
  ExternalLink,
  Play,
  Star,
  Users,
  Clock,
  Gamepad2,
  Zap,
} from "lucide-react";

import { CldImage } from "next-cloudinary";

const WebGamesShowcase = () => {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  const games = [
    {
      id: 1,
      title: "Wordle",
      description: "The viral daily word puzzle that took the world by storm",
      image: "2_eqmqwh",
      url: "https://www.nytimes.com/games/wordle/index.html",
      category: "Word Puzzle",
      players: "Solo",
      rating: 4.8,
      time: "5 min",
      color: "from-emerald-400 to-teal-600",
    },
    {
      id: 2,
      title: "Agar.io",
      description: "Eat or be eaten in this massive multiplayer cell game",
      image: "2_eqmqwh",
      url: "https://agar.io/",
      category: "Multiplayer",
      players: "Online",
      rating: 4.5,
      time: "15+ min",
      color: "from-blue-400 to-cyan-600",
    },
    {
      id: 3,
      title: "2048",
      description: "Slide numbered tiles to reach the elusive 2048 tile",
      image: "2_eqmqwh",
      url: "https://play2048.co/",
      category: "Logic Puzzle",
      players: "Solo",
      rating: 4.7,
      time: "10 min",
      color: "from-orange-400 to-red-500",
    },
    {
      id: 4,
      title: "Slither.io",
      description:
        "Grow your snake by consuming glowing orbs and other players",
      image: "2_eqmqwh",
      url: "http://slither.io/",
      category: "Action",
      players: "Multiplayer",
      rating: 4.6,
      time: "20+ min",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 5,
      title: "Tetris",
      description: "The timeless block-stacking puzzle that never gets old",
      image: "2_eqmqwh",
      url: "https://tetris.com/play-tetris",
      category: "Classic Puzzle",
      players: "Solo",
      rating: 4.9,
      time: "30+ min",
      color: "from-indigo-400 to-purple-600",
    },
    {
      id: 6,
      title: "Shell Shockers",
      description: "Egg-cellent first-person shooter mayhem in your browser",
      image: "2_eqmqwh",
      url: "https://shellshock.io/",
      category: "FPS",
      players: "Multiplayer",
      rating: 4.4,
      time: "25+ min",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  const handleGameClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-cyan-900/20" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000" />
      </div>

      <div className="relative z-10 px-6 py-12">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Gamepad2 className="w-16 h-16 text-white drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Epic Web
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Games
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Dive into the ultimate collection of browser games.
            <span className="text-violet-400 font-medium"> No downloads.</span>
            <span className="text-cyan-400 font-medium"> No waiting.</span>
            <span className="text-pink-400 font-medium"> Pure fun.</span>
          </p>

          <div className="flex justify-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                {games.length}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Epic Games
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ∞
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Hours of Fun
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Free to Play
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <div
                key={game.id}
                className="group relative"
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
                onClick={() => handleGameClick(game.url)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Main Card */}
                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800/50 hover:border-gray-700/80 transition-all duration-700 hover:shadow-2xl cursor-pointer group-hover:shadow-purple-500/10">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <CldImage
                      sizes="100vw"
                      aspectRatio="16:9"
                      crop="fill"
                      fill={true}
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span
                        className={`px-4 py-2 bg-gradient-to-r ${game.color} text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm`}
                      >
                        {game.category}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-6 right-6">
                      <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold text-sm">
                          {game.rating}
                        </span>
                      </div>
                    </div>

                    {/* Play Button */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-500 opacity-100 ${
                        hoveredGame === game.id ? " scale-75" : " scale-50"
                      }`}
                    >
                      <div className="bg-white/10 backdrop-blur-md rounded-full p-6 border border-white/20 shadow-2xl">
                        <Play className="w-12 h-12 text-white fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {game.title}
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {game.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {game.players}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {game.time}
                          </span>
                        </div>
                      </div>

                      <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-violet-400 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-pink-600/10 rounded-3xl" />
            <div className="relative">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready for Epic Gaming?
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                Click any game above to start your adventure instantly!
              </p>
              <div className="text-gray-400">
                <span className="inline-flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>All games open in new tabs</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebGamesShowcase;
