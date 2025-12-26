/**
 * Supported categories for events.
 */
export type EventCategory = "Hackathon" | "Workshop" | "Social" | "Conference";

/**
 * Interface representing a community event.
 */
export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  category: EventCategory;
}

/**
 * Mock Data: Community Events
 * Used in EventsTimeline and EventsPage.
 */
export const EVENTS: Event[] = [
  {
    id: 1,
    title: "Hack The Future",
    date: "Dec 24, 2024",
    location: "Global Online",
    description: "A 48-hour global hackathon focused on building decentralized solutions for the future of the web.",
    category: "Hackathon",
  },
  {
    id: 2,
    title: "Pixel Art Workshop",
    date: "Jan 10, 2025",
    location: "Discord Stage",
    description: "Learn the fundamentals of pixel art design from industry experts and community masters.",
    category: "Workshop",
  },
  {
    id: 3,
    title: "Community Townhall",
    date: "Jan 15, 2025",
    location: "Twitter Space",
    description: "Open floor discussion on the roadmap, governance proposals, and community grants.",
    category: "Social",
  },
  {
    id: 4,
    title: "Web3 Summit 2025",
    date: "Feb 05, 2025",
    location: "Metaverse",
    description: "The biggest gathering of Web3 developers, featuring keynotes from industry leaders.",
    category: "Conference",
  },
  {
    id: 5,
    title: "Rust for Beginners",
    date: "Feb 12, 2025",
    location: "Discord Stage",
    description: "A comprehensive intro to Rust programming language for smart contract development.",
    category: "Workshop",
  },
  {
    id: 6,
    title: "LNC Game Night",
    date: "Feb 20, 2025",
    location: "Discord Voice",
    description: "Chill vibes, multiplayer games, and networking with the community.",
    category: "Social",
  },
];
