<?php
  // $host = "localhost";
  // $user = "root";
  // $pass = ""; // XAMPP par défaut n’a pas de mot de passe root
  // $dbname = "openlibrary";

  $host = $config['host'];
  $user = $config['user'];
  $pass = $config['pass'];
  $dbname = $config['dbname'];

  $conn = new mysqli($host, $user, $pass, $dbname);

  if ($conn->connect_error) {
      die(json_encode([
          "success" => false,
          "error" => "Échec de la connexion à la base de données : " . $conn->connect_error
      ]));
  }
  // Définir le jeu de caractères UTF-8
  $conn->set_charset("utf8");
?>
