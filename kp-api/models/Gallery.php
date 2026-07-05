<?php
// ============================================================
// kp-api/models/Gallery.php
// ============================================================

class Gallery {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /** Get all galleries for a project, sorted by sort_order */
    public function getByProjectId(int $projectId): array {
        $stmt = $this->db->prepare(
            "SELECT * FROM galleries WHERE project_id = ? ORDER BY sort_order ASC, id ASC"
        );
        $stmt->execute([$projectId]);
        $items = $stmt->fetchAll();
        // Build full image URL
        return array_map([$this, 'withImageUrl'], $items);
    }

    public function findById(int $id): array|false {
        $stmt = $this->db->prepare("SELECT * FROM galleries WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row) {
            $row = $this->withImageUrl($row);
        }
        return $row;
    }

    public function create(array $data): int|false {
        $stmt = $this->db->prepare(
            "INSERT INTO galleries (project_id, image, title, description, sort_order)
             VALUES (:project_id, :image, :title, :description, :sort_order)"
        );
        $stmt->execute([
            ':project_id'  => $data['project_id'],
            ':image'       => $data['image'],
            ':title'       => $data['title'] ?? null,
            ':description' => $data['description'] ?? null,
            ':sort_order'  => $data['sort_order'] ?? 0,
        ]);
        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool {
        $fields = [];
        $params = [':id' => $id];

        if (isset($data['image'])) {
            $fields[] = 'image = :image';
            $params[':image'] = $data['image'];
        }
        if (array_key_exists('title', $data)) {
            $fields[] = 'title = :title';
            $params[':title'] = $data['title'];
        }
        if (array_key_exists('description', $data)) {
            $fields[] = 'description = :description';
            $params[':description'] = $data['description'];
        }
        if (isset($data['sort_order'])) {
            $fields[] = 'sort_order = :sort_order';
            $params[':sort_order'] = $data['sort_order'];
        }

        if (empty($fields)) return false;

        $sql  = "UPDATE galleries SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM galleries WHERE id = ?");
        return $stmt->execute([$id]);
    }

    /** Bulk update sort_order from ordered array of IDs */
    public function reorder(array $orderedIds): void {
        $stmt = $this->db->prepare("UPDATE galleries SET sort_order = ? WHERE id = ?");
        foreach ($orderedIds as $order => $galleryId) {
            $stmt->execute([$order + 1, $galleryId]);
        }
    }

    /** Get max sort_order for a project */
    public function maxOrder(int $projectId): int {
        $stmt = $this->db->prepare(
            "SELECT COALESCE(MAX(sort_order), 0) FROM galleries WHERE project_id = ?"
        );
        $stmt->execute([$projectId]);
        return (int)$stmt->fetchColumn();
    }

    private function withImageUrl(array $row): array {
        // If image is an external URL keep as-is, otherwise prefix with upload URL
        if (!empty($row['image']) && !str_starts_with($row['image'], 'http')) {
            $row['image_url'] = UPLOAD_URL . $row['image'];
        } else {
            $row['image_url'] = $row['image'];
        }
        return $row;
    }
}
