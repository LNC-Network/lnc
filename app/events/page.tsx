"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

export default function EventsPage() {
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [futureEvents, setFutureEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<
    "happening" | "happened" | "upcoming"
  >("happening");

  useEffect(() => {
    const now = new Date();
    const allEvents: Event[] = [
      {
        id: 1,
        title: "Hackathon 2025",
        date: new Date().toISOString(), // happening today
        description:
          "A 24-hour coding sprint where developers build innovative solutions.",
        imageUrl:
          "https://images.unsplash.com/photo-1559027615-5d5374c648f2?q=80&w=1200",
      },
      {
        id: 2,
        title: "Tech Conference 2024",
        date: "2024-06-12",
        description: "Annual gathering of developers, startups, and investors.",
        imageUrl:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
      },
      {
        id: 3,
        title: "AI Workshop",
        date: "2025-10-05",
        description: "Hands-on workshop exploring AI tools and applications.",
        imageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
      },
      {
        id: 4,
        title: "Developer Meetup",
        date: "2025-09-15",
        description:
          "Community meetup for software engineers to network and share knowledge.",
        imageUrl:
          "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200",
      },
    ];

    setCurrentEvents(
      allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === now.toDateString();
      })
    );

    setPastEvents(
      allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate < now && eventDate.toDateString() !== now.toDateString()
        );
      })
    );

    setFutureEvents(
      allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate > now;
      })
    );
  }, []);

  const renderEventCard = (event: Event) => (
    <div
      key={event.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
        <p className="text-sm text-gray-500">
          {format(new Date(event.date), "PPP")}
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
