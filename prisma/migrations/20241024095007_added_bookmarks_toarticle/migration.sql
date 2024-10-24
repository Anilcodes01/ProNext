/*
  Warnings:

  - A unique constraint covering the columns `[articleId,userId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_postId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "articleId" TEXT,
ALTER COLUMN "postId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_articleId_userId_key" ON "Bookmark"("articleId", "userId");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
