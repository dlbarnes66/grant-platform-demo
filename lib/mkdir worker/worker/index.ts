import { Worker } from "bullmq";
import { connection } from "../lib/redis";
import { prisma } from "../lib/prisma";

new Worker(
  "jobs",
  async job => {
    const { id } = job.data;

    // Update job to "processing"
    await prisma.job.update({
      where: { id },
      data: { status: "processing" }
    });

    // Simulate real work (replace with AI logic later)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mark job as completed
    await prisma.job.update({
      where: { id },
      data: {
        status: "completed",
        result: { message: "Job processed successfully" }
      }
    });

    return true;
  },
  { connection }
);
