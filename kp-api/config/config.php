<?php
// ============================================================
// kp-api/config/config.php
// ============================================================

// Database
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'company_profile');

// Base URL of this API (adjust to your Laragon domain/alias)
define('API_BASE_URL', 'http://localhost/kp/kp-api/public');

// Upload directory (absolute path)
define('UPLOAD_DIR', dirname(__DIR__) . '/public/uploads/gallery/');

// Upload URL (for building image URLs in response)
define('UPLOAD_URL', API_BASE_URL . '/uploads/gallery/');

// Allowed image MIME types
define('ALLOWED_MIME', ['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

// Max upload size: 5 MB
define('MAX_FILE_SIZE', 5 * 1024 * 1024);

// CORS – allowed origins (adjust as needed)
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost',
    'http://kp-main.test',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: http://localhost:5173');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
