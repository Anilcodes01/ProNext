/*
  Warnings:

  - You are about to drop the column `ProfilePageImag` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ProfilePageImag",
ADD COLUMN     "ProfilePageImage" TEXT;
