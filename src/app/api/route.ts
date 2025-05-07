import { NextRequest, NextResponse } from "next/server";
import { generateAutocomplete } from "@/lib/autocomplete";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  
  if (!prompt) {
    return NextResponse.json({ completion: "Missing prompt" }, { status: 400 });
  }

  try {
    const completion = await generateAutocomplete(prompt);

    return NextResponse.json({ completion }, { status: 200 });
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
