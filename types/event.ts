interface Event {
  ID: string | undefined;
  Name: string | undefined;
  Prize: {
    first: number | "Coming Soon";
    second: number | "Coming Soon";
    third: number | "Coming Soon";
  };
  currency: "rupee" | "dollar" | undefined;
  sponsor: string | undefined;
}

export type { Event };
