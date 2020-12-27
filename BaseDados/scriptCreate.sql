CREATE TABLE `User` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Username` VARCHAR(80),
  `Name` VARCHAR(150),
  `Email` VARCHAR(100),
  `Password` VARCHAR(300),
  `BirthDate` DATE,
  `Genre` INT
);

CREATE TABLE `Category` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Category` VARCHAR(150)
);

CREATE TABLE `Permission` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Description` VARCHAR(150)
);

CREATE TABLE `Page` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Name` VARCHAR(150),
  `Description` TEXT,
  `CategoryId` INT,
  `UserId` INT,
  `Followers` INT
);

CREATE TABLE `Post` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Title` VARCHAR(150),
  `Description` TEXT,
  `Date` DATETIME,
  `UserId` INT,
  `PageId` INT
);

CREATE TABLE `Comment` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Text` TEXT,
  `Date` DATETIME,
  `CommentId` INT,
  `UserId` INT,
  `PostId` INT
);

CREATE TABLE `PagePermissions` (
  `UserId` INT,
  `PageId` INT,
  `PermissionId` INT,
  PRIMARY KEY(UserId, PageId)
);

CREATE TABLE `PageFollows` (
  `UserId` INT,
  `PageId` INT,
  PRIMARY KEY(UserId, PageId)
);

ALTER TABLE `Page` ADD FOREIGN KEY (`CategoryId`) REFERENCES `Category` (`Id`);

ALTER TABLE `Page` ADD FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

ALTER TABLE `Post` ADD FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

ALTER TABLE `Post` ADD FOREIGN KEY (`PageId`) REFERENCES `Page` (`Id`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`CommentId`) REFERENCES `Comment` (`Id`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

ALTER TABLE `Comment` ADD FOREIGN KEY (`PostId`) REFERENCES `Post` (`Id`);

ALTER TABLE `PagePermissions` ADD FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

ALTER TABLE `PagePermissions` ADD FOREIGN KEY (`PageId`) REFERENCES `Page` (`Id`);

ALTER TABLE `PagePermissions` ADD FOREIGN KEY (`PermissionId`) REFERENCES `Permission` (`Id`);

ALTER TABLE `PageFollows` ADD FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);

ALTER TABLE `PageFollows` ADD FOREIGN KEY (`PageId`) REFERENCES `Page` (`Id`);