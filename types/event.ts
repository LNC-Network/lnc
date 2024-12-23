interface Event {
    ID: string | undefined;
    Name: string | undefined;
    Prize: {
        first: number | undefined;
        second: number | undefined;
        third: number | undefined;
    };
    currency: "rupee" | "dollar" | undefined;
    sponsor: string | undefined;
}

export type { Event };
