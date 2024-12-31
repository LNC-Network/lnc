import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB_NAME as string);
        const footerCollection = db.collection(
            process.env.FOOTER_COLLECTION_NAME as string
        );

        const data = await req.json();
        const result = await footerCollection.insertOne(data);

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
