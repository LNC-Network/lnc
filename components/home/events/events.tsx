"use client";

import React, { useEffect, useState } from "react";

import EventsCarousel, { EventItem } from "./EventsCarousel";

const Events: React.FC = () => {
  const [eventsData, setEventsData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/Data/events.json");
        const data = await response.json();
        setEventsData(data.events);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <section
      id="events"
      className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden p-4 sm:p-8 lg:p-24"
      style={{ backgroundColor: "rgb(14,14,14)" }}
    >
      {/* Background Pattern for Visual Interest */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(14,14,14,0.8)_100%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-full lg:max-w-7xl mx-auto px-2 sm:px-6 py-8 sm:py-12 flex flex-col justify-center min-h-screen">
        {/* Section Header */}
        <div className="text-left mb-8 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white sm:mb-4 tracking-tight">
            Events and News
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="flex-1 flex items-center justify-center">
          <EventsCarousel
            events={eventsData}
            autoPlay={true}
            autoPlayInterval={5000}
            className="w-full"
            showArrows={true}
            showIndicators={true}
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-16">
          <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
            <span>View All Events</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;