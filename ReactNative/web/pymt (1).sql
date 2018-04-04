-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2018 at 02:45 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pymt`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountinformation`
--

CREATE TABLE `accountinformation` (
  `accountid` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_no` varchar(10) NOT NULL,
  `tax_rate` varchar(10) NOT NULL,
  `company_address` varchar(100) NOT NULL,
  `company_address2` varchar(100) NOT NULL,
  `state` varchar(50) NOT NULL,
  `company_zip` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accountinformation`
--

INSERT INTO `accountinformation` (`accountid`, `email`, `company_name`, `image`, `first_name`, `last_name`, `phone_no`, `tax_rate`, `company_address`, `company_address2`, `state`, `company_zip`) VALUES
(1, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(2, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(3, 'email@gmail.com', 'undefined', '', 'fir', 'las', '233', 'jk', 'mmwmdw', 'mdewmd', '1', ''),
(4, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(5, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(6, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(7, 'email@gmail.com', 'undefined', '', 'ccwcew', 'cwcw', 'cwcw', 'ff2323', 'cwe', 'cwc', '1', ''),
(8, 'email@gmail.com', 'undefined', '', 'ccwcew', 'cwcw', 'cwcw', 'ff2323', '', '', '1', ''),
(9, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(10, 'example1@gmail.com', 'undefined', '', 'vd', 'brrgbrtb', '324556', '12', 'cwnkcwl', 'nvkww', '1', 'c m wc wmc'),
(11, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(12, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(13, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(14, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(15, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(16, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(17, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(18, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(19, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(20, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(21, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(22, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(23, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(24, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(25, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(26, '', 'undefined', '', '', '', '', '', '', '', '1', ''),
(27, '', 'undefined', '', '', '', '', '', '', '', '1', '');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryID` int(10) UNSIGNED NOT NULL,
  `CategoryName` varchar(200) NOT NULL,
  `CategoryColor` varchar(200) NOT NULL,
  `CategoryIcon` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryID`, `CategoryName`, `CategoryColor`, `CategoryIcon`) VALUES
(1, 'fweffw', '1', '1'),
(2, 'dfgrertgff', '1', '1'),
(3, 'bbetbeg', '1', '1'),
(4, 'dffferrrrrrr', '2', '2');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itemid` int(5) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `category` varchar(5) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` varchar(5) NOT NULL,
  `stock` varchar(10) NOT NULL,
  `image` varchar(100) NOT NULL,
  `barcode` varchar(100) NOT NULL,
  `modifier` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itemid`, `item_name`, `category`, `description`, `price`, `stock`, `image`, `barcode`, `modifier`) VALUES
(36, 'item12', '2', 'descr', 'price', 'input', 'undefined', 'sddw', 'undefined'),
(37, '', '1', '', '', '', 'undefined', '', 'undefined'),
(38, '', '1', '', '', '', 'undefined', '', 'undefined'),
(39, 'g4gg5', '2', 't34t3t3t34', '355', 'grtgge', 'undefined', 'ggtgeg', 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transactionId` int(11) NOT NULL,
  `itemid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `paymentby` varchar(200) NOT NULL,
  `revenue` decimal(10,0) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transactionId`, `itemid`, `userid`, `paymentby`, `revenue`, `date`, `status`) VALUES
(1, 0, 102, '190', '0', '0000-00-00 00:00:00', 'status');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(20) NOT NULL,
  `First_Name` varchar(50) NOT NULL,
  `Last_Name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(90) NOT NULL,
  `Pin` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `First_Name`, `Last_Name`, `email`, `password`, `Pin`) VALUES
(13, 'wfe', 'cece', '', '', 23344),
(15, 'd34ff', 'f4f43', '', '', 455),
(16, 'bkjehj', 'uydgsug', '', '', 3545656),
(17, 'undefinehtherd', 'lastname', '', '', 4563);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountinformation`
--
ALTER TABLE `accountinformation`
  ADD PRIMARY KEY (`accountid`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemid`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transactionId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountinformation`
--
ALTER TABLE `accountinformation`
  MODIFY `accountid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
