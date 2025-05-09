-- AlterTable
ALTER TABLE "paid_purchases" ADD COLUMN     "bankStatus" TEXT,
ADD COLUMN     "invoiceNo" TEXT,
ADD COLUMN     "method" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "spCode" TEXT,
ADD COLUMN     "spMessage" TEXT;
