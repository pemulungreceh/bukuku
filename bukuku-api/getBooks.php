<?php
// src/api/getBooks.php

// 1) CORS headers — izinkan dev server React di port 5173
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once __DIR__ . '/../config/database.php';
$database = new Database();
$db = $database->getConnection();

// 2) Ambil query params, sanitasi dasar
$featured    = isset($_GET['featured'])    && $_GET['featured']    === '1';
$bestseller  = isset($_GET['bestseller'])  && $_GET['bestseller']  === '1';
$new_arrival = isset($_GET['new_arrival']) && $_GET['new_arrival'] === '1';
$search      = isset($_GET['search'])      ? trim($_GET['search']) : '';
$category    = isset($_GET['category'])    ? trim($_GET['category']): '';
$limit       = isset($_GET['limit'])       ? (int)$_GET['limit']   : 50;
$limit       = $limit > 0 ? $limit : 50;  // fallback

// 3) Bangun SQL dasar dengan parameter terikat
$sql = "
  SELECT 
    b.id,
    b.title,
    b.author,
    b.price,
    b.description,
    c.name AS category_name,
    b.stock,
    b.cover_image,
    b.publish_year,
    b.isbn,
    b.rating,
    b.reviews_count,
    b.featured,
    b.bestseller,
    b.new_arrival,
    b.created_at,
    b.updated_at
  FROM books b
  LEFT JOIN categories c 
    ON b.category_id = c.id
  WHERE b.status = 'active'
";

$params = [];

// 4) Tambahkan kondisi sesuai filter
if ($featured) {
    $sql .= " AND b.featured = 1";
}

if ($bestseller) {
    $sql .= " AND b.bestseller = 1";
}

if ($new_arrival) {
    $sql .= " AND b.new_arrival = 1";
}

if ($search !== '') {
    $sql .= " AND (b.title LIKE :search OR b.author LIKE :search)";
    $params[':search'] = "%{$search}%";
}

if ($category !== '') {
    $sql .= " AND c.slug = :slug";
    $params[':slug'] = $category;
}

// 5) Order & limit
$sql .= " ORDER BY b.created_at DESC LIMIT :limit";
$params[':limit'] = $limit;

try {
    $stmt = $db->prepare($sql);

    // Bind semua parameter (termasuk limit sebagai integer)
    foreach ($params as $key => $val) {
        if ($key === ':limit') {
            $stmt->bindValue($key, $val, PDO::PARAM_INT);
        } else {
            $stmt->bindValue($key, $val, PDO::PARAM_STR);
        }
    }

    $stmt->execute();

    $books = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $books[] = [
            'id'           => $row['id'],
            'title'        => $row['title'],
            'author'       => $row['author'],
            'price'        => (float)$row['price'],
            'description'  => $row['description'],
            'category'     => $row['category_name'] ?? 'Uncategorized',
            'stock'        => (int)$row['stock'],
            'coverImage'   => $row['cover_image'] ?: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
            'publishYear'  => (int)$row['publish_year'],
            'isbn'         => $row['isbn'],
            'rating'       => (float)$row['rating'],
            'reviews'      => (int)$row['reviews_count'],
            'featured'     => (bool)$row['featured'],
            'bestseller'   => (bool)$row['bestseller'],
            'new_arrival'  => (bool)$row['new_arrival'],
            'createdAt'    => $row['created_at'],
            'updatedAt'    => $row['updated_at'],
        ];
    }

    // 6) Output JSON sukses
    echo json_encode([
        'success' => true,
        'data'    => $books,
        'count'   => count($books),
        'message' => 'Data buku berhasil diambil',
    ]);
} catch (PDOException $e) {
    // 7) Tangani error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Database error: ' . $e->getMessage(),
    ]);
    exit();
}
