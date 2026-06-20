import 'dotenv/config';
import { Redis } from "ioredis";

console.log("REDIS_URL loaded in worker:", process.env.REDIS_URL);

export const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});
