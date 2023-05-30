-- CreateTable
CREATE TABLE `Stadium` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `desc` VARCHAR(191) NULL,
    `size` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` INTEGER NOT NULL,
    `longitude` INTEGER NOT NULL,
    `stadiumId` INTEGER NOT NULL,

    UNIQUE INDEX `Location_stadiumId_key`(`stadiumId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stadium` ADD CONSTRAINT `Stadium_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_stadiumId_fkey` FOREIGN KEY (`stadiumId`) REFERENCES `Stadium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
