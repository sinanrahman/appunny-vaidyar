import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate data here (zod on server side too, or simple check)
    if (!data.name || !data.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Since this is a placeholder without a real database or email service,
    // we just simulate a successful processing delay.
    // In a real application, you would integrate Resend, SendGrid, or a database here.
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Logging only safe non-sensitive data
    console.log(`Appointment request received from: ${data.name}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process appointment request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
