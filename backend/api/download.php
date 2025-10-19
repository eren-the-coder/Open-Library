<?php

  if (!isset($_GET['file'])) {
      http_response_code(400);
      echo "Fichier non spécifié.";
      exit;
  }

  $file = basename($_GET['file']); // protection basique
  $filePath = __DIR__ . '/../uploads/' . $file;

  if (!file_exists($filePath)) {
      http_response_code(404);
      echo "Fichier introuvable.";
      exit;
  }

  header('Content-Description: File Transfer');
  header('Content-Type: application/octet-stream');
  header('Content-Disposition: attachment; filename="' . $file . '"');
  header('Expires: 0');
  header('Cache-Control: must-revalidate');
  header('Pragma: public');
  header('Content-Length: ' . filesize($filePath));
  readfile($filePath);
  exit;
?>