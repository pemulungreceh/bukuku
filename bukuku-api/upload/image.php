<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Check if file was uploaded
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "error" => "No file uploaded or upload error"
    ));
    exit();
}

$file = $_FILES['image'];
$folder = $_POST['folder'] ?? 'general';

// Validate file type
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "error" => "Invalid file type. Only JPG, PNG, and GIF are allowed."
    ));
    exit();
}

// Validate file size (5MB max)
$maxSize = 5 * 1024 * 1024; // 5MB
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "error" => "File size too large. Maximum 5MB allowed."
    ));
    exit();
}

// Create date-based folder structure
$currentDate = new DateTime();
$year = $currentDate->format('Y');
$month = $currentDate->format('m');
$day = $currentDate->format('d');

$uploadDir = "../uploads/{$folder}/{$year}/{$month}/{$day}/";

// Create directory if it doesn't exist
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(array(
            "success" => false,
            "error" => "Failed to create upload directory"
        ));
        exit();
    }
}

// Generate unique filename
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$filename = uniqid() . '_' . time() . '.' . $extension;
$targetPath = $uploadDir . $filename;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    $publicUrl = "http://localhost/bukuku-api/uploads/{$folder}/{$year}/{$month}/{$day}/{$filename}";
    
    http_response_code(200);
    echo json_encode(array(
        "success" => true,
        "message" => "File uploaded successfully",
        "data" => array(
            "filename" => $filename,
            "path" => $targetPath,
            "url" => $publicUrl,
            "size" => $file['size'],
            "type" => $file['type']
        )
    ));
} else {
    http_response_code(500);
    echo json_encode(array(
        "success" => false,
        "error" => "Failed to move uploaded file"
    ));
}
?>