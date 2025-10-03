import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { emails } from "@/drizzle/schema";

export async function POST(req: Request) {
  const { email, ipAddress, userAgent } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await db.insert(emails).values({ email, ipAddress, userAgent });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "unexpected error please report to ..." }, { status: 500 });
  }
}
