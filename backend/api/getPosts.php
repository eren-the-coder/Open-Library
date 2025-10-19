<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json");

  require 'config.php';

  $result = $conn->query("SELECT * FROM ressources ORDER BY id DESC");

  $posts = [];
  while ($row = $result->fetch_assoc()) {
      $posts[] = $row;
  }

  echo json_encode(["success" => true, "data" => $posts]);

?>