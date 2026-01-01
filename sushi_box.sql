-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 01 jan. 2026 à 23:00
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sushi_box`
--

-- --------------------------------------------------------

--
-- Structure de la table `boxes`
--

CREATE TABLE `boxes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pieces` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `boxes`
--

INSERT INTO `boxes` (`id`, `name`, `pieces`, `price`, `image`) VALUES
(1, 'Tasty Blend', 12, 12.50, 'tasty-blend'),
(2, 'Amateur Mix', 18, 15.90, 'amateur-mix'),
(3, 'Saumon Original', 11, 12.50, 'saumon-original'),
(4, 'Salmon Lovers', 18, 15.90, 'salmon-lovers'),
(5, 'Salmon Classic', 10, 15.90, 'salmon-classic'),
(6, 'Master Mix', 12, 15.90, 'master-mix'),
(7, 'Sunrise', 18, 15.90, 'sunrise'),
(8, 'Sando Box Chicken Katsu', 13, 15.90, 'sando-box-chicken-katsu'),
(9, 'Sando Box Salmon Aburi', 13, 15.90, 'sando-box-salmon-aburi'),
(10, 'Super Salmon', 24, 19.90, 'super-salmon'),
(11, 'California Dream', 24, 19.90, 'california-dream'),
(12, 'Gourmet Mix', 22, 24.50, 'gourmet-mix'),
(13, 'Fresh Mix', 22, 24.50, 'fresh-mix');

-- --------------------------------------------------------

--
-- Structure de la table `box_flavors`
--

CREATE TABLE `box_flavors` (
  `box_id` int(11) NOT NULL,
  `flavor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `box_flavors`
--

INSERT INTO `box_flavors` (`box_id`, `flavor_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(4, 4),
(5, 1),
(6, 1),
(6, 2),
(6, 5),
(7, 1),
(7, 2),
(7, 3),
(7, 5),
(8, 1),
(8, 2),
(8, 3),
(8, 6),
(9, 1),
(9, 2),
(9, 5),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(11, 1),
(11, 2),
(11, 5),
(11, 6),
(11, 7),
(11, 8),
(12, 1),
(12, 2),
(12, 4),
(12, 6),
(12, 8),
(12, 9),
(13, 1),
(13, 2),
(13, 3),
(13, 5),
(13, 8);

-- --------------------------------------------------------

--
-- Structure de la table `box_foods`
--

CREATE TABLE `box_foods` (
  `box_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `quantity` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `box_foods`
--

INSERT INTO `box_foods` (`box_id`, `food_id`, `quantity`) VALUES
(1, 1, 3.00),
(1, 2, 3.00),
(1, 3, 3.00),
(1, 4, 3.00),
(1, 5, 1.00),
(2, 1, 3.00),
(2, 5, 1.00),
(2, 6, 3.00),
(2, 7, 3.00),
(2, 8, 6.00),
(3, 1, 6.00),
(3, 2, 5.00),
(3, 5, 1.00),
(4, 1, 6.00),
(4, 2, 6.00),
(4, 5, 1.00),
(4, 7, 6.00),
(5, 2, 10.00),
(5, 5, 1.00),
(6, 1, 3.00),
(6, 2, 4.00),
(6, 5, 1.00),
(6, 9, 2.00),
(6, 10, 3.00),
(7, 1, 6.00),
(7, 5, 1.00),
(7, 6, 6.00),
(7, 11, 6.00),
(8, 1, 6.00),
(8, 5, 1.00),
(8, 6, 6.00),
(8, 11, 6.00),
(8, 12, 0.50),
(9, 1, 6.00),
(9, 5, 1.00),
(9, 11, 6.00),
(9, 13, 0.50),
(10, 1, 6.00),
(10, 5, 1.00),
(10, 6, 6.00),
(10, 7, 6.00),
(10, 14, 6.00),
(11, 1, 6.00),
(11, 5, 1.00),
(11, 11, 6.00),
(11, 15, 6.00),
(11, 16, 6.00),
(12, 5, 1.00),
(12, 17, 6.00),
(12, 18, 4.00),
(12, 19, 3.00),
(12, 20, 6.00),
(12, 21, 3.00),
(13, 4, 6.00),
(13, 5, 1.00),
(13, 6, 6.00),
(13, 22, 4.00),
(13, 23, 4.00),
(13, 24, 2.00);

-- --------------------------------------------------------

--
-- Structure de la table `favorites`
--

CREATE TABLE `favorites` (
  `user_id` int(11) NOT NULL,
  `box_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `flavors`
--

CREATE TABLE `flavors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `flavors`
--

INSERT INTO `flavors` (`id`, `name`) VALUES
(2, 'avocat'),
(3, 'cheese'),
(4, 'coriandre'),
(7, 'crevette'),
(1, 'saumon'),
(9, 'seriole lalandi'),
(8, 'spicy'),
(5, 'thon'),
(6, 'viande');

-- --------------------------------------------------------

--
-- Structure de la table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `foods`
--

INSERT INTO `foods` (`id`, `name`) VALUES
(16, 'California Chicken Katsu'),
(15, 'California Crevette'),
(20, 'California French Salmon'),
(19, 'California French Touch'),
(4, 'California Pacific'),
(1, 'California Saumon Avocat'),
(10, 'California Thon Avocat'),
(11, 'California Thon Cuit Avocat'),
(21, 'California Yellowtail Ponzu'),
(5, 'Edamame/Salade de chou'),
(8, 'Maki Cheese Avocat'),
(14, 'Maki Salmon'),
(6, 'Maki Salmon Roll'),
(12, 'Sando Chicken Katsu'),
(13, 'Sando Salmon Aburi'),
(18, 'Signature Dragon Roll'),
(22, 'Signature Rock\'n Roll'),
(3, 'Spring Avocat Cheese'),
(7, 'Spring Saumon Avocat'),
(17, 'Spring Tataki Saumon'),
(23, 'Sushi Salmon'),
(2, 'Sushi Saumon'),
(24, 'Sushi Saumon Tsukudani'),
(9, 'Sushi Thon');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(50) NOT NULL DEFAULT 'paid',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `adresse` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `status`, `created_at`, `adresse`) VALUES
(1, 9, 40.90, 'paid', '2025-12-04 14:00:08', NULL),
(2, 9, 36.81, 'paid', '2025-12-04 14:02:46', NULL),
(3, 9, 39.87, 'paid', '2025-12-04 14:22:06', NULL),
(4, 9, 65.43, 'paid', '2025-12-04 14:35:31', NULL),
(5, 9, 25.56, 'paid', '2025-12-04 14:36:55', NULL),
(6, 9, 62.37, 'paid', '2025-12-04 14:59:41', NULL),
(7, 9, 102.75, 'paid', '2025-12-04 15:01:03', NULL),
(8, 9, 58.42, 'paid', '2025-12-04 20:35:50', NULL),
(9, 9, 56.38, 'paid', '2025-12-06 13:38:31', NULL),
(10, 9, 50.35, 'paid', '2025-12-08 11:29:31', NULL),
(11, 10, 47.70, 'on_site_payment', '2025-12-08 12:15:37', NULL),
(12, 9, 55.41, 'on_site_payment', '2025-12-08 12:43:28', NULL),
(13, 10, 55.95, 'on_site_payment', '2025-12-08 15:14:52', 'Marseille'),
(14, 10, 62.65, 'on_site_payment', '2025-12-08 15:20:44', '12 avenue, Nice'),
(15, 10, 47.70, 'on_site_payment', '2025-12-08 18:25:03', 'Montpellier'),
(16, 10, 62.65, 'on_site_payment', '2025-12-08 18:34:28', 'Paris'),
(17, 10, 55.95, 'on_site_payment', '2025-12-08 18:40:49', 'Paris'),
(18, 10, 59.30, 'on_site_payment', '2025-12-08 18:45:19', 'Marseille'),
(19, 10, 62.65, 'on_site_payment', '2025-12-08 18:50:03', 'Paris'),
(20, 11, 61.43, 'on_site_payment', '2025-12-08 21:48:41', 'Paris'),
(21, 11, 56.38, 'on_site_payment', '2025-12-08 21:51:37', 'zdcecezc'),
(22, 10, 55.95, 'on_site_payment', '2025-12-12 00:14:46', 'efvz zrfz'),
(23, 10, 47.70, 'on_site_payment', '2025-12-12 00:33:14', 'ececece'),
(24, 10, 62.65, 'on_site_payment', '2025-12-12 00:54:03', 'cercece'),
(25, 10, 37.50, 'on_site_payment', '2025-12-12 01:45:20', 'ff\"f\"f\"'),
(26, 10, 44.30, 'on_site_payment', '2025-12-12 01:49:21', 'Nom: rcrc\nEmail: crcrc@rcr.fr\nTéléphone: 0425633202\nAdresse: recfrecece\nNotes: '),
(27, 10, 47.70, 'on_site_payment', '2025-12-12 02:02:36', 'Nom: rcrec\nEmail: crcrc@crrcr.fr\nTéléphone: 0123365232\nAdresse: ccrcrcrc\nNotes: '),
(28, 10, 28.40, 'on_site_payment', '2025-12-12 02:04:16', 'Nom: exexe\nEmail: xexe@eex.fr\nTéléphone: 0565326532\nAdresse: dexexexe\nNotes: '),
(29, 10, 15.90, 'on_site_payment', '2025-12-12 02:13:24', 'Nom: dcdc\nEmail: cdcd@cece.fr\nTéléphone: 0232326353\nAdresse: cceecec\nNotes: '),
(30, 10, 15.90, 'on_site_payment', '2025-12-12 02:16:01', 'Nom: eecec\nEmail: ecce@cece.fr\nTéléphone: 0895653225\nAdresse: rcecece\nNotes: '),
(31, 10, 12.50, 'on_site_payment', '2025-12-12 02:18:40', 'Nom: zddzd\nEmail: decdcd@cecece.fr\nTéléphone: 0956245321\nAdresse: ececece\nNotes: '),
(38, 10, 55.95, 'on_site_payment', '2025-12-12 02:56:36', 'cececece'),
(39, 10, 59.30, 'on_site_payment', '2025-12-12 03:00:14', 'ececece'),
(40, 10, 62.65, 'on_site_payment', '2025-12-12 03:04:22', 'ecececec'),
(41, 10, 31.80, 'on_site_payment', '2025-12-16 11:30:47', 'déd\"d\"czce'),
(57, 10, 59.30, 'on_site_payment', '2025-12-16 14:43:59', 'Nom: ececec\nEmail: ecec@ecce.fr\nTéléphone: 0123262530\nAdresse: cececece\nNotes: '),
(58, 9, 67.46, 'on_site_payment', '2025-12-16 14:53:34', 'Nom: ececec\nEmail: ecec@eccece.fr\nTéléphone: 0123526224\nAdresse: ededecec\nNotes: '),
(59, 11, 50.35, 'on_site_payment', '2025-12-16 14:56:27', 'Nom: ecebicbeic\nEmail: ececec@ecece.kpoj\nTéléphone: 0965321242\nAdresse: ecececec\nNotes: '),
(60, 11, 64.45, 'on_site_payment', '2025-12-16 15:06:44', 'Nom: ececec\nEmail: ecece@cecec.com\nTéléphone: 0123256230\nAdresse: dededecec\nNotes: '),
(61, 11, 67.66, 'on_site_payment', '2025-12-16 15:10:36', 'Nom: ceexex\nEmail: exexe@xexexex.fr\nTéléphone: 0123526230\nAdresse: d\'deexexe\nNotes: '),
(62, 11, 34.34, 'on_site_payment', '2025-12-16 15:13:28', 'Nom: ececece\nEmail: cece@ececec.fr\nTéléphone: 0125623012\nAdresse: edexexexe\nNotes: \n[PROMO:OISHI2026]'),
(63, 11, 56.38, 'on_site_payment', '2025-12-16 15:15:08', 'Nom: vrrvr\nEmail: rvrvr@rvrv.fr\nTéléphone: 0125623012\nAdresse: \'cecececec\nNotes: '),
(64, 11, 70.48, 'on_site_payment', '2025-12-16 15:17:37', 'Nom: rvvce cd\nEmail: cecece@eccecece\nTéléphone: 0123262035\nAdresse: ceecece\nNotes: '),
(65, 9, 74.11, 'on_site_payment', '2025-12-16 15:18:24', 'Nom: eexexe\r\nEmail: exxexe@exxexex.fr\r\nTéléphone: 0123526202\r\nAdresse: c\'eececece\r\nNotes :'),
(66, 9, 56.38, 'on_site_payment', '2025-12-16 15:22:14', 'Nom: vveve\nEmail: eveve@xn--vveev-5l4b.fr\nTéléphone: 0125625234\nAdresse: evecvvevev\nNotes: \n[PROMO:OISHI2026]'),
(67, 9, 56.38, 'on_site_payment', '2025-12-16 15:25:23', 'Nom: rcvrvr\nEmail: rvrv@rvrvr.fr\nTéléphone: 0120623020\nAdresse: \'ff\'cvrvcvr\nNotes: '),
(68, 10, 55.95, 'on_site_payment', '2025-12-18 09:32:14', 'Nom: effeeb\nEmail: efvev@cece.cc\nTéléphone: 0125623520\nAdresse: Strasbourg\nNotes: '),
(69, 10, 44.30, 'on_site_payment', '2025-12-18 10:10:34', 'Nom: cecec\nEmail: ecece@ece.fr\nTéléphone: 0952614253\nAdresse: dededede\nNotes: '),
(70, 10, 62.65, 'on_site_payment', '2025-12-18 14:40:58', 'Nom: cececec\nEmail: ceece@ecceece.fr\nTéléphone: 0120523262\nAdresse: \'ccdcdcd\nNotes: ');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `box_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `box_id`, `quantity`, `unit_price`) VALUES
(1, 1, 1, 2, 12.50),
(2, 1, 2, 1, 15.90),
(3, 2, 1, 2, 12.50),
(4, 2, 2, 1, 15.90),
(5, 3, 2, 1, 15.90),
(6, 3, 3, 1, 12.50),
(7, 3, 5, 1, 15.90),
(8, 4, 1, 2, 12.50),
(9, 4, 2, 2, 15.90),
(10, 4, 5, 1, 15.90),
(11, 5, 2, 1, 15.90),
(12, 5, 3, 1, 12.50),
(13, 6, 2, 2, 15.90),
(14, 6, 1, 2, 12.50),
(15, 6, 3, 1, 12.50),
(16, 7, 2, 1, 15.90),
(17, 7, 1, 8, 12.50),
(18, 8, 3, 4, 12.50),
(19, 8, 2, 1, 15.90),
(20, 9, 2, 2, 15.90),
(21, 9, 4, 1, 15.90),
(22, 9, 5, 1, 15.90),
(23, 10, 2, 2, 15.90),
(24, 10, 3, 2, 12.50),
(25, 11, 2, 3, 15.90),
(26, 12, 3, 5, 12.50),
(27, 13, 3, 2, 12.50),
(28, 13, 2, 2, 15.90),
(29, 14, 8, 4, 15.90),
(30, 15, 2, 3, 15.90),
(31, 16, 2, 4, 15.90),
(32, 17, 2, 2, 15.90),
(33, 17, 1, 2, 12.50),
(34, 18, 3, 1, 12.50),
(35, 18, 6, 2, 15.90),
(36, 18, 5, 1, 15.90),
(37, 19, 2, 2, 15.90),
(38, 19, 5, 1, 15.90),
(39, 19, 4, 1, 15.90),
(40, 20, 2, 2, 15.90),
(41, 20, 3, 3, 12.50),
(42, 21, 6, 2, 15.90),
(43, 21, 5, 2, 15.90),
(44, 22, 2, 1, 15.90),
(45, 22, 1, 1, 12.50),
(46, 22, 3, 1, 12.50),
(47, 22, 6, 1, 15.90),
(48, 23, 2, 3, 15.90),
(49, 24, 2, 4, 15.90),
(50, 25, 3, 3, 12.50),
(51, 26, 3, 1, 12.50),
(52, 26, 2, 1, 15.90),
(53, 26, 5, 1, 15.90),
(54, 27, 2, 3, 15.90),
(55, 28, 2, 1, 15.90),
(56, 28, 3, 1, 12.50),
(57, 29, 2, 1, 15.90),
(58, 30, 2, 1, 15.90),
(59, 31, 1, 1, 12.50),
(60, 38, 2, 2, 15.90),
(61, 38, 3, 1, 12.50),
(62, 38, 1, 1, 12.50),
(63, 39, 2, 3, 15.90),
(64, 39, 3, 1, 12.50),
(65, 40, 2, 4, 15.90),
(66, 41, 2, 2, 15.90),
(67, 57, 2, 1, 15.90),
(68, 57, 1, 1, 12.50),
(69, 57, 4, 1, 15.90),
(70, 57, 8, 1, 15.90),
(71, 58, 3, 1, 12.50),
(72, 58, 2, 1, 15.90),
(73, 58, 5, 1, 15.90),
(74, 58, 4, 1, 15.90),
(75, 58, 6, 1, 15.90),
(76, 59, 3, 2, 12.50),
(77, 59, 2, 2, 15.90),
(78, 60, 2, 3, 15.90),
(79, 60, 1, 2, 12.50),
(80, 61, 4, 2, 15.90),
(81, 61, 5, 3, 15.90),
(82, 61, 6, 1, 15.90),
(83, 62, 4, 2, 15.90),
(84, 62, 2, 1, 15.90),
(85, 63, 4, 3, 15.90),
(86, 63, 5, 1, 15.90),
(87, 64, 7, 3, 15.90),
(88, 64, 9, 2, 15.90),
(89, 65, 2, 1, 15.90),
(90, 65, 1, 2, 12.50),
(91, 65, 5, 2, 15.90),
(92, 65, 6, 1, 15.90),
(93, 65, 8, 1, 15.90),
(94, 66, 7, 3, 15.90),
(95, 66, 8, 2, 15.90),
(96, 67, 4, 4, 15.90),
(97, 68, 2, 2, 15.90),
(98, 68, 3, 2, 12.50),
(99, 69, 1, 1, 12.50),
(100, 69, 2, 1, 15.90),
(101, 69, 4, 1, 15.90),
(102, 70, 4, 2, 15.90),
(103, 70, 5, 2, 15.90);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `api_token` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `age` int(11) DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `code_postal` varchar(20) DEFAULT NULL,
  `derniere_connexion` datetime DEFAULT NULL,
  `nb_commande` int(11) DEFAULT 0,
  `depense_totale` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `created_at`, `api_token`, `status`, `role`, `age`, `ville`, `code_postal`, `derniere_connexion`, `nb_commande`, `depense_totale`) VALUES
(9, 'enzo', 'iyiueghc', 'dz@dz.fr', '$2y$10$sgCQr.h4DizsFOu6PuVkW.U5q/lDVOLhjGYQAaiz1OCpH6HU2WUM.', '2025-12-01 11:32:45', '99a94f0756e63750b397e9125e452ce1e05703a8d185d22d1052685c76ac8a6a', 'student', 'user', 25, 'Bondy', '93140', '2025-12-16 15:17:57', 15, 848.58),
(10, 'Erwan', 'Picard Alvarez', 'epicardalvarez@gmail.com', '$2y$10$jRQ9xxFhc6KcECOUUVedwezDQ7sL1NG4d9Xstw98gg9KJaUdlTkFC', '2025-12-04 15:09:59', '025474f92f1bcebe8ce7a6a8e26c51da8685aa0cdec039889c7de274447c9c64', NULL, 'admin', 20, 'Mouroux', '77120', '2025-12-18 14:34:19', 26, 1254.95),
(11, 'lucas', 'refer', 'refer@refer.fr', '$2y$10$ouzLEvBSZ91tYYX62QxC4ONMmDGgFJ/KUcAPF/yij2XYmtGXJbHa2', '2025-12-04 21:17:21', '74f66dd4f69c3f9c4d46bc1a928e0137f5b846821dfcda68add5437885e762b4', 'student', 'user', NULL, NULL, NULL, '2025-12-16 14:55:48', 8, 461.47),
(18, 'ADMIN', 'N°1', 'test@admin.mmi', '$2y$10$LgCWhL8/fRW2oREiAtBZb.Ez/sir9J09tsX1Xm.Fme0OvO.En5Z9C', '2026-01-01 22:51:56', 'f8000424f32c43aab65310ef19dddc764584091a32242b1022a99f373eae83a5', NULL, 'admin', 20, 'Paris', '75001', '2026-01-01 22:52:58', 0, 0.00),
(19, 'USER', 'N°1', 'test@user.mmi', '$2y$10$4OVKz62WRV54BURtlsNlh.HXcY9r0jwprIBGBPgmmekFz7Tk/bd4m', '2026-01-01 22:54:53', NULL, NULL, 'user', 20, 'Paris', '75001', NULL, 0, 0.00),
(20, 'USER', 'N°2', 'test@useretud.mmi', '$2y$10$piORoF0qLalU8EFMCKl./.qMbS/4d/8h6k.l.xL.FOFCVb1jsYePu', '2026-01-01 22:56:29', 'f99bce73203418932279aecb3171870d9bedb55266a38dd1ea65fc6bc809f29a', 'student', 'user', 20, 'Paris', '75001', '2026-01-01 22:59:27', 0, 0.00);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `boxes`
--
ALTER TABLE `boxes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `box_flavors`
--
ALTER TABLE `box_flavors`
  ADD PRIMARY KEY (`box_id`,`flavor_id`),
  ADD KEY `flavor_id` (`flavor_id`);

--
-- Index pour la table `box_foods`
--
ALTER TABLE `box_foods`
  ADD PRIMARY KEY (`box_id`,`food_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Index pour la table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`user_id`,`box_id`),
  ADD KEY `box_id` (`box_id`);

--
-- Index pour la table `flavors`
--
ALTER TABLE `flavors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `box_id` (`box_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `boxes`
--
ALTER TABLE `boxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `flavors`
--
ALTER TABLE `flavors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `box_flavors`
--
ALTER TABLE `box_flavors`
  ADD CONSTRAINT `box_flavors_ibfk_1` FOREIGN KEY (`box_id`) REFERENCES `boxes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `box_flavors_ibfk_2` FOREIGN KEY (`flavor_id`) REFERENCES `flavors` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `box_foods`
--
ALTER TABLE `box_foods`
  ADD CONSTRAINT `box_foods_ibfk_1` FOREIGN KEY (`box_id`) REFERENCES `boxes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `box_foods_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`box_id`) REFERENCES `boxes` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`box_id`) REFERENCES `boxes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
