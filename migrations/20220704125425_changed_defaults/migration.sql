-- AlterTable
ALTER TABLE `punishments` MODIFY `leaker` ENUM('WARN', 'KICK', 'BAN') NOT NULL DEFAULT 'WARN',
    MODIFY `cheater` ENUM('WARN', 'KICK', 'BAN') NOT NULL DEFAULT 'WARN';
