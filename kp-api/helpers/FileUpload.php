<?php
// ============================================================
// kp-api/helpers/FileUpload.php
// Image upload helper with validation
// ============================================================

class FileUpload {
    /**
     * Upload a single image file.
     * @param array $file  – $_FILES['field'] entry
     * @param string $dir  – absolute destination directory
     * @return array ['success' => bool, 'filename' => string, 'message' => string]
     */
    public static function uploadImage(array $file, string $dir = UPLOAD_DIR): array {
        // Check for upload error
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'filename' => '', 'message' => 'Upload gagal: error code ' . $file['error']];
        }

        // Validate size
        if ($file['size'] > MAX_FILE_SIZE) {
            return ['success' => false, 'filename' => '', 'message' => 'Ukuran file melebihi batas 5 MB'];
        }

        // Validate MIME type via finfo
        $finfo    = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($file['tmp_name']);
        if (!in_array($mimeType, ALLOWED_MIME)) {
            return ['success' => false, 'filename' => '', 'message' => 'Tipe file tidak diizinkan. Gunakan JPG, PNG, WEBP, atau GIF'];
        }

        // Generate unique filename
        $ext      = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $filename = date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $ext;

        // Ensure directory exists
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        $destination = rtrim($dir, '/') . '/' . $filename;
        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            return ['success' => false, 'filename' => '', 'message' => 'Gagal memindahkan file ke server'];
        }

        return ['success' => true, 'filename' => $filename, 'message' => 'Upload berhasil'];
    }

    /**
     * Delete a file if it exists and is a local file (not external URL).
     */
    public static function deleteImage(string $filename, string $dir = UPLOAD_DIR): bool {
        if (empty($filename) || str_starts_with($filename, 'http')) {
            return false; // skip external URLs (used in seeder data)
        }
        $path = rtrim($dir, '/') . '/' . $filename;
        if (file_exists($path)) {
            return unlink($path);
        }
        return false;
    }
}
