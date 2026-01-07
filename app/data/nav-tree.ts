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
    { label: "Home", goto: "/", icon: "home" },
    {
      label: "Sections",
      expandable: true,
      icon: "sections",
      children: [
        { label: "Real Voices", goto: "#real-voices" },
        { label: "Core Values", goto: "#core-values" },
        { label: "Newsletter", goto: "#newsletter" },
      ],
    },
    {
      label: "Resources",
      expandable: true,
      icon: "resources",
      children: [
        { label: "Docs", goto: "https://linktr.ee/lnc_community" },
        { label: "Blog", goto: "https://linktr.ee/lnc_community" },
      ],
    },
    {
      label: "Community",
      expandable: true,
      icon: "community",
      children: [
        { label: "Discord", goto: "https://linktr.ee/lnc_community" },
        { label: "Twitter", goto: "https://x.com/LNC_Community" },
      ],
    },
  ],
};
