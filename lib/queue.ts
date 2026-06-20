import { Queue } from "bullmq";
import { connection } from "./redis";

export const jobQueue = new Queue("jobs", {
  connection,
  defaultJobOptions: {
    attempts: 5, // retry up to 5 times
    backoff: {
      type: "exponential",
      delay: 3000, // 3 seconds, then 6, then 12, etc.
    },
    removeOnComplete: true, // keep Redis clean
    removeOnFail: false, // keep failed jobs for debugging
  },
});
