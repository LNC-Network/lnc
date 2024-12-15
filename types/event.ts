interface Event {
    ID: string | undefined;
    Name: string | undefined;
    Prize: {
        first: number | undefined;
        second: number | undefined;
        third: number | undefined;
    };
    currency: "rupee" | "dollar" | undefined;
    sponcer: string | undefined;
}

export type { Event };
