import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export const dynamic = 'force-dynamic';

export async function GET() {
  const { GOOGLE_MAPS_API_KEY, GOOGLE_PLACE_ID } = env;

  if (!GOOGLE_MAPS_API_KEY || !GOOGLE_PLACE_ID) {
    return NextResponse.json({ error: "Missing Google API credentials" }, { status: 500 });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`;
    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate: 3600 }, // revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch Google Reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
