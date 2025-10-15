"use client";
import React, { useState } from "react";
import { Heart, Users, Sparkles, Target } from "lucide-react";

export default function CommunitySupportPage() {
  const [customAmount, setCustomAmount] = useState("");

  const highlights = [
    { icon: Heart, title: "Support Open Work" },
    { icon: Users, title: "Be Part of the Community" },
    { icon: Target, title: "Help Us Grow" },
    { icon: Sparkles, title: "Empower Future Builders" },
  ];

  const donationOptions = [100, 250, 500, 1000];

  const scrollToTop = () => {
    const topElement = document.getElementById("top");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="w-10 h-10 text-gray-700 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Our Open Community</h1>
          <p className="text-gray-600 mb-8">
            We build, learn, and share — together. Your contribution helps keep our work open and
            sustainable.
          </p>

          {/* Donation Buttons */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm max-w-md mx-auto">
            <p className="text-gray-800 font-medium mb-4">Choose a support amount</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {donationOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setCustomAmount(amount.toString())}
                  className="border border-gray-300 rounded py-2 font-medium text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  ₹{amount}
                </button>
              ))}
            </div>
            <div className="mb-4">
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Custom amount (₹)"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
              />
            </div>
            <button
              onClick={() => {
                alert("Under Development");
              }}
              className="w-full bg-gray-800 text-white py-2 rounded font-medium hover:bg-gray-900 transition-colors"
            >
              Contribute
            </button>
            <p className="text-xs text-gray-500 mt-2">
              All contributions go directly towards maintaining and improving our open initiatives.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {highlights.map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded p-4 text-center">
              <item.icon className="w-6 h-6 text-gray-700 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Message Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Your Support Matters</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our community thrives on openness, collaboration, and shared learning. By supporting us,
            you help sustain our tools, documentation, and outreach — all open for everyone.
          </p>
        </div>

        {/* Community Stats */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-2xl font-bold mb-1">1,000+</div>
              <div className="text-sm text-gray-300">Community Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">100%</div>
              <div className="text-sm text-gray-300">Open Source</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">∞</div>
              <div className="text-sm text-gray-300">Ideas & Contributions</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Join Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We don&apos;t sell. We build together. Whether through time, ideas, or small
            contributions — every bit makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={scrollToTop}
              className="bg-gray-800 text-white px-8 py-3 rounded font-medium hover:bg-gray-900 transition-colors"
            >
              Contribute
            </button>
            <button className="border border-gray-800 text-gray-800 px-8 py-3 rounded font-medium hover:bg-gray-100 transition-colors">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
