import { Queue } from "bullmq";
import { connection } from "./redis";

export const jobQueue = new Queue("jobs", {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
