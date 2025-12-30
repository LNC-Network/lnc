/**
 * Interface representing a project in the ecosystem.
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  /** Markdown content for the project modal */
  readme: string;
  tags: string[];
  /** Project icon/emoji displayed in card header */
  icon?: string;
  /** Project category label */
  category?: string;
  /** Technologies/frameworks used */
  technologies?: string[];
  /** Primary programming language */
  language?: string;
  /** GitHub stars count */
  stars?: number;
  /** GitHub forks count */
  forks?: number;
  /** GitHub repository or project link */
  link?: string;
}

/**
 * Mock Data: Projects
 * Used in CallToAction (Featured) and ProjectsPage (All).
 */
export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "LNC Network",
    description:
      "A decentralized infrastructure for the next generation of web applications.",
    readme: `# LNC Network

The LNC Network is a groundbreaking protocol designed to decentralize web infrastructure.

## Features
- Decentralized storage
- Edge computing
- High availability

## Getting Started
\`\`\`bash
npm install @lnc/core
\`\`\`
`,
    tags: ["Blockchain", "Infrastructure"],
    image: "/cta_builder.png",
    icon: "🌐",
    category: "Infrastructure",
    technologies: ["Blockchain", "P2P", "IPFS", "WebRTC"],
    language: "Rust",
    stars: 1247,
    forks: 89,
    link: "https://github.com/LNC-Network/core",
  },
  {
    id: "2",
    name: "Pixel UI",
    description: "A retro-futuristic component library for modern builds.",
    readme: `# Pixel UI

A component library that brings the nostalgia of 8-bit era to the modern web.

## Components
- Buttons
- Cards
- Modals

## Usage
\`\`\`tsx
import { PixelButton } from 'pixel-ui';

<PixelButton>Click Me</PixelButton>
\`\`\`
`,
    tags: ["UI Library", "React", "Tailwind"],
    icon: "🎨",
    category: "UI Library",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
    language: "TypeScript",
    stars: 856,
    forks: 124,
    link: "https://github.com/LNC-Network/pixel-ui",
  },
  {
    id: "3",
    name: "Quant OS",
    description: "Operating system layer for quantum processors.",
    readme: `# Quant OS

The first general-purpose OS for quantum computers.

## Architecture
- Qubit scheduling
- Error correction

## Status
Experimental
`,
    tags: ["OS", "Quantum", "Systems"],
    icon: "⚛️",
    category: "Operating System",
    technologies: ["Quantum Computing", "C++", "Assembly", "LLVM"],
    language: "C++",
    stars: 423,
    forks: 37,
    link: "https://github.com/LNC-Network/quant-os",
  },
];
