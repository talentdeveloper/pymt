-- MySQL dump 10.13  Distrib 8.0.11, for macos10.13 (x86_64)
--
-- Host: localhost    Database: pymt
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `account` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `account_no` varchar(45) NOT NULL,
  `phone_no` varchar(20) DEFAULT NULL,
  `address` varchar(180) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(12) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `merchant_id` varchar(45) NOT NULL,
  `device_settings` mediumtext,
  `tip_enabled` tinyint(4) DEFAULT NULL,
  `bar_tab` tinyint(4) DEFAULT NULL,
  `tax_rate` decimal(10,2) DEFAULT NULL,
  `signature_amount` int(10) DEFAULT NULL,
  `cash_enabled` tinyint(4) DEFAULT NULL,
  `discount_enabled` tinyint(4) DEFAULT NULL,
  `fsa_enabled` tinyint(4) DEFAULT NULL,
  `ebt_enabled` tinyint(4) DEFAULT NULL,
  `table_tab` tinyint(4) DEFAULT NULL,
  `table_num` tinyint(4) DEFAULT NULL,
  `gift_cards` tinyint(4) DEFAULT NULL,
  `cash_discount` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `merchant_id_UNIQUE` (`merchant_id`),
  UNIQUE KEY `account_no_UNIQUE` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_number` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_table_id_table_idx` (`table_id`),
  KEY `cart_order_id_order_idx` (`order_id`),
  CONSTRAINT `cart_order_id_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_table_id_table` FOREIGN KEY (`table_id`) REFERENCES `table` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cash`
--

DROP TABLE IF EXISTS `cash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cash` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opening_amount` decimal(10,2) NOT NULL,
  `closing_amount` decimal(10,2) DEFAULT NULL,
  `sales_amount` decimal(10,2) DEFAULT NULL,
  `eod_till_user_entry` varchar(45) DEFAULT NULL,
  `total_drop_amount` decimal(10,2) DEFAULT NULL,
  `opening_date` datetime NOT NULL,
  `closing_date` datetime DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `day_opened` tinyint(4) NOT NULL DEFAULT '1',
  `day_closed` tinyint(4) NOT NULL DEFAULT '0',
  `opening_user_id` int(11) DEFAULT NULL,
  `closing_user_id` int(11) DEFAULT NULL,
  `eod_till_user_id` int(11) DEFAULT NULL,
  `eod_till_entry_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cash_account_id_account_idx` (`account_id`),
  KEY `cash_opening_user_id_user_idx` (`opening_user_id`),
  KEY `cash_closing_user_id_user_idx` (`closing_user_id`),
  KEY `cash_eod_till_user_id_user_idx` (`eod_till_user_id`),
  CONSTRAINT `cash_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cash_closing_user_id_user` FOREIGN KEY (`closing_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cash_eod_till_user_id_user` FOREIGN KEY (`eod_till_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cash_opening_user_id_user` FOREIGN KEY (`opening_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cash_drop`
--

DROP TABLE IF EXISTS `cash_drop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cash_drop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `drop_time` datetime NOT NULL,
  `drop_by` int(11) DEFAULT NULL,
  `cash_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cash_drop_cash_id_cash_idx` (`cash_id`),
  KEY `cash_drop_by_user_idx` (`drop_by`),
  CONSTRAINT `cash_drop_by_user` FOREIGN KEY (`drop_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cash_drop_cash_id_cash` FOREIGN KEY (`cash_id`) REFERENCES `cash` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `short_name` varchar(4) NOT NULL,
  `color` varchar(25) NOT NULL,
  `image` blob,
  `active` tinyint(4) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_account_id_account_idx` (`account_id`),
  CONSTRAINT `category_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category_item_map`
--

DROP TABLE IF EXISTS `category_item_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category_item_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_item_map_category_idx` (`category_id`),
  KEY `category_item_map_item_idx` (`item_id`),
  CONSTRAINT `category_item_map_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_item_map_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_detail`
--

DROP TABLE IF EXISTS `item_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `item_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity_remaining` int(11) DEFAULT NULL,
  `item_weight` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id_item_idx` (`item_id`),
  CONSTRAINT `item_id_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_modifier_map`
--

DROP TABLE IF EXISTS `item_modifier_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `item_modifier_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `modifier_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id_idx` (`item_id`),
  KEY `modifier_id_idx` (`modifier_id`),
  CONSTRAINT `item_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `modifier_id` FOREIGN KEY (`modifier_id`) REFERENCES `modifier` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `image` blob,
  `sold_by_weight` tinyint(4) DEFAULT NULL,
  `track_inventory` tinyint(4) DEFAULT NULL,
  `allow_backorder` tinyint(4) DEFAULT NULL,
  `is_taxable` tinyint(4) DEFAULT NULL,
  `is_ebt` tinyint(4) DEFAULT NULL,
  `is_fsa` tinyint(4) DEFAULT NULL,
  `selector_id` int(11) DEFAULT NULL,
  `selector_name` varchar(45) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_account_id_account_idx` (`account_id`),
  CONSTRAINT `item_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `modifier`
--

DROP TABLE IF EXISTS `modifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `modifier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modifier_account_id_account_idx` (`account_id`),
  CONSTRAINT `modifier_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `modifier_attribute`
--

DROP TABLE IF EXISTS `modifier_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `modifier_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modifier_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modifier_attr_modifier_id_modifier_idx` (`modifier_id`),
  CONSTRAINT `modifier_attr_modifier_id_modifier` FOREIGN KEY (`modifier_id`) REFERENCES `modifier` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cash_id` int(11) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `order_type` varchar(45) DEFAULT NULL,
  `table_number` varchar(45) DEFAULT NULL,
  `transaction_id` int(11) NOT NULL,
  `order_status` varchar(45) DEFAULT NULL,
  `cart_total` decimal(10,2) DEFAULT NULL,
  `discount_percent` float DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL,
  `item_quantity` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transaction_id_UNIQUE` (`transaction_id`),
  KEY `order_account_id_account_idx` (`account_id`),
  KEY `cash_id_idx` (`cash_id`),
  CONSTRAINT `order_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_cash_id_cash` FOREIGN KEY (`cash_id`) REFERENCES `cash` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `is_taxable` tinyint(4) DEFAULT NULL,
  `is_ebt` tinyint(4) DEFAULT NULL,
  `is_fsa` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_item_order_id_order_idx` (`order_id`),
  KEY `order_item_item_id_item_idx` (`item_id`),
  CONSTRAINT `order_item_item_id_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `order_item_order_id_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_modifier`
--

DROP TABLE IF EXISTS `order_modifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order_modifier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `order_item_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_modifier_order_id_order_idx` (`order_id`),
  KEY `order_modifier_item_id_order_item_idx` (`order_item_id`),
  CONSTRAINT `order_modifier_item_id_order_item` FOREIGN KEY (`order_item_id`) REFERENCES `order_item` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_modifier_order_id_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `signature` blob,
  `amount_tendered` decimal(10,2) DEFAULT NULL,
  `change_given` decimal(10,2) DEFAULT NULL,
  `xmp` longtext,
  `account_id` int(11) DEFAULT NULL,
  `cash_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id_order_idx` (`order_id`),
  KEY `payment_account_id_account_idx` (`account_id`),
  KEY `cash_id_cash_idx` (`cash_id`),
  CONSTRAINT `cash_id_cash` FOREIGN KEY (`cash_id`) REFERENCES `cash` (`id`),
  CONSTRAINT `order_id_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payment_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `table`
--

DROP TABLE IF EXISTS `table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `table_order_id_order_idx` (`order_id`),
  CONSTRAINT `table_order_id_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transactions` (
  `transactionId` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `paymentby` varchar(200) NOT NULL,
  `revenue` decimal(10,0) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`transactionId`),
  KEY `trans_account_id_account_idx` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pin` int(10) NOT NULL,
  `role_id` int(5) DEFAULT NULL,
  `auth0_user_id` varchar(100) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth0_user_id_UNIQUE` (`auth0_user_id`),
  KEY `account_id_account_idx` (`account_id`),
  KEY `user_role_id_role_idx` (`role_id`),
  CONSTRAINT `user_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_id_role` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-03  0:43:15
