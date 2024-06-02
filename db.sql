-- MySQL Script generated by MySQL Workbench
-- Sun Jun  2 02:30:41 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `portfolio` ;

-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `portfolio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `portfolio` ;

-- -----------------------------------------------------
-- Table `portfolio`.`admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portfolio`.`admin` ;

CREATE TABLE IF NOT EXISTS `portfolio`.`admin` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `portfolio`.`blogs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portfolio`.`blogs` ;

CREATE TABLE IF NOT EXISTS `portfolio`.`blogs` (
  `id` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `excerpt` VARCHAR(255) NULL DEFAULT NULL,
  `cover_image` VARCHAR(255) NULL DEFAULT NULL,
  `content` LONGTEXT NULL DEFAULT NULL,
  `user_created` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  INDEX `user_created` (`user_created` ASC) VISIBLE,
  CONSTRAINT `blogs_ibfk_1`
    FOREIGN KEY (`user_created`)
    REFERENCES `portfolio`.`admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `portfolio`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portfolio`.`category` ;

CREATE TABLE IF NOT EXISTS `portfolio`.`category` (
  `id` VARCHAR(255) NOT NULL,
  `name` ENUM('backend', 'frontend', 'others') NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `portfolio`.`languages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portfolio`.`languages` ;

CREATE TABLE IF NOT EXISTS `portfolio`.`languages` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `portfolio`.`projects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portfolio`.`projects` ;

CREATE TABLE IF NOT EXISTS `portfolio`.`projects` (
  `id` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `demo` VARCHAR(255) NULL DEFAULT NULL,
  `source` VARCHAR(255) NULL DEFAULT NULL,
  `category` VARCHAR(255) NULL DEFAULT NULL,
  `user_created` VARCHAR(255) NULL DEFAULT NULL,
  `date` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  INDEX `category` (`category` ASC) VISIBLE,
  INDEX `user_created` (`user_created` ASC) VISIBLE,
  CONSTRAINT `projects_ibfk_1`
    FOREIGN KEY (`category`)
    REFERENCES `portfolio`.`category` (`id`),
  CONSTRAINT `projects_ibfk_2`
    FOREIGN KEY (`user_created`)
    REFERENCES `portfolio`.`admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `portfolio`.`project_language`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portfolio`.`project_language` ;

CREATE TABLE IF NOT EXISTS `portfolio`.`project_language` (
  `id` VARCHAR(255) NOT NULL,
  `project_id` VARCHAR(255) NULL DEFAULT NULL,
  `language_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  INDEX `project_id` (`project_id` ASC) VISIBLE,
  INDEX `language_id` (`language_id` ASC) VISIBLE,
  CONSTRAINT `project_language_ibfk_1`
    FOREIGN KEY (`project_id`)
    REFERENCES `portfolio`.`projects` (`id`),
  CONSTRAINT `project_language_ibfk_2`
    FOREIGN KEY (`language_id`)
    REFERENCES `portfolio`.`languages` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `portfolio`.`admin` (`id`, `name`, `email`, `image`) 
VALUES ('8beedc7b-fde8-4ff0-8241-3bb48219c572', 'dannguyenmessi1705', 'dannd.b20vt086@stu.ptit.edu.vn', 'https://avatars.githubusercontent.com/u/79917180?v=4');
