-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(255) NULL;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `phone` TO `User_phone_key`;
