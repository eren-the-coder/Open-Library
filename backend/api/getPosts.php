<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json");

  require 'config.php';

  $result = $conn->query("SELECT * FROM ressources ORDER BY id DESC");

  $posts = [];
  $baseUrl = "http://127.0.0.1/backend/uploads/";

  while ($row = $result->fetch_assoc()) {
      if (!empty($row['file'])) {
          $row['fileUrl'] = $baseUrl . $row['file'];
      } else {
          $row['fileUrl'] = null;
      }
      $posts[] = $row;
  }

  echo json_encode(["success" => true, "data" => $posts]);

?>