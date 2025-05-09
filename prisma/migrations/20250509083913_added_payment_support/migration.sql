/*
  Warnings:

  - Added the required column `bankStatus` to the `paid_purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTime` to the `paid_purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `paid_purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `paid_purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentUrl` to the `paid_purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spCode` to the `paid_purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spMessage` to the `paid_purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionStatus` to the `paid_purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paid_purchases" ADD COLUMN     "bankStatus" TEXT NOT NULL,
ADD COLUMN     "dateTime" TEXT NOT NULL,
ADD COLUMN     "method" TEXT NOT NULL,
ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "paymentUrl" TEXT NOT NULL,
ADD COLUMN     "spCode" TEXT NOT NULL,
ADD COLUMN     "spMessage" TEXT NOT NULL,
ADD COLUMN     "transactionStatus" TEXT NOT NULL;
