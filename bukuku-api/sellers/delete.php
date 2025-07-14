<?php
// bukuku-api/seller/delete.php
require_once __DIR__ . '/../config.php';

// terima JSON { id:123 }
$body = json_decode(file_get_contents('php://input'), true);
$id   = (int) ($body['id'] ?? 0);
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['success'=>false, 'error'=>'Invalid id']);
    exit;
}

$stmt = $mysqli->prepare("DELETE FROM sellers WHERE id = ?");
$stmt->bind_param('i', $id);
if ($stmt->execute()) {
    echo json_encode(['success'=>true]);
} else {
    http_response_code(500);
    echo json_encode(['success'=>false, 'error'=>'DB delete failed']);
}
