import pkg from "bullmq";
const { Worker, QueueScheduler } = pkg;

import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL);

// Ensures jobs are processed even if worker restarts
new QueueScheduler("grantQueue", { connection });

console.log("Worker started. Listening for grantSearch jobs...");

const worker = new Worker(
  "grantQueue",
  async (job) => {
    console.log("Processing job:", job.id);

    if (job.name === "grantSearch") {
      const { keywords, location, category } = job.data;

      // Simulated grant search logic
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const results = [
        {
          title: "Community Impact Grant",
          amount: "$10,000",
          deadline: "2025-12-01",
          match: `${keywords} - ${location}`,
        },
        {
          title: "Innovation Support Fund",
          amount: "$25,000",
          deadline: "2025-11-15",
          match: `${keywords} - ${category}`,
        },
      ];

      return { results };
    }

    return { message: "Unknown job type" };
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});
