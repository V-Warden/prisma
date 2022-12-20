-- AlterTable
ALTER TABLE `Punishments` MODIFY `leaker` ENUM('WARN', 'KICK', 'BAN') NOT NULL DEFAULT 'WARN',
    MODIFY `cheater` ENUM('WARN', 'KICK', 'BAN') NOT NULL DEFAULT 'WARN';
