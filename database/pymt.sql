-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: pymt
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `account_no` varchar(45) NOT NULL,
  `phone_no` varchar(20) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `address` varchar(180) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(12) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `merchant_id` varchar(255) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'auth0|5b249d3d8763ef3569765d7b','234234','company name','ca',NULL,NULL,NULL,NULL,NULL,'693147b0-62c5-14c2-ddce-81f7d26bd52f',NULL,1,1,10.00,10000,1,1,1,1,1,1,1,1),(3,'auth0|5b249d3d8763ef3569765d7b1','234234','company name','ca',NULL,NULL,NULL,NULL,NULL,'693147b0-62c5-14c2-ddce-81f7d26bd52f2',NULL,1,1,21.00,10000,1,1,1,1,1,1,1,1),(4,'auth0|5b249fd9c4e1ce04c26ff84e','24234','123','adasdf',NULL,NULL,NULL,'32423',NULL,'def23768-a6cf-f289-6f66-7d144ce3c323',NULL,1,1,234.00,10000,1,1,1,1,1,1,1,1),(5,'auth0|5b24a69bb69286427c2b2a7c','1234567890','Pymt','comany address',NULL,NULL,NULL,'comapy zip',NULL,'b13878da-a5cb-1668-f72e-16b419a82337',NULL,1,1,80.00,10000,1,1,1,1,1,1,1,1),(6,'auth0|5b24a8308763ef3569765e76','1234567890','Company PYMT','company address',NULL,NULL,NULL,'aip',NULL,'9ab199dc-7bd3-adcc-2009-36d624420b92',NULL,1,1,123.00,10000,1,1,1,1,1,1,1,1),(7,'auth0|5b24a8aab69286427c2b2aaa','1231231231','company','address',NULL,NULL,NULL,'213123',NULL,'300fc390-6269-36b4-d858-53441abe4f41',NULL,1,1,32.00,10000,1,1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cash`
--

DROP TABLE IF EXISTS `cash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `card_amount` decimal(10,4) DEFAULT NULL,
  `card_batch_number` varchar(45) DEFAULT NULL,
  `card_transaction_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cash_account_id_account_idx` (`account_id`),
  KEY `cash_opening_user_id_user_idx` (`opening_user_id`),
  KEY `cash_closing_user_id_user_idx` (`closing_user_id`),
  KEY `cash_eod_till_user_id_user_idx` (`eod_till_user_id`),
  CONSTRAINT `cash_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cash_closing_user_id_user` FOREIGN KEY (`closing_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cash_eod_till_user_id_user` FOREIGN KEY (`eod_till_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cash_opening_user_id_user` FOREIGN KEY (`opening_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash`
--

LOCK TABLES `cash` WRITE;
/*!40000 ALTER TABLE `cash` DISABLE KEYS */;
/*!40000 ALTER TABLE `cash` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cash_drop`
--

DROP TABLE IF EXISTS `cash_drop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash_drop`
--

LOCK TABLES `cash_drop` WRITE;
/*!40000 ALTER TABLE `cash_drop` DISABLE KEYS */;
/*!40000 ALTER TABLE `cash_drop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_item_map`
--

DROP TABLE IF EXISTS `category_item_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_item_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_item_map_category_idx` (`category_id`),
  KEY `category_item_map_item_idx` (`item_id`),
  CONSTRAINT `category_item_map_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_item_map_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_item_map`
--

LOCK TABLES `category_item_map` WRITE;
/*!40000 ALTER TABLE `category_item_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_item_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_detail`
--

DROP TABLE IF EXISTS `item_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_detail`
--

LOCK TABLES `item_detail` WRITE;
/*!40000 ALTER TABLE `item_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_modifier_map`
--

DROP TABLE IF EXISTS `item_modifier_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_modifier_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `modifier_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id_idx` (`item_id`),
  KEY `modifier_id_idx` (`modifier_id`),
  CONSTRAINT `item_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `modifier_id` FOREIGN KEY (`modifier_id`) REFERENCES `modifier` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_modifier_map`
--

LOCK TABLES `item_modifier_map` WRITE;
/*!40000 ALTER TABLE `item_modifier_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_modifier_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modifier`
--

DROP TABLE IF EXISTS `modifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modifier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modifier_account_id_account_idx` (`account_id`),
  CONSTRAINT `modifier_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modifier`
--

LOCK TABLES `modifier` WRITE;
/*!40000 ALTER TABLE `modifier` DISABLE KEYS */;
/*!40000 ALTER TABLE `modifier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modifier_attribute`
--

DROP TABLE IF EXISTS `modifier_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modifier_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modifier_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modifier_attr_modifier_id_modifier_idx` (`modifier_id`),
  CONSTRAINT `modifier_attr_modifier_id_modifier` FOREIGN KEY (`modifier_id`) REFERENCES `modifier` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modifier_attribute`
--

LOCK TABLES `modifier_attribute` WRITE;
/*!40000 ALTER TABLE `modifier_attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `modifier_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_modifier`
--

DROP TABLE IF EXISTS `order_modifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_modifier`
--

LOCK TABLES `order_modifier` WRITE;
/*!40000 ALTER TABLE `order_modifier` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_modifier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `signature` blob,
  `amount_tendered` decimal(10,2) DEFAULT NULL,
  `change_given` decimal(10,2) DEFAULT NULL,
  `amount_paid` decimal(10,2) GENERATED ALWAYS AS ((`amount_tendered` - `change_given`)) STORED,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tab`
--

DROP TABLE IF EXISTS `tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tab`
--

LOCK TABLES `tab` WRITE;
/*!40000 ALTER TABLE `tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table`
--

DROP TABLE IF EXISTS `table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `table_order_id_order_idx` (`order_id`),
  CONSTRAINT `table_order_id_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table`
--

LOCK TABLES `table` WRITE;
/*!40000 ALTER TABLE `table` DISABLE KEYS */;
/*!40000 ALTER TABLE `table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pin` int(10) NOT NULL,
  `role_id` int(5) DEFAULT NULL,
  `auth0_user_id` varchar(255) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth0_user_id_UNIQUE` (`auth0_user_id`),
  KEY `account_id_account_idx` (`account_id`),
  KEY `user_role_id_role_idx` (`role_id`),
  CONSTRAINT `user_account_id_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_id_role` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2018-06-18 10:28:17
