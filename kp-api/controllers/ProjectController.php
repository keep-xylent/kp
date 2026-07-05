<?php
// ============================================================
// kp-api/controllers/ProjectController.php
// ============================================================

class ProjectController {
    private Project $model;

    public function __construct() {
        $this->model = new Project();
    }

    /** GET /api/projects */
    public function index(): void {
        $filters = [];
        if (!empty($_GET['status']))        $filters['status']        = $_GET['status'];
        if (!empty($_GET['category_id']))   $filters['category_id']   = (int)$_GET['category_id'];
        if (!empty($_GET['category_slug'])) $filters['category_slug'] = $_GET['category_slug'];

        $projects = $this->model->getAll($filters);
        Response::success($projects);
    }

    /** GET /api/projects/{id} */
    public function show(int $id): void {
        $project = $this->model->findById($id);
        if (!$project) Response::notFound('Proyek tidak ditemukan');
        Response::success($project);
    }

    /** GET /api/projects/slug/{slug} */
    public function showBySlug(string $slug): void {
        $project = $this->model->findBySlug($slug);
        if (!$project) Response::notFound('Proyek tidak ditemukan');
        Response::success($project);
    }

    /** POST /api/projects  (supports multipart/form-data for thumbnail) */
    public function store(): void {
        $title       = trim($_POST['title']       ?? '');
        $categoryId  = (int)($_POST['category_id'] ?? 0);
        $address     = trim($_POST['address']     ?? '');
        $description = trim($_POST['description'] ?? '');
        $status      = $_POST['status']           ?? 'draft';

        // Validation
        $errors = [];
        if (empty($title))      $errors[] = 'Judul proyek wajib diisi';
        if ($categoryId === 0)  $errors[] = 'Kategori wajib dipilih';
        if (!in_array($status, ['active', 'draft'])) $errors[] = 'Status tidak valid';

        if (!empty($errors)) Response::error('Validasi gagal', 422, $errors);

        // Auto-generate slug
        $slug = Project::generateSlug($title);
        if ($this->model->slugExists($slug)) $slug .= '-' . time();

        // Handle thumbnail upload
        $thumbnail = null;
        if (!empty($_FILES['thumbnail']['name'])) {
            $upload = FileUpload::uploadImage($_FILES['thumbnail']);
            if (!$upload['success']) Response::error($upload['message'], 422);
            $thumbnail = $upload['filename'];
        } elseif (!empty($_POST['thumbnail'])) {
            // Allow passing an external URL directly
            $thumbnail = $_POST['thumbnail'];
        }

        $id      = $this->model->create([
            'title'       => $title,
            'slug'        => $slug,
            'category_id' => $categoryId,
            'address'     => $address,
            'description' => $description,
            'thumbnail'   => $thumbnail,
            'status'      => $status,
        ]);

        $project = $this->model->findById($id);
        Response::success($project, 'Proyek berhasil ditambahkan', 201);
    }

    /** PUT /api/projects/{id}  (multipart/form-data) */
    public function update(int $id): void {
        $project = $this->model->findById($id, false);
        if (!$project) Response::notFound('Proyek tidak ditemukan');

        // PUT via multipart – PHP doesn't parse $_POST for PUT so we fall back to POST fields
        // (Frontend must send as POST with _method=PUT, or use POST for update endpoint)
        $title       = trim($_POST['title']       ?? $project['title']);
        $categoryId  = (int)($_POST['category_id'] ?? $project['category_id']);
        $address     = trim($_POST['address']     ?? $project['address']);
        $description = trim($_POST['description'] ?? $project['description']);
        $status      = $_POST['status']           ?? $project['status'];
        $slug        = $_POST['slug']             ?? $project['slug'];

        // If title changed, re-generate slug
        if ($title !== $project['title'] && empty($_POST['slug'])) {
            $slug = Project::generateSlug($title);
            if ($this->model->slugExists($slug, $id)) $slug .= '-' . time();
        }

        $data = [
            'title'       => $title,
            'slug'        => $slug,
            'category_id' => $categoryId,
            'address'     => $address,
            'description' => $description,
            'status'      => $status,
        ];

        // Handle thumbnail replacement
        if (!empty($_FILES['thumbnail']['name'])) {
            $upload = FileUpload::uploadImage($_FILES['thumbnail']);
            if (!$upload['success']) Response::error($upload['message'], 422);
            // Delete old thumbnail if local file
            if (!empty($project['thumbnail'])) FileUpload::deleteImage($project['thumbnail']);
            $data['thumbnail'] = $upload['filename'];
        } elseif (!empty($_POST['thumbnail'])) {
            $data['thumbnail'] = $_POST['thumbnail'];
        }

        $this->model->update($id, $data);
        Response::success($this->model->findById($id), 'Proyek berhasil diperbarui');
    }

    /** DELETE /api/projects/{id} */
    public function destroy(int $id): void {
        $project = $this->model->findById($id);
        if (!$project) Response::notFound('Proyek tidak ditemukan');

        // Delete gallery files first (physical files only; DB rows cascade)
        foreach ($project['gallery'] as $item) {
            FileUpload::deleteImage($item['image']);
        }
        // Delete thumbnail
        if (!empty($project['thumbnail'])) FileUpload::deleteImage($project['thumbnail']);

        $this->model->delete($id);
        Response::success(null, 'Proyek berhasil dihapus');
    }
}
