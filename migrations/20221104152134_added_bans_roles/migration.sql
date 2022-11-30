-- CreateTable
CREATE TABLE `Bans` (
    `id` VARCHAR(32) NOT NULL,
    `guild` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` VARCHAR(32) NOT NULL,
    `roles` LONGTEXT NOT NULL,
    `guild` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bans` ADD CONSTRAINT `Bans_guild_fkey` FOREIGN KEY (`guild`) REFERENCES `Guild`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Roles` ADD CONSTRAINT `Roles_guild_fkey` FOREIGN KEY (`guild`) REFERENCES `Guild`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;