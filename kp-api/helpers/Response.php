<?php
// ============================================================
// kp-api/helpers/Response.php
// Standard JSON response helper
// ============================================================

class Response {
    public static function json(mixed $data, int $statusCode = 200): void {
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit();
    }

    public static function success(mixed $data = null, string $message = 'Success', int $code = 200): void {
        self::json([
            'success' => true,
            'message' => $message,
            'data'    => $data,
        ], $code);
    }

    public static function error(string $message = 'Error', int $code = 400, mixed $errors = null): void {
        $body = [
            'success' => false,
            'message' => $message,
        ];
        if ($errors !== null) {
            $body['errors'] = $errors;
        }
        self::json($body, $code);
    }

    public static function notFound(string $message = 'Data tidak ditemukan'): void {
        self::error($message, 404);
    }
}
