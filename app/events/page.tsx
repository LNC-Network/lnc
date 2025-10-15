"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface Event {
  id: number;
  title: string;
  event_date: string;
  description: string;
  image_url: string;
  event_page_url: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data: Event[] = await res.json();

        // Sort so NEWEST comes FIRST
        const sorted = data.sort(
          (a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime(),
        );
        setEvents(sorted);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const now = new Date();

  const renderCard = (event: Event) => {
    const eventDate = new Date(event.event_date);
    const isPast = eventDate < now && eventDate.toDateString() !== now.toDateString();
    const isToday = eventDate.toDateString() === now.toDateString();

    return (
      <motion.div
        key={event.id}
        layout
        whileHover={{ scale: 1.02 }}
        className={`rounded-xl shadow-md overflow-hidden transition-all cursor-pointer border ${
          isPast
            ? "bg-gray-100 opacity-60 border-gray-200 hover:opacity-80"
            : "bg-white hover:shadow-lg border-gray-100"
        }`}
        onClick={() => (window.location.href = event.event_page_url)}
      >
        <div className="relative h-48 w-full">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className={`object-cover transition-all ${isPast ? "grayscale" : ""}`}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {event.title}
            {isToday && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Today
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500">{format(eventDate, "PPP")}</p>
          <p className="mt-2 text-gray-700 line-clamp-3">{event.description}</p>
        </div>
      </motion.div>
    );
  };

  const renderSkeleton = (n: number) =>
    Array.from({ length: n }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
        <Skeleton className="h-48 w-full" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    ));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-11/12 mx-auto px-4 py-12">
        <div className="flex justify-between items-center pb-6 lg:pb-12 ">
          <h1 className="text-5xl lg:text-6xl font-light text-center text-gray-900">Events</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? renderSkeleton(6) : events.map(renderCard)}
        </div>
      </div>
    </div>
  );
}
