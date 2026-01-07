export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  readme: string;
  tags: string[];
  icon?: string;
  category?: string;
  technologies?: string[];
  language?: string;
  stars?: number;
  forks?: number;
  link?: string;
}
export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "LNC Network",
    description:
      "A decentralized infrastructure for the next generation of web applications.",
    readme: `# LNC Network\n\nThe LNC Network is a groundbreaking protocol designed to decentralize web infrastructure.\n\n## Features\n- Decentralized storage\n- Edge computing\n- High availability\n\n## Getting Started\n\`\`\`bash\nnpm install @lnc/core\n\`\`\`\n`,
    tags: ["Blockchain", "Infrastructure"],
    image: "/assets/images/cta_builder.png",
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
    readme: `# Pixel UI\n\nA component library that brings the nostalgia of 8-bit era to the modern web.\n\n## Components\n- Buttons\n- Cards\n- Modals\n\n## Usage\n\`\`\`tsx\nimport { PixelButton } from 'pixel-ui';\n\n<PixelButton>Click Me</PixelButton>\n\`\`\`\n`,
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
    readme: `# Quant OS\n\nThe first general-purpose OS for quantum computers.\n\n## Architecture\n- Qubit scheduling\n- Error correction\n\n## Status\nExperimental\n`,
    tags: ["OS", "Quantum", "Systems"],
    icon: "⚛️",
    category: "Operating System",
    technologies: ["Quantum Computing", "C++", "Assembly", "LLVM"],
    language: "C++",
    stars: 423,
    forks: 37,
    link: "https://github.com/LNC-Network/quant-os",
  },
  {
    id: "4",
    name: "Aether Protocol",
    description: "Multi-chain DeFi aggregator with zero-slippage swaps.",
    readme: `# Aether Protocol`,
    tags: ["DeFi", "Blockchain", "Finance"],
    icon: "💸",
    category: "DeFi",
    technologies: ["Solidity", "Go", "React"],
    language: "Go",
    stars: 2105,
    forks: 342,
    link: "https://github.com/LNC-Network/aether-protocol",
  },
  {
    id: "5",
    name: "Nebula ID",
    description: "Self-sovereign identity solution for the metaverse.",
    readme: `# Nebula ID`,
    tags: ["Identity", "Security", "Web3"],
    icon: "🆔",
    category: "Identity",
    technologies: ["Rust", "WASM", "DID"],
    language: "Rust",
    stars: 876,
    forks: 112,
    link: "https://github.com/LNC-Network/nebula-id",
  },
  {
    id: "6",
    name: "Void Storage",
    description: "Quantum-resistant encrypted cloud storage network.",
    readme: `# Void Storage`,
    tags: ["Storage", "Privacy", "Security"],
    icon: "☁️",
    category: "Infrastructure",
    technologies: ["Go", "IPFS", "AES-256"],
    language: "Go",
    stars: 1543,
    forks: 231,
    link: "https://github.com/LNC-Network/void-storage",
  },
];
