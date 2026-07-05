<?php
// ============================================================
// kp-api/controllers/UserController.php
// ============================================================

class UserController {
    private User $model;

    public function __construct() {
        $this->model = new User();
    }

    /** GET /api/users */
    public function index(): void {
        $users = $this->model->getAll();
        Response::success($users);
    }

    /** GET /api/users/{id} */
    public function show(int $id): void {
        $user = $this->model->findById($id);
        if (!$user) Response::notFound('User tidak ditemukan');
        Response::success($user);
    }

    /** POST /api/login */
    public function login(): void {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];
        $email = trim($body['email'] ?? '');
        $password = trim($body['password'] ?? '');

        if (empty($email) || empty($password)) {
            Response::error('Email dan password wajib diisi', 422);
        }

        $user = $this->model->findByEmail($email);
        if (!$user || !password_verify($password, $user['password'])) {
            Response::error('Email atau password salah', 401);
        }

        unset($user['password']); // remove hash before returning
        Response::success($user, 'Login berhasil');
    }
    /** POST /api/users */
    public function create(): void {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];
        if (empty($body['name']) || empty($body['email']) || empty($body['password'])) {
            Response::error('Nama, email, dan password wajib diisi', 422);
        }

        // Check email exists
        if ($this->model->findByEmail($body['email'])) {
            Response::error('Email sudah terdaftar', 422);
        }

        $id = $this->model->create($body);
        $user = $this->model->findById($id);
        Response::success($user, 'User berhasil dibuat', 201);
    }

    /** PUT /api/users/{id} */
    public function update(int $id): void {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];
        $existing = $this->model->findById($id);
        if (!$existing) Response::notFound('User tidak ditemukan');

        if (empty($body['name']) || empty($body['email'])) {
            Response::error('Nama dan email wajib diisi', 422);
        }

        // Check email if changed
        if ($body['email'] !== $existing['email']) {
            if ($this->model->findByEmail($body['email'])) {
                Response::error('Email sudah terdaftar', 422);
            }
        }

        $this->model->update($id, $body);
        $updated = $this->model->findById($id);
        Response::success($updated, 'User berhasil diperbarui');
    }

    /** DELETE /api/users/{id} */
    public function delete(int $id): void {
        $existing = $this->model->findById($id);
        if (!$existing) Response::notFound('User tidak ditemukan');
        
        $this->model->delete($id);
        Response::success(null, 'User berhasil dihapus');
    }
}
