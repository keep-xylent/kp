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
}
