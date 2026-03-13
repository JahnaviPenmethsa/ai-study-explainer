import { NextRequest, NextResponse } from "next/server";
import { generateExplanation } from "@/lib/aiClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic } = body;

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a topic to continue." },
        { status: 400 }
      );
    }

    if (topic.trim().length > 200) {
      return NextResponse.json(
        { error: "Topic is too long. Please keep it under 200 characters." },
        { status: 400 }
      );
    }

    const explanation = await generateExplanation(topic.trim());

    return NextResponse.json({ explanation });
  } catch (error: unknown) {
    console.error("Explain API error:", error);

    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return NextResponse.json(
      { error: `Failed to generate explanation: ${message}` },
      { status: 500 }
    );
  }
}
