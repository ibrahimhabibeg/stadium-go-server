-- DropForeignKey
ALTER TABLE `Stadium` DROP FOREIGN KEY `Stadium_cityId_fkey`;

-- AlterTable
ALTER TABLE `Stadium` MODIFY `cityId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Stadium` ADD CONSTRAINT `Stadium_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
