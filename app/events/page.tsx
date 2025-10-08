"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";

interface events {
  id: number;
  title: string;
  event_date: string;
  description: string;
  image_url: string;
  event_page_url: string;
}

export default function EventsPage() {
  const [currentEvents, setCurrentEvents] = useState<events[]>([]);
  const [pastEvents, setPastEvents] = useState<events[]>([]);
  const [futureEvents, setFutureEvents] = useState<events[]>([]);

  const [activeTab, setActiveTab] = useState<
    "happening" | "happened" | "upcoming"
  >("happening");

  useEffect(() => {
    const fetchEvents = async () => {
      const now = new Date();

      const res = await fetch("/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const events: events[] = await res.json();

      setCurrentEvents(
        events.filter((event) => {
          const eventDate = new Date(event.event_date);
          return eventDate.toDateString() === now.toDateString();
        }),
      );

      setPastEvents(
        events.filter((event) => {
          const eventDate = new Date(event.event_date);
          return (
            eventDate < now && eventDate.toDateString() !== now.toDateString()
          );
        }),
      );

      setFutureEvents(
        events.filter((event) => {
          const eventDate = new Date(event.event_date);
          return eventDate > now;
        }),
      );
    };

    fetchEvents();
  }, []);

  const renderEventCard = (event: events) => (
    <div
      key={event.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      onClick={() => (window.location.href = event.event_page_url)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
        <p className="text-sm text-gray-500">
          {format(new Date(event.event_date), "PPP")}
        </p>
        <p className="mt-3 text-gray-700">{event.description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
          Events
        </h1>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("happening")}
            className={`px-5 py-2 rounded-full font-medium ${
              activeTab === "happening"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Happening Now
          </button>
          <button
            onClick={() => setActiveTab("happened")}
            className={`px-5 py-2 rounded-full font-medium ${
              activeTab === "happened"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Past Events
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-5 py-2 rounded-full font-medium ${
              activeTab === "upcoming"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Upcoming Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === "happening" && currentEvents.map(renderEventCard)}
          {activeTab === "happened" && pastEvents.map(renderEventCard)}
          {activeTab === "upcoming" && futureEvents.map(renderEventCard)}
        </div>
      </div>
    </div>
  );
}
