-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 09, 2021 at 04:04 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `provinsi`
--

-- --------------------------------------------------------

--
-- Table structure for table `kabupaten`
--

CREATE TABLE `kabupaten` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `provinsi_id` int(11) DEFAULT NULL,
  `diresmikan` date DEFAULT NULL,
  `photo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kabupaten`
--

INSERT INTO `kabupaten` (`id`, `name`, `provinsi_id`, `diresmikan`, `photo`) VALUES
(2, 'Medan', 2, '2021-04-07', 'Lambang_Kabupaten_Maluku_Tenggara.gif'),
(3, 'Pekan Baru', 3, '2021-03-16', 'Jawa_Timur.png'),
(4, 'Padang', 4, '2020-07-08', 'Lambang_Kabupaten_Buru.png'),
(5, 'Bandung', 5, '2021-03-16', 'Jambi.png'),
(6, 'Surabaya', 6, '2021-09-05', 'images.png'),
(7, 'Pontianak', 7, '2021-09-21', 'bcc96482fc6d1e5c5833e2bdbb8e8e49.jpg'),
(8, 'Palangkaraya', 8, '2021-09-03', '85-pk-pemkab-buleleng-dengan-perguruan-tinggi-tentang-pelaksanaan-tri-dharma-perguruan-tinggi.png');

-- --------------------------------------------------------

--
-- Table structure for table `provinsi`
--

CREATE TABLE `provinsi` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `diresmikan` date DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `pulau` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `provinsi`
--

INSERT INTO `provinsi` (`id`, `nama`, `diresmikan`, `photo`, `pulau`) VALUES
(2, 'Sumatera Utara', '2021-05-12', 'Logo-Banten-Provinsi-Banten-Indonesia-Original.jpg', 'Sumatera'),
(3, 'Riau', '2021-03-11', 'Pemprov.png', 'Sumatera'),
(4, 'Sumatera Barat', '2021-12-16', 'logo-provinsi-gorontalo.png', 'Sumatera'),
(5, 'Jawa Barat', '2021-01-05', 'Lambang_Kabupaten_Buru.png', 'Jawa'),
(6, 'Jawa Timur', '2020-11-10', 'Kabupaten Bangli.png', 'Jawa'),
(7, 'Kalimantan Barat', '2021-09-20', 'logo-provinsi-gorontalo.png', 'Kalimantan'),
(8, 'Kalimantan Tengah', '2021-05-05', 'Kalimantan_Tengah.png', 'Kalimantan'),
(9, 'Jogjakarta', '2021-09-13', 'Lambang_Kabupaten_Bombana.png', 'Sumatera');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kabupaten`
--
ALTER TABLE `kabupaten`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kabupaten_ibfk_1` (`provinsi_id`);

--
-- Indexes for table `provinsi`
--
ALTER TABLE `provinsi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kabupaten`
--
ALTER TABLE `kabupaten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `provinsi`
--
ALTER TABLE `provinsi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kabupaten`
--
ALTER TABLE `kabupaten`
  ADD CONSTRAINT `kabupaten_ibfk_1` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
