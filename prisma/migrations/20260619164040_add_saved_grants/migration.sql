-- CreateTable
CREATE TABLE "SavedGrant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "grantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedGrant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedGrant" ADD CONSTRAINT "SavedGrant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedGrant" ADD CONSTRAINT "SavedGrant_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "GrantPreview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
