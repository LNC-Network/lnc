import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('your-db-name');
        const collection = db.collection('your-collection-name');

        const data = await req.json();
        const result = await collection.insertOne(data);

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to insert data' });
    }
}

