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
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight` (
  `flightid` int NOT NULL AUTO_INCREMENT,
  `flightCode` varchar(45) NOT NULL,
  `aircraft` varchar(45) NOT NULL,
  `originAirport` int NOT NULL,
  `destinationAirport` int NOT NULL,
  `embarkDate` date NOT NULL,
  `travelTime` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `flight_pic_url` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`flightid`),
  UNIQUE KEY `flightCode_UNIQUE` (`flightCode`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
INSERT INTO `flight` VALUES (1,'SP722','MH370',1,3,'2021-12-20','7 hrs 55 mins','700',NULL,'2022-06-26 06:46:39'),(2,'SP723','MH375',1,3,'2021-12-20','7 hrs 55 mins','700',NULL,'2022-06-26 06:47:10'),(3,'SP790','MH373',1,3,'2021-12-20','2 hrs 55 mins','900',NULL,'2022-06-26 06:47:34'),(4,'SP533','MH340',1,2,'2021-12-20','2 hrs 55 mins','500',NULL,'2022-06-26 06:47:51'),(5,'SP534','MH349',1,2,'2021-12-20','8 hrs 55 mins','650',NULL,'2022-06-26 06:48:12'),(7,'SP5340','MH3492',1,2,'2021-12-20','8 hrs 55 mins','650',NULL,'2022-06-26 07:46:16'),(10,'SP321','MH343',2,4,'2021-12-20','8 hrs 55 mins','650',NULL,'2022-06-26 07:46:54'),(12,'1123','MH90q',2,2,'2021-12-20','03:03','2222','http://localhost:8081/sus.png','2022-08-05 05:06:03'),(14,'112','MH903',3,4,'2021-12-20','03:03','2222','http://localhost:3000/sus.png','2022-08-05 05:08:54'),(15,'M2344','mhtest',5,12,'2021-12-20','03:02','2222','http://localhost:3000/sus.png','2022-08-05 07:26:07'),(16,'4322M','MC122',5,13,'2021-12-20','08:04','689','http://localhost:3000/sus.png','2022-08-05 13:17:09'),(17,'T21','wow1',1,13,'2022-08-20','03:02','2311','http://localhost:3000/image/profile1.jpg','2022-08-07 11:03:09'),(19,'dummy','test1',12,13,'2022-08-08','03:02','9999','http://localhost:3000/image/crash_test_dummy.jpg','2022-08-07 11:12:40'),(20,'dummy2','test2',13,1,'2022-08-09','07:45','8888','http://localhost:3000/image/boookself.png','2022-08-07 13:36:02'),(21,'laz33','laz332',14,13,'2022-08-09','07:33','2006','http://localhost:3000/image/logonub.jpg','2022-08-07 15:09:41');
/*!40000 ALTER TABLE `flight` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-07 23:56:24
