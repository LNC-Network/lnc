interface Event {
    ID: string | undefined;
    Name: string | undefined;
    Prize: {
        first?: number | string;
        second?: number | string;
        third?: number | string;
    };
    currency: "rupee" | "dollar" | undefined;
    sponsor: string | undefined;
}

export type { Event };
