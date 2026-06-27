-- AlterTable
ALTER TABLE "GrantComparison" ADD COLUMN     "analysis" JSONB,
ADD COLUMN     "name" TEXT DEFAULT 'Untitled Comparison',
ADD COLUMN     "sharedWith" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "ComparisonActivity" (
    "id" TEXT NOT NULL,
    "comparisonId" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComparisonActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonComment" (
    "id" TEXT NOT NULL,
    "comparisonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComparisonComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComparisonActivity" ADD CONSTRAINT "ComparisonActivity_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "GrantComparison"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonComment" ADD CONSTRAINT "ComparisonComment_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "GrantComparison"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonComment" ADD CONSTRAINT "ComparisonComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
