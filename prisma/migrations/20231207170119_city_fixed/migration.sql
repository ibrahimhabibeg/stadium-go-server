/*
  Warnings:

  - You are about to drop the column `nae` on the `City` table. All the data in the column will be lost.
  - Added the required column `name` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `City` DROP COLUMN `nae`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
