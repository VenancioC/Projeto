CREATE TABLE `User` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Username` VARCHAR(80) UNIQUE NOT NULL,
  `Name` VARCHAR(150) NOT NULL,
  `Email` VARCHAR(100) UNIQUE NOT NULL,
  `Password` VARCHAR(300) NOT NULL,
  `BirthDate` DATE,
  `Genre` INT
);

CREATE TABLE `Category` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Category` VARCHAR(150) UNIQUE NOT NULL 
);

CREATE TABLE `Permission` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Description` VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE `Page` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Name` VARCHAR(150) NOT NULL,
  `Description` TEXT,
  `CategoryId` INT,
  `UserId` INT NOT NULL,
  `Followers` INT DEFAULT 0
);

CREATE TABLE `Post` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Title` VARCHAR(150) NOT NULL,
  `Description` TEXT,
  `Date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `UserId` INT NOT NULL,
  `PageId` INT NOT NULL,
  `Likes` INT NOT NULL DEFAULT 0,
  `Comments` INT NOT NULL DEFAULT 0
);

CREATE TABLE `Comment` (
  `Id` INT PRIMARY KEY AUTO_INCREMENT,
  `Text` TEXT NOT NULL,
  `Date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `CommentId` INT,
  `UserId` INT NOT NULL,
  `PostId` INT NOT NULL
);

CREATE TABLE `PagePermissions` (
  `UserId` INT NOT NULL,
  `PageId` INT NOT NULL,
  `PermissionId` INT NOT NULL,
  PRIMARY KEY(UserId, PageId)
);

CREATE TABLE `PageFollows` (
  `UserId` INT NOT NULL,
  `PageId` INT NOT NULL,
  PRIMARY KEY(UserId, PageId)
);

CREATE TABLE `PostLikes` (
  `PostId` INT NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY(PostId, UserId)
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

ALTER TABLE `PostLikes` ADD FOREIGN KEY (`PostId`) REFERENCES `Post` (`Id`);

ALTER TABLE `PostLikes` ADD FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`);
