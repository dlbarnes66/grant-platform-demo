import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL);

const grantQueue = new Queue("grantQueue", { connection });

export async function POST(req) {
  try {
    const body = await req.json();

    const { keywords, location, category } = body;

    if (!keywords) {
      return new Response(
        JSON.stringify({ error: "Missing required field: keywords" }),
        { status: 400 }
      );
    }

    // Create job
    const job = await grantQueue.add("grantSearch", {
      keywords,
      location,
      category,
      createdAt: Date.now(),
    });

    return new Response(
      JSON.stringify({ jobId: job.id, status: "queued" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Job creation error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to create job" }),
      { status: 500 }
    );
  }
}
