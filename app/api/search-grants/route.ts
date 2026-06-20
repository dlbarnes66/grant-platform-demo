import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  // Fetch embeddings from DB
  const pages = await prisma.grantPage.findMany({
    include: { embeddings: true },
  });

  // Convert query to embedding
  const embeddingRes = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });

  const queryVector = embeddingRes.data[0].embedding;

  // Compute cosine similarity manually
  function cosine(a: number[], b: number[]) {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  // Score each page
  const scored = pages
    .map((p) => ({
      ...p,
      score: cosine(queryVector, p.embeddings[0]?.vector || []),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  // Summarize each page into structured preview
  const previews = [];

  for (const page of scored) {
    const summary = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Summarize this grant page into structured JSON with fields: title, summary, amount, deadline, category.",
        },
        {
          role: "user",
          content: page.content || "",
        },
      ],
      response_format: { type: "json_object" },
    });

    const parsed = JSON.parse(summary.choices[0].message.content);

    previews.push({
      title: parsed.title || page.title || "Untitled Grant",
      summary: parsed.summary || "No summary available.",
      amount: parsed.amount || "Unknown",
      deadline: parsed.deadline || "Unknown",
      category: parsed.category || "General",
      url: page.url,
      score: page.score,
    });
  }

  return NextResponse.json({ results: previews });
}
