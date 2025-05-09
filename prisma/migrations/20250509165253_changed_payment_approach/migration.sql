-- DropForeignKey
ALTER TABLE "paid_purchases" DROP CONSTRAINT "paid_purchases_userId_fkey";

-- AlterTable
ALTER TABLE "paid_purchases" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "paid_purchases" ADD CONSTRAINT "paid_purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
