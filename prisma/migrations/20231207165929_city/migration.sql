/*
  Warnings:

  - Added the required column `cityId` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Stadium` ADD COLUMN `cityId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nae` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stadium` ADD CONSTRAINT `Stadium_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
