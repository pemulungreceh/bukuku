<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->imagePath) || empty($data->imagePath)) {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "error" => "Image path is required"
    ));
    exit();
}

$imagePath = $data->imagePath;

// Convert URL to local path
$localPath = str_replace('http://localhost/bukuku-api/', '../', $imagePath);

// Security check - ensure path is within uploads directory
if (strpos(realpath($localPath), realpath('../uploads/')) !== 0) {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "error" => "Invalid file path"
    ));
    exit();
}

// Delete file if it exists
if (file_exists($localPath)) {
    if (unlink($localPath)) {
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "message" => "File deleted successfully"
        ));
    } else {
        http_response_code(500);
        echo json_encode(array(
            "success" => false,
            "error" => "Failed to delete file"
        ));
    }
} else {
    http_response_code(404);
    echo json_encode(array(
        "success" => false,
        "error" => "File not found"
    ));
}
?>