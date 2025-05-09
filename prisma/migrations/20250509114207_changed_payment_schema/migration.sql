-- AlterTable
ALTER TABLE "paid_purchases" ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "invoiceNo" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3);
