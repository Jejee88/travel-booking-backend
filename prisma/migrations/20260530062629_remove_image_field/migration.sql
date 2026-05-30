/*
  Warnings:

  - You are about to drop the column `image` on the `destination` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `destination` DROP COLUMN `image`,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER';
