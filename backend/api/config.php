<?php

  $config = include __DIR__ . '/.env.php';

  if (!is_array($config)) {
      die(json_encode([
          "success" => false,
          "error" => "Le fichier .env.php ne retourne pas de configuration valide."
      ]));
  }

  if ($config['mode'] === 'dev') {
      $host = "localhost";
      $user = "root";
      $pass = "";
      $dbname = "openlibrary";
  } else {
      $host = $config['host'];
      $user = $config['user'];
      $pass = $config['pass'];
      $dbname = $config['dbname'];
  }

  $conn = new mysqli($host, $user, $pass, $dbname);

  if ($conn->connect_error) {
      die(json_encode([
          "success" => false,
          "error" => "Échec de la connexion à la base de données : " . $conn->connect_error
      ]));
  }

  // Encodage UTF-8
  $conn->set_charset("utf8");
?>
