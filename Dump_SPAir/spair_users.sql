-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: spair
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(15) DEFAULT NULL,
  `profile_pic_url` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hash` text,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John2','John@gmail.com','98729821','random123','Customer','http://localhost:3000/image/219-2190847_slenderman-transparent.jpg','2022-06-26 06:31:33',NULL),(3,'John Adam ','John2@gmail.com','98729823','random123','Customer','www.test.com','2022-06-26 06:31:51',NULL),(4,'John Will','JohnW@gmail.com','98729823','random121','Customer','www.test.com','2022-06-26 06:32:09',NULL),(5,'Jake','bonn@mail.com','0292233','123ad','Test','www.user.com','2022-06-26 06:32:49',NULL),(6,'John William','JohnW2@gmail.com','98729823','random1211','Customer','www.test.com','2022-06-26 07:30:00',NULL),(7,'Noob','sw@gmail.com','91123232','123','','null','2022-08-01 05:25:44',NULL),(11,'hutt','wow@mail.com','92812323','1234','Admin','null','2022-08-01 05:37:17',NULL),(12,'qq22','qcool@mail.com','930033333','1234','Customer',NULL,'2022-08-02 03:44:10',NULL),(13,'amos','amos@mail.com','92223333','asd','Customer','http://localhost:8081/default.png','2022-08-02 11:14:08',NULL),(14,'envy','envy@mail.com','9281231','qwe','Customer','http://localhost:8081/default.png','2022-08-03 05:08:25',NULL),(15,'wgy','broken@gmail.com','92243322','qwe','Customer','http://localhost:8081/default.png','2022-08-03 11:27:09',NULL),(16,'Newb','newb@mail.com','92012232','12345','Customer','http://localhost:8081/default.png','2022-08-05 13:11:07',NULL),(17,'zidz','adz@admin.com','89330033','zid','Admin','http://localhost:3000/image/profile1.jpg','2022-08-06 04:17:18',NULL),(18,'hash','hashy@mail.com','93833333','123','Customer','http://localhost:3000/image/bks.jpg','2022-08-07 15:03:18',NULL),(20,'jakeadmin','jake@admin.com','91203233','admin','Admin','http://localhost:3000/default.png','2022-08-07 15:06:54',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-07 23:56:25
