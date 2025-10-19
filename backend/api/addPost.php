<?php
	// =======================================
	// Config PHP pour debug et headers
	// =======================================
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: POST, OPTIONS");
	header("Access-Control-Allow-Headers: Content-Type, Authorization");
	header("Content-Type: application/json");

	// Gestion des requêtes OPTIONS (préflight CORS)
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		http_response_code(200);
		exit;
	}

	// Vérifie la méthode POST
	if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	echo json_encode(["success" => false, "error" => "Méthode non autorisée"]);
	exit;
	}

	// =======================================
	// Connexion à la base
	// =======================================
	require 'config.php';

	if (!$conn) {
		echo json_encode(["success" => false, "error" => "Erreur connexion DB : " . mysqli_connect_error()]);
	exit;
	}

	// =======================================
	// Récupération des champs
	// =======================================
	$name = $_POST['name'] ?? null;
	$description = $_POST['description'] ?? null; 
	$type = $_POST['type'] ?? null;
	$teachingUnit = $_POST['teachingUnit'] ?? null;
	$authorId = $_POST['authorId'] ?? null;
	$fileName = null;

	// =======================================
	// Validation des champs requis
	// =======================================
	if (empty($name) || empty($type) || empty($teachingUnit)) {
		echo json_encode(["success" => false, "error" => "Champs requis manquants"]);
		exit;
	}

	// =======================================
	// Upload du fichier si nécessaire
	// =======================================
	if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
		$allowedTypes = [
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		];

		$fileType = $_FILES['file']['type'];
		if (!in_array($fileType, $allowedTypes)) {
			echo json_encode(["success" => false, "error" => "Type de fichier non autorisé"]);
			exit;
		}

		$uploadDir = __DIR__ . '/../uploads/';
		// if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
		if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
			echo json_encode(["success" => false, "error" => "Impossible de créer le répertoire d'upload", $uploadDir]);
			exit;
		}

		$fileTmpPath = $_FILES['file']['tmp_name'];
		$originalName = basename($_FILES['file']['name']);
		$fileName = time() . '_' . $originalName;
		$destPath = $uploadDir . $fileName;

		if (!move_uploaded_file($fileTmpPath, $destPath)) {
			echo json_encode(["success" => false, "error" => "Erreur lors de l'upload du fichier."]);
			exit;
		}
	}

	// =======================================
	// Insertion dans la base
	// =======================================
	$sql = "INSERT INTO ressources (name, description, type, teachingUnit, authorId, file) VALUES (?, ?, ?, ?, ?, ?)";
	$stmt = $conn->prepare($sql);
	if (!$stmt) {
	echo json_encode(["success" => false, "error" => "Erreur préparation requête : " . $conn->error]);
	exit;
	}

	$stmt->bind_param("ssssss", $name, $description, $type, $teachingUnit, $authorId, $fileName);

	if ($stmt->execute()) {
	echo json_encode([
		"success" => true,
		"id" => $stmt->insert_id,
		"file" => $fileName // null si pas de fichier
	]);
	} else {
	echo json_encode(["success" => false, "error" => "Erreur exécution requête : " . $stmt->error]);
	}

	$stmt->close();
	$conn->close();
?>
