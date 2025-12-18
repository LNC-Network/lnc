export type NavNode = {
  label: string;
  goto?: string;
  expandable?: boolean;
  children?: NavNode[];
  icon?: string;
};

export const NAV_TREE: NavNode = {
  label: "Navigation",
  children: [
    {
      label: "Home",
      goto: "/",
      icon: "home",
    },
    {
      label: "Sections",
      expandable: true,
      icon: "sections",
      children: [
        {
          label: "Real Voices",
          goto: "#real-voices", // Anchor assumption
        },
        {
          label: "Core Values",
          goto: "#core-values", // Anchor assumption
        },
        {
          label: "Newsletter",
          goto: "#newsletter", // Anchor assumption
        },
      ],
    },
    {
      label: "Resources",
      expandable: true,
      icon: "resources",
      children: [
        {
          label: "Docs",
          goto: "/docs",
        },
        {
          label: "Blog",
          goto: "/blog",
        },
      ],
    },
    {
      label: "Community",
      expandable: true,
      icon: "community",
      children: [
        {
          label: "Discord",
          goto: "https://discord.com",
        },
        {
          label: "Twitter",
          goto: "https://twitter.com",
        },
      ],
    },
  ],
};
