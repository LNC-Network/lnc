/**
 * Node structure for the radial TreeNavbar.
 */
export type NavNode = {
  /** Display label for the node */
  label: string;
  /** URL to navigate to (if leaf node) */
  goto?: string;
  /** Whether clicking expands to show children */
  expandable?: boolean;
  /** Child nodes */
  children?: NavNode[];
  /** Optional icon key for the CrystalDock representation */
  icon?: string;
};

/**
 * Main Navigation Tree Data
 * Defines the hierarchical structure of the site's navigation.
 */
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
          goto: "https://linktr.ee/lnc_community",
        },
        {
          label: "Blog",
          goto: "https://linktr.ee/lnc_community",
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
          goto: "https://linktr.ee/lnc_community",
        },
        {
          label: "Twitter",
          goto: "https://x.com/LNC_Community",
        },
      ],
    },
  ],
};
