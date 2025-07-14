<?php
// bukuku-api/seller/register.php
require_once __DIR__ . '/../config.php';

$body = json_decode(file_get_contents('php://input'), true);
if (
    empty($body['store_name']) ||
    empty($body['owner_name']) ||
    empty($body['email'])
) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error'   => 'Missing required fields'
    ]);
    exit;
}

try {
    $stmt = $db->prepare(
        "INSERT INTO sellers 
         (store_name, owner_name, email, phone, address, commission_rate) 
         VALUES 
         (:store, :owner, :email, :phone, :addr, :rate)"
    );
    $stmt->execute([
        ':store' => $body['store_name'],
        ':owner' => $body['owner_name'],
        ':email' => $body['email'],
        ':phone' => $body['phone']           ?? '',
        ':addr'  => $body['address']         ?? '',
        ':rate'  => $body['commission_rate'] ?? 10,
    ]);

    echo json_encode([
        'success'   => true,
        'insert_id' => $db->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'DB insert failed: ' . $e->getMessage()
    ]);
}
