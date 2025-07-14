<?php
// bukuku-api/seller/index.php
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Baris pertama: include config.php yang sudah kirim header CORS & JSON
require_once __DIR__ . '/../config.php';

// pastikan tidak ada kode lain (mysqli, var_dump, echo) sebelum ini

try {
    // 1) Tanyakan semua seller
    $stmt    = $db->query("SELECT * FROM sellers ORDER BY id DESC");
    $sellers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 2) Kirim satu-satunya response JSON
    echo json_encode([
        'success' => true,
        'data'    => $sellers
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'DB query failed: ' . $e->getMessage()
    ]);
}
