<?php
  ini_set('display_errors', 1);
  error_reporting(E_ALL);
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json");

  // Connexion DB
  require 'config.php';
  if (!$conn) {
      echo json_encode(["success" => false, "error" => "Erreur connexion DB : " . mysqli_connect_error()]);
      exit;
  }

  // Récupération des unités
  $sql = "SELECT id, code, name, semester FROM teachingUnit ORDER BY code";
  $result = $conn->query($sql);

  $units = [];
  if ($result) {
      while ($row = $result->fetch_assoc()) {
          $units[] = $row;
      }
      echo json_encode(["success" => true, "units" => $units]);
  } else {
      echo json_encode(["success" => false, "error" => $conn->error]);
  }

  $conn->close();
?>
