CREATE TABLE `admin` (
	`id` VARCHAR(255) NOT NULL UNIQUE,
	`name` VARCHAR(255),
	`email` VARCHAR(255),
	`image` VARCHAR(255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `projects` (
	`id` VARCHAR(255) NOT NULL UNIQUE,
	`title` VARCHAR(255),
	`description` VARBINARY(255),
	`image` VARCHAR(255),
	`demo` VARCHAR(255),
	`source` VARCHAR(255),
	`category` VARCHAR(255),
	`languages` VARCHAR(255),
	`user_created` VARCHAR(255),
	`date` VARCHAR(255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `category` (
	`id` VARCHAR(255) NOT NULL UNIQUE,
	`name` ENUM("backend", "frontend", "others"),
	PRIMARY KEY(`id`)
);

CREATE TABLE `languages` (
	`id` VARCHAR(255) NOT NULL UNIQUE,
	`name` VARCHAR(255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `blogs` (
	`id` VARCHAR(255) NOT NULL UNIQUE,
	`title` VARCHAR(255),
	`date` DATETIME,
	`excerpt` VARCHAR(255),
	`cover_image` VARCHAR(255),
	`content` VARCHAR(255),
	`user_created` VARCHAR(255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `project_language` (
	`id` VARCHAR(255) NOT NULL UNIQUE,
	`project_id` VARCHAR(255),
	`language_id` VARCHAR(255),
	PRIMARY KEY(`id`)
);

ALTER TABLE `projects`
ADD FOREIGN KEY(`category`) REFERENCES `category`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `blogs`
ADD FOREIGN KEY(`user_created`) REFERENCES `admin`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `projects`
ADD FOREIGN KEY(`user_created`) REFERENCES `admin`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `project_language`
ADD FOREIGN KEY(`project_id`) REFERENCES `projects`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `project_language`
ADD FOREIGN KEY(`language_id`) REFERENCES `languages`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;