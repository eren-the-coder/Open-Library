<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json");

  require 'config.php';
  $env = include __DIR__ . '/.env.php';

  // uploads folder path
  $baseUrl = $env['mode'] === 'prod'
      ? $env['baseUrl_prod']
      : $env['baseUrl_dev'];

  $result = $conn->query("SELECT * FROM ressources ORDER BY id DESC");

  $posts = [];

  while ($row = $result->fetch_assoc()) {
      $row['fileUrl'] = !empty($row['file']) ? $baseUrl . $row['file'] : null;
      $posts[] = $row;
  }

  echo json_encode(["success" => true, "data" => $posts]);
?>
