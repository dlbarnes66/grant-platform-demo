"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // ⭐ Load .env FIRST
const prisma_ts_1 = require("../lib/prisma.ts"); // ⭐ ESM requires .ts extension
const openai_1 = __importDefault(require("openai"));
const client = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY, // ⭐ Now correctly loaded
});
async function processJob(job) {
    await prisma_ts_1.prisma.job.update({
        where: { id: job.id },
        data: { status: "processing" },
    });
    await prisma_ts_1.prisma.jobLog.create({
        data: {
            jobId: job.id,
            message: "Job started",
        },
    });
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a grant analysis engine." },
            { role: "user", content: job.text },
        ],
    });
    const output = response.choices[0].message.content;
    await prisma_ts_1.prisma.jobResult.create({
        data: {
            jobId: job.id,
            result: { output },
        },
    });
    await prisma_ts_1.prisma.job.update({
        where: { id: job.id },
        data: { status: "completed" },
    });
    await prisma_ts_1.prisma.jobLog.create({
        data: {
            jobId: job.id,
            message: "Job completed successfully",
        },
    });
}
async function runWorker() {
    console.log("Worker started…");
    while (true) {
        const job = await prisma_ts_1.prisma.job.findFirst({
            where: { status: "queued" },
        });
        if (job) {
            await processJob(job);
        }
        await new Promise((r) => setTimeout(r, 1000));
    }
}
runWorker();
