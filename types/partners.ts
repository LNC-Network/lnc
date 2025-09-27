// components/home/partners/types.ts
export interface Partner {
  id: string;
  name: string;
  logo: string;
  shortName: string;
  website?: string;
  category?: "technology" | "strategic" | "integration" | "channel";
}

export interface PartnersCarouselProps {
  partners: Partner[];
  speed?: number;
  cardWidth?: number;
  gap?: number;
  autoPlay?: boolean;
  pauseOnHover?: boolean;
}
