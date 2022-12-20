-- DropForeignKey
ALTER TABLE `BadServers` DROP FOREIGN KEY `BadServers_addedBy_fkey`;

-- DropForeignKey
ALTER TABLE `Bans` DROP FOREIGN KEY `Bans_guild_fkey`;

-- DropForeignKey
ALTER TABLE `Logs` DROP FOREIGN KEY `Logs_executedBy_fkey`;

-- DropForeignKey
ALTER TABLE `Notes` DROP FOREIGN KEY `Notes_id_fkey`;

-- DropForeignKey
ALTER TABLE `Punishments` DROP FOREIGN KEY `Punishments_id_fkey`;

-- DropForeignKey
ALTER TABLE `Roles` DROP FOREIGN KEY `Roles_guild_fkey`;

-- AlterTable
ALTER TABLE `BadServers` ADD COLUMN `reason` VARCHAR(191) NOT NULL DEFAULT 'None provided';

-- AlterTable
ALTER TABLE `Imports` ADD COLUMN `reason` VARCHAR(256) NOT NULL DEFAULT 'Not Specified';

-- AlterTable
ALTER TABLE `Logs` MODIFY `executedBy` VARCHAR(32) NOT NULL;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_id_fkey` FOREIGN KEY (`id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BadServers` ADD CONSTRAINT `BadServers_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `Staff`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Punishments` ADD CONSTRAINT `Punishments_id_fkey` FOREIGN KEY (`id`) REFERENCES `Guild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bans` ADD CONSTRAINT `Bans_guild_fkey` FOREIGN KEY (`guild`) REFERENCES `Guild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Roles` ADD CONSTRAINT `Roles_guild_fkey` FOREIGN KEY (`guild`) REFERENCES `Guild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Logs` ADD CONSTRAINT `Logs_executedBy_fkey` FOREIGN KEY (`executedBy`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
