<?php
// config.php

// ———————————— RESPONSE HEADER ————————————
// Semua response dikirim sebagai JSON
header('Content-Type: application/json');

// ————————————— CORS —————————————
// Ganti origin di bawah dengan URL front-end Anda
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Untuk preflight
    http_response_code(200);
    exit;
}
// ———————————— END CORS ————————————

class Database {
    private $host     = "localhost";
    private $db_name  = "bukuku_ecommerce";
    private $username = "root";
    private $password = "";
    public  $conn;

    public function getConnection() {
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name};charset=utf8",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error'   => 'DB Connection failed: ' . $e->getMessage()
            ]);
            exit;
        }
        return $this->conn;
    }
}

// Buat koneksi dan expose sebagai $db
$db = (new Database())->getConnection();
