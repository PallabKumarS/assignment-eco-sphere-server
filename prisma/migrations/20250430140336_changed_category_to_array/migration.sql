/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ideas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ideas" DROP CONSTRAINT "ideas_categoryId_fkey";

-- AlterTable
ALTER TABLE "ideas" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "_IdeaCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_IdeaCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_IdeaCategories_B_index" ON "_IdeaCategories"("B");

-- AddForeignKey
ALTER TABLE "_IdeaCategories" ADD CONSTRAINT "_IdeaCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdeaCategories" ADD CONSTRAINT "_IdeaCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "ideas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
