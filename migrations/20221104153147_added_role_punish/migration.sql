-- AlterTable
ALTER TABLE `Punishments` MODIFY `owner` ENUM('ROLE', 'WARN', 'KICK', 'BAN') NOT NULL DEFAULT 'BAN',
    MODIFY `supporter` ENUM('ROLE', 'WARN', 'KICK', 'BAN') NOT NULL DEFAULT 'KICK',
    MODIFY `leaker` ENUM('ROLE', 'WARN', 'KICK', 'BAN') NOT NULL DEFAULT 'WARN',
    MODIFY `cheater` ENUM('ROLE', 'WARN', 'KICK', 'BAN') NOT NULL DEFAULT 'WARN',
    MODIFY `other` ENUM('ROLE', 'WARN', 'KICK', 'BAN') NOT NULL DEFAULT 'WARN';
