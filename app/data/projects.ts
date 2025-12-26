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
}

/**
 * Mock Data: Projects
 * Used in CallToAction (Featured) and ProjectsPage (All).
 */
export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "LNC Network",
    description: "A decentralized infrastructure for the next generation of web applications.",
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
    image: "/cta_builder.png"
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
  }
];
