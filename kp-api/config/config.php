<?php
// ============================================================
// kp-api/config/config.php
// ============================================================

// ============================================================
// Database & Environment Auto-Detection
// ============================================================
$is_production = ($_SERVER['HTTP_HOST'] !== 'localhost' && $_SERVER['HTTP_HOST'] !== '127.0.0.1' && strpos($_SERVER['HTTP_HOST'], 'test') === false);

if ($is_production) {
    // 🔴 SETTING PRODUCTION
    define('DB_HOST', 'localhost');
    define('DB_USER', 'db_user');
    define('DB_PASS', 'db_password'); 
    define('DB_NAME', 'db_name'); 

    // Auto-detect base URL di Production
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    define('API_BASE_URL', $protocol . $_SERVER['HTTP_HOST']); 
} else {
    // 🟢 SETTING LARAGON (LOKAL)
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'company_profile');
    
    define('API_BASE_URL', 'http://localhost/kp/kp-api/public');
}

// ============================================================
// Upload & Media Config
// ============================================================
// Upload directory (absolute path)
define('UPLOAD_DIR', dirname(__DIR__) . '/public/uploads/gallery/');

// Upload URL (for building image URLs in response)
define('UPLOAD_URL', API_BASE_URL . '/uploads/gallery/');

// Allowed image MIME types
define('ALLOWED_MIME', ['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

// Max upload size: 5 MB
define('MAX_FILE_SIZE', 5 * 1024 * 1024);

// ============================================================
// CORS (Cross-Origin Resource Sharing)
// ============================================================
// Ambil origin darimana request berasal (misal dari domain Cloudflare Anda)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';

header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight request (CORS method OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
