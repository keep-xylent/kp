<?php
// ============================================================
// kp-api/models/Project.php
// ============================================================

class Project {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /** Get all active projects with category name */
    public function getAll(array $filters = []): array {
        $where  = ['1=1'];
        $params = [];

        if (!empty($filters['status'])) {
            $where[]           = 'p.status = :status';
            $params[':status'] = $filters['status'];
        }
        if (!empty($filters['category_id'])) {
            $where[]                = 'p.category_id = :category_id';
            $params[':category_id'] = (int)$filters['category_id'];
        }
        if (!empty($filters['category_slug'])) {
            $where[]                    = 'c.slug = :category_slug';
            $params[':category_slug']   = $filters['category_slug'];
        }

        $sql = "SELECT p.*, c.name AS category_name, c.slug AS category_slug
                FROM projects p
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE " . implode(' AND ', $where) . "
                ORDER BY p.created_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    /** Get a single project with its gallery */
    public function findById(int $id, bool $withGallery = true): array|false {
        $stmt = $this->db->prepare(
            "SELECT p.*, c.name AS category_name, c.slug AS category_slug
             FROM projects p
             LEFT JOIN categories c ON p.category_id = c.id
             WHERE p.id = ?"
        );
        $stmt->execute([$id]);
        $project = $stmt->fetch();
        if ($project && $withGallery) {
            $project['gallery'] = (new Gallery())->getByProjectId($id);
        }
        return $project;
    }

    public function findBySlug(string $slug, bool $withGallery = true): array|false {
        $stmt = $this->db->prepare(
            "SELECT p.*, c.name AS category_name, c.slug AS category_slug
             FROM projects p
             LEFT JOIN categories c ON p.category_id = c.id
             WHERE p.slug = ?"
        );
        $stmt->execute([$slug]);
        $project = $stmt->fetch();
        if ($project && $withGallery) {
            $project['gallery'] = (new Gallery())->getByProjectId($project['id']);
        }
        return $project;
    }

    public function create(array $data): int|false {
        $stmt = $this->db->prepare(
            "INSERT INTO projects (title, slug, category_id, address, description, thumbnail, status)
             VALUES (:title, :slug, :category_id, :address, :description, :thumbnail, :status)"
        );
        $stmt->execute([
            ':title'       => $data['title'],
            ':slug'        => $data['slug'],
            ':category_id' => $data['category_id'],
            ':address'     => $data['address'] ?? '',
            ':description' => $data['description'] ?? null,
            ':thumbnail'   => $data['thumbnail'] ?? null,
            ':status'      => $data['status'] ?? 'draft',
        ]);
        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool {
        $fields = [];
        $params = [':id' => $id];

        $allowed = ['title', 'slug', 'category_id', 'address', 'description', 'thumbnail', 'status'];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $data)) {
                $fields[]          = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }
        if (empty($fields)) return false;

        $sql  = "UPDATE projects SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete(int $id): bool {
        // Gallery will be cascade-deleted by DB foreign key
        $stmt = $this->db->prepare("DELETE FROM projects WHERE id = ?");
        return $stmt->execute([$id]);
    }

    public function slugExists(string $slug, int $excludeId = 0): bool {
        $stmt = $this->db->prepare("SELECT id FROM projects WHERE slug = ? AND id != ?");
        $stmt->execute([$slug, $excludeId]);
        return (bool)$stmt->fetch();
    }

    public static function generateSlug(string $title): string {
        $slug = strtolower(trim($title));
        $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);
        $slug = preg_replace('/[\s_-]+/', '-', $slug);
        return trim($slug, '-');
    }
}
