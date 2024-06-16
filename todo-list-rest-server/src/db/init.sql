CREATE TABLE `user_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;


CREATE TABLE `todo_task` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tasks_user` (`user_id`),
  CONSTRAINT `fk_tasks_user` FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;