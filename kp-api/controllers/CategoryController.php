<?php
// ============================================================
// kp-api/controllers/CategoryController.php
// ============================================================

class CategoryController {
    private Category $model;

    public function __construct() {
        $this->model = new Category();
    }

    /** GET /api/categories */
    public function index(): void {
        $categories = $this->model->getAll();
        Response::success($categories);
    }

    /** GET /api/categories/{id} */
    public function show(int $id): void {
        $category = $this->model->findById($id);
        if (!$category) Response::notFound('Kategori tidak ditemukan');
        Response::success($category);
    }

    /** POST /api/categories */
    public function store(): void {
        $body = $this->getJsonBody();
        $name = trim($body['name'] ?? '');

        if (empty($name)) {
            Response::error('Nama kategori wajib diisi', 422);
        }

        $slug = $this->generateSlug($name);
        if ($this->model->slugExists($slug)) {
            $slug .= '-' . time();
        }

        $id = $this->model->create(['name' => $name, 'slug' => $slug]);
        $category = $this->model->findById($id);
        Response::success($category, 'Kategori berhasil ditambahkan', 201);
    }

    /** PUT /api/categories/{id} */
    public function update(int $id): void {
        $category = $this->model->findById($id);
        if (!$category) Response::notFound('Kategori tidak ditemukan');

        $body = $this->getJsonBody();
        $name = trim($body['name'] ?? $category['name']);
        $slug = trim($body['slug'] ?? $this->generateSlug($name));

        if ($this->model->slugExists($slug, $id)) {
            $slug .= '-' . time();
        }

        $this->model->update($id, ['name' => $name, 'slug' => $slug]);
        Response::success($this->model->findById($id), 'Kategori berhasil diperbarui');
    }

    /** DELETE /api/categories/{id} */
    public function destroy(int $id): void {
        $category = $this->model->findById($id);
        if (!$category) Response::notFound('Kategori tidak ditemukan');
        $this->model->delete($id);
        Response::success(null, 'Kategori berhasil dihapus');
    }

    private function getJsonBody(): array {
        $raw = file_get_contents('php://input');
        return json_decode($raw, true) ?? [];
    }

    private function generateSlug(string $text): string {
        $slug = strtolower(trim($text));
        $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);
        $slug = preg_replace('/[\s_-]+/', '-', $slug);
        return trim($slug, '-');
    }
}
