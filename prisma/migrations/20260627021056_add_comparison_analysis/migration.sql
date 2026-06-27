-- AlterTable
ALTER TABLE "User" ADD COLUMN     "planName" TEXT,
ADD COLUMN     "renewalDate" TIMESTAMP(3),
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN     "status" TEXT,
ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateTable
CREATE TABLE "BillingLog" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BillingLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FederalGrant" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "agency" TEXT,
    "category" TEXT,
    "amount" DOUBLE PRECISION,
    "deadline" TIMESTAMP(3),
    "url" TEXT,
    "raw" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FederalGrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngestionLog" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "itemCount" INTEGER,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IngestionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FederalGrant_externalId_key" ON "FederalGrant"("externalId");
