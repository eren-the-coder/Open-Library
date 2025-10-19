<?php
// backend/public/index.php

$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

if (strpos($path, '/api/') === 0) {
    $apiFile = __DIR__ . "/../api" . substr($path, 4);
    if (file_exists($apiFile)) {
        require $apiFile;
    } else {
        http_response_code(404);
        echo json_encode(["success" => false, "error" => "API non trouvée"]);
    }
} else {
    $frontendFile = __DIR__ . "/../frontend/dist/index.html";
    if (file_exists($frontendFile)) {
        header("Content-Type: text/html");
        echo file_get_contents($frontendFile);
    } else {
        http_response_code(404);
        echo "<h1>Frontend non trouvé</h1>";
    }
}

?>