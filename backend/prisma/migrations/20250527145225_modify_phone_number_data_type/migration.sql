/*
  Warnings:

  - You are about to alter the column `phone` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `phone` ON `User`(`phone`);
