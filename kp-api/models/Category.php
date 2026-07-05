<?php
// ============================================================
// kp-api/models/Category.php
// ============================================================

class Category {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll(): array {
        $stmt = $this->db->query("SELECT * FROM categories ORDER BY name ASC");
        return $stmt->fetchAll();
    }

    public function findById(int $id): array|false {
        $stmt = $this->db->prepare("SELECT * FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function findBySlug(string $slug): array|false {
        $stmt = $this->db->prepare("SELECT * FROM categories WHERE slug = ?");
        $stmt->execute([$slug]);
        return $stmt->fetch();
    }

    public function create(array $data): int|false {
        $stmt = $this->db->prepare(
            "INSERT INTO categories (name, slug) VALUES (:name, :slug)"
        );
        $stmt->execute([
            ':name' => $data['name'],
            ':slug' => $data['slug'],
        ]);
        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool {
        $stmt = $this->db->prepare(
            "UPDATE categories SET name = :name, slug = :slug WHERE id = :id"
        );
        return $stmt->execute([
            ':name' => $data['name'],
            ':slug' => $data['slug'],
            ':id'   => $id,
        ]);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM categories WHERE id = ?");
        return $stmt->execute([$id]);
    }

    public function slugExists(string $slug, int $excludeId = 0): bool {
        $stmt = $this->db->prepare("SELECT id FROM categories WHERE slug = ? AND id != ?");
        $stmt->execute([$slug, $excludeId]);
        return (bool)$stmt->fetch();
    }
}
