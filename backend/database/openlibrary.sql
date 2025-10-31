-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : sql206.infinityfree.com
-- Généré le :  jeu. 30 oct. 2025 à 10:41
-- Version du serveur :  11.4.7-MariaDB
-- Version de PHP :  7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `if0_40206797_openlibrary`
--

-- --------------------------------------------------------

--
-- Structure de la table `ressources`
--

CREATE TABLE `ressources` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `teachingUnit` varchar(50) NOT NULL,
  `authorId` varchar(100) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `validated` tinyint(1) DEFAULT 0,
  `views` int(11) DEFAULT 0,
  `downloads` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Structure de la table `teachingUnit`
--

CREATE TABLE `teachingUnit` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `semester` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `teachingUnit`
--

INSERT INTO `teachingUnit` (`id`, `code`, `name`, `semester`) VALUES
(1, 'INF111', 'Structuration des algorithmes', 1),
(2, 'INF131', 'Systèmes et réseaux', 1),
(3, 'INF121', 'Architecture des ordinateurs', 2),
(4, 'INF151', 'Systèmes d’exploitation', 2),
(5, 'MAT131', 'Analyse de la droite réelle', 1),
(6, 'PHY161', 'Eléctronique numérique', 1),
(7, 'INF141', 'Sécurité informatique', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ressources`
--
ALTER TABLE `ressources`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `teachingUnit`
--
ALTER TABLE `teachingUnit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ressources`
--
ALTER TABLE `ressources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `teachingUnit`
--
ALTER TABLE `teachingUnit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
