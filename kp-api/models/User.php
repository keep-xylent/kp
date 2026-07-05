<?php
// ============================================================
// kp-api/models/User.php
// ============================================================

class User {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll(): array {
        $stmt = $this->db->query(
            "SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY id ASC"
        );
        return $stmt->fetchAll();
    }

    public function findById(int $id): array|false {
        $stmt = $this->db->prepare(
            "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?"
        );
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function findByEmail(string $email): array|false {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }
    public function create(array $data): int {
        $stmt = $this->db->prepare(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([
            $data['name'],
            $data['email'],
            password_hash($data['password'], PASSWORD_DEFAULT),
            $data['role'] ?? 'admin'
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool {
        // If password is provided, update it too
        if (!empty($data['password'])) {
            $stmt = $this->db->prepare(
                "UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?"
            );
            return $stmt->execute([
                $data['name'],
                $data['email'],
                password_hash($data['password'], PASSWORD_DEFAULT),
                $data['role'] ?? 'admin',
                $id
            ]);
        } else {
            $stmt = $this->db->prepare(
                "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?"
            );
            return $stmt->execute([
                $data['name'],
                $data['email'],
                $data['role'] ?? 'admin',
                $id
            ]);
        }
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM users WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
