/*
  Warnings:

  - You are about to drop the column `bankStatus` on the `paid_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceNo` on the `paid_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `paid_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `paid_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `spCode` on the `paid_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `spMessage` on the `paid_purchases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "paid_purchases" DROP COLUMN "bankStatus",
DROP COLUMN "invoiceNo",
DROP COLUMN "method",
DROP COLUMN "paidAt",
DROP COLUMN "spCode",
DROP COLUMN "spMessage";
