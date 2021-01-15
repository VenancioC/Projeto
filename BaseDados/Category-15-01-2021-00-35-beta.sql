-- MariaDB dump 10.17  Distrib 10.4.15-MariaDB, for Linux (x86_64)
--
-- Host: mysql.hostinger.ro    Database: u574849695_22
-- ------------------------------------------------------
-- Server version	10.4.15-MariaDB-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Category` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Category` (`Category`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (81,'a'),(30,'accusamus'),(32,'adipisci'),(63,'alias'),(74,'aliquid'),(98,'animi'),(13,'aperiam'),(51,'architecto'),(60,'aut'),(80,'autem'),(12,'commodi'),(90,'consequatur'),(72,'consequuntur'),(25,'corrupti'),(14,'culpa'),(48,'cupiditate'),(20,'distinctio'),(15,'dolor'),(86,'dolorem'),(96,'dolores'),(40,'dolorum'),(67,'ducimus'),(88,'ea'),(91,'earum'),(83,'eius'),(78,'enim'),(16,'eos'),(64,'est'),(6,'et'),(66,'eum'),(22,'ex'),(19,'excepturi'),(71,'exercitationem'),(53,'facere'),(70,'fuga'),(62,'fugiat'),(47,'harum'),(89,'id'),(21,'illum'),(100,'impedit'),(65,'incidunt'),(8,'ipsam'),(61,'ipsum'),(37,'iusto'),(75,'laboriosam'),(46,'magni'),(2,'maiores'),(97,'maxime'),(42,'minima'),(31,'molestiae'),(1,'molestias'),(94,'mollitia'),(56,'nam'),(76,'natus'),(7,'necessitatibus'),(44,'nemo'),(3,'neque'),(84,'nesciunt'),(45,'nihil'),(52,'nisi'),(50,'nobis'),(39,'non'),(38,'officiis'),(35,'omnis'),(55,'pariatur'),(17,'perferendis'),(28,'porro'),(79,'possimus'),(57,'praesentium'),(23,'quaerat'),(43,'quam'),(69,'quas'),(82,'quasi'),(27,'qui'),(85,'quo'),(87,'ratione'),(68,'recusandae'),(49,'reiciendis'),(34,'rem'),(99,'repellat'),(29,'rerum'),(10,'sapiente'),(26,'sed'),(93,'sequi'),(95,'similique'),(58,'soluta'),(59,'sunt'),(73,'suscipit'),(77,'tempora'),(4,'tempore'),(5,'tenetur'),(92,'ullam'),(41,'unde'),(24,'ut'),(36,'vel'),(9,'vitae'),(18,'voluptate'),(11,'voluptatem'),(33,'voluptates'),(54,'voluptatum');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-15  0:35:59
