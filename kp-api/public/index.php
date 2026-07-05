<?php
// ============================================================
// kp-api/public/index.php  –  Front Controller / Router
// ============================================================

define('ROOT_PATH', dirname(__DIR__));

// Load config (sets CORS headers, constants, session)
require_once ROOT_PATH . '/config/config.php';

// Autoload all classes
$autoloadDirs = [
    ROOT_PATH . '/config',
    ROOT_PATH . '/helpers',
    ROOT_PATH . '/models',
    ROOT_PATH . '/controllers',
];
foreach ($autoloadDirs as $dir) {
    foreach (glob($dir . '/*.php') as $file) {
        require_once $file;
    }
}

// ─── Parse URL ───────────────────────────────────────────────
$requestUri    = $_SERVER['REQUEST_URI'];
$scriptDir     = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$path          = substr($requestUri, strlen($scriptDir));
$path          = strtok($path, '?');          // strip query string
$path          = '/' . trim($path, '/');      // normalize
$method        = strtoupper($_SERVER['REQUEST_METHOD']);

// Support _method override for PUT/DELETE via forms
if ($method === 'POST' && !empty($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
}

// ─── Route Definitions ────────────────────────────────────────
function matchRoute(string $pattern, string $path, array &$params): bool {
    $regex = preg_replace('/\{(\w+)\}/', '(\d+|\w[^/]*)', $pattern);
    $regex = '#^' . $regex . '$#';
    if (preg_match($regex, $path, $matches)) {
        array_shift($matches);
        $params = $matches;
        return true;
    }
    return false;
}

$params = [];

try {
    // ── Categories ────────────────────────────────────────────
    if ($method === 'GET' && matchRoute('/api/categories', $path, $params)) {
        (new CategoryController())->index();
    } elseif ($method === 'GET' && matchRoute('/api/categories/{id}', $path, $params)) {
        (new CategoryController())->show((int)$params[0]);
    } elseif ($method === 'POST' && matchRoute('/api/categories', $path, $params)) {
        (new CategoryController())->store();
    } elseif ($method === 'PUT' && matchRoute('/api/categories/{id}', $path, $params)) {
        (new CategoryController())->update((int)$params[0]);
    } elseif ($method === 'DELETE' && matchRoute('/api/categories/{id}', $path, $params)) {
        (new CategoryController())->destroy((int)$params[0]);

    // ── Gallery (project-scoped) ───────────────────────────────
    } elseif ($method === 'GET' && matchRoute('/api/projects/{id}/gallery', $path, $params)) {
        (new GalleryController())->indexByProject((int)$params[0]);
    } elseif ($method === 'POST' && matchRoute('/api/projects/{id}/gallery/reorder', $path, $params)) {
        (new GalleryController())->reorder((int)$params[0]);
    } elseif ($method === 'POST' && matchRoute('/api/projects/{id}/gallery', $path, $params)) {
        (new GalleryController())->store((int)$params[0]);

    // ── Gallery (standalone) ───────────────────────────────────
    } elseif (($method === 'PUT' || $method === 'POST') && matchRoute('/api/gallery/{id}', $path, $params)) {
        (new GalleryController())->update((int)$params[0]);
    } elseif ($method === 'DELETE' && matchRoute('/api/gallery/{id}', $path, $params)) {
        (new GalleryController())->destroy((int)$params[0]);

    // ── Projects ──────────────────────────────────────────────
    } elseif ($method === 'GET' && matchRoute('/api/projects/slug/{slug}', $path, $params)) {
        (new ProjectController())->showBySlug($params[0]);
    } elseif ($method === 'GET' && matchRoute('/api/projects/{id}', $path, $params)) {
        (new ProjectController())->show((int)$params[0]);
    } elseif ($method === 'GET' && matchRoute('/api/projects', $path, $params)) {
        (new ProjectController())->index();
    } elseif ($method === 'POST' && matchRoute('/api/projects', $path, $params)) {
        (new ProjectController())->store();
    } elseif (($method === 'PUT' || $method === 'POST') && matchRoute('/api/projects/{id}', $path, $params)) {
        (new ProjectController())->update((int)$params[0]);
    } elseif ($method === 'DELETE' && matchRoute('/api/projects/{id}', $path, $params)) {
        (new ProjectController())->destroy((int)$params[0]);

    // ── Users ─────────────────────────────────────────────────
    } elseif ($method === 'POST' && matchRoute('/api/login', $path, $params)) {
        (new UserController())->login();


    // ── Settings ──────────────────────────────────────────────
    } elseif ($method === 'GET' && matchRoute('/api/settings', $path, $params)) {
        (new SettingController())->index();
    } elseif (($method === 'POST' || $method === 'PUT') && matchRoute('/api/settings', $path, $params)) {
        (new SettingController())->update();

    // ── 404 ───────────────────────────────────────────────────
    } else {
        Response::error("Endpoint tidak ditemukan: [$method] $path", 404);
    }
} catch (PDOException $e) {
    Response::error('Database error: ' . $e->getMessage(), 500);
} catch (Exception $e) {
    Response::error('Server error: ' . $e->getMessage(), 500);
}
