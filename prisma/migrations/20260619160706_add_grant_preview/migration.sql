-- CreateTable
CREATE TABLE "GrantPreview" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "amount" TEXT,
    "deadline" TEXT,
    "category" TEXT,
    "url" TEXT,
    "score" DOUBLE PRECISION,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrantPreview_pkey" PRIMARY KEY ("id")
);
