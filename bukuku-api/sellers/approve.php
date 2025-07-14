<?php
// bukuku-api/seller/approve.php
require_once __DIR__ . '/../config.php';

// untuk kemudahan, kita pakai POST; front-end kirim { id:123, status:'approved' }
$body = json_decode(file_get_contents('php://input'), true);
$id     = (int) ($body['id'] ?? 0);
$status = $mysqli->real_escape_string($body['status'] ?? '');

if ($id <= 0 || !in_array($status, ['pending','approved'], true)) {
    http_response_code(400);
    echo json_encode(['success'=>false, 'error'=>'Invalid id or status']);
    exit;
}

$stmt = $mysqli->prepare(
  "UPDATE sellers 
     SET status = ? 
   WHERE id = ?"
);
$stmt->bind_param('si', $status, $id);
if ($stmt->execute()) {
    echo json_encode(['success'=>true]);
} else {
    http_response_code(500);
    echo json_encode(['success'=>false, 'error'=>'DB update failed']);
}
