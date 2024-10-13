import { NextResponse } from 'next/server';

export async function GET() {
    console.log("page loaded");

    return NextResponse.redirect(new URL('/app/page', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
}

export async function POST() {
    // Placeholder for future POST handling
    return NextResponse.json({ message: 'POST not implemented yet' }, { status: 501 });
}
