import { NextResponse } from "next/server";
import { firecrawl } from "@/lib/firecrawl";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received body:", body);

    const url = body?.url;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing URL", received: body },
        { status: 400 }
      );
    }

    const result = await firecrawl.scrapeUrl(url);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Crawl error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
