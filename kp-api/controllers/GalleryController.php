<?php
// ============================================================
// kp-api/controllers/GalleryController.php
// ============================================================

class GalleryController {
    private Gallery $model;
    private Project $projectModel;

    public function __construct() {
        $this->model        = new Gallery();
        $this->projectModel = new Project();
    }

    /** GET /api/projects/{projectId}/gallery */
    public function indexByProject(int $projectId): void {
        $project = $this->projectModel->findById($projectId, false);
        if (!$project) Response::notFound('Proyek tidak ditemukan');
        $gallery = $this->model->getByProjectId($projectId);
        Response::success($gallery);
    }

    /** POST /api/projects/{projectId}/gallery  (multipart/form-data, supports multiple files) */
    public function store(int $projectId): void {
        $project = $this->projectModel->findById($projectId, false);
        if (!$project) Response::notFound('Proyek tidak ditemukan');

        if (empty($_FILES) && empty($_POST['image_url'])) {
            Response::error('Tidak ada file atau URL gambar yang diberikan', 422);
        }

        $created = [];
        $errors  = [];
        $maxOrder = $this->model->maxOrder($projectId);

        // 1. Support single or multiple file inputs: images[] or image
        $files = [];
        if (!empty($_FILES['images']['name']) && is_array($_FILES['images']['name'])) {
            foreach ($_FILES['images']['name'] as $i => $name) {
                if (!empty($name)) {
                    $files[] = [
                        'name'     => $name,
                        'type'     => $_FILES['images']['type'][$i],
                        'tmp_name' => $_FILES['images']['tmp_name'][$i],
                        'error'    => $_FILES['images']['error'][$i],
                        'size'     => $_FILES['images']['size'][$i],
                    ];
                }
            }
        } elseif (!empty($_FILES['image']['name'])) {
            $files[] = $_FILES['image'];
        }

        foreach ($files as $idx => $file) {
            $upload = FileUpload::uploadImage($file);
            if (!$upload['success']) {
                $errors[] = "File[$idx]: " . $upload['message'];
                continue;
            }

            $titles       = $_POST['title']       ?? [];
            $descriptions = $_POST['description'] ?? [];
            $title        = is_array($titles)       ? ($titles[$idx]       ?? null) : $titles;
            $description  = is_array($descriptions) ? ($descriptions[$idx] ?? null) : $descriptions;

            $id       = $this->model->create([
                'project_id'  => $projectId,
                'image'       => $upload['filename'],
                'title'       => $title,
                'description' => $description,
                'sort_order'  => ++$maxOrder,
            ]);
            $created[] = $this->model->findById($id);
        }

        // 2. Support online URLs: image_url (can be string or array)
        if (!empty($_POST['image_url'])) {
            $urls = (array)$_POST['image_url'];
            foreach ($urls as $idx => $url) {
                if (!filter_var($url, FILTER_VALIDATE_URL)) {
                    $errors[] = "URL[$idx]: URL tidak valid";
                    continue;
                }
                
                $id = $this->model->create([
                    'project_id'  => $projectId,
                    'image'       => $url,
                    'title'       => null,
                    'description' => null,
                    'sort_order'  => ++$maxOrder,
                ]);
                $created[] = $this->model->findById($id);
            }
        }

        if (empty($created) && !empty($errors)) {
            Response::error('Semua file gagal diunggah', 422, $errors);
        }

        Response::success(
            ['created' => $created, 'errors' => $errors],
            count($created) . ' gambar berhasil diunggah',
            201
        );
    }

    /** PUT /api/gallery/{id}  (multipart/form-data or JSON) */
    public function update(int $id): void {
        $item = $this->model->findById($id);
        if (!$item) Response::notFound('Item gallery tidak ditemukan');

        $data = [];

        // Handle possible image replacement
        if (!empty($_FILES['image']['name'])) {
            $upload = FileUpload::uploadImage($_FILES['image']);
            if (!$upload['success']) {
                Response::error($upload['message'], 422);
            }
            // Delete old image if local
            FileUpload::deleteImage($item['image']);
            $data['image'] = $upload['filename'];
        }

        // Accept JSON or form fields
        if (!empty($_POST)) {
            if (isset($_POST['title']))       $data['title']       = $_POST['title'];
            if (isset($_POST['description'])) $data['description'] = $_POST['description'];
            if (isset($_POST['sort_order']))  $data['sort_order']  = (int)$_POST['sort_order'];
        } else {
            $body = json_decode(file_get_contents('php://input'), true) ?? [];
            if (array_key_exists('title', $body))       $data['title']       = $body['title'];
            if (array_key_exists('description', $body)) $data['description'] = $body['description'];
            if (isset($body['sort_order']))              $data['sort_order']  = (int)$body['sort_order'];
        }

        $this->model->update($id, $data);
        Response::success($this->model->findById($id), 'Gambar berhasil diperbarui');
    }

    /** DELETE /api/gallery/{id} */
    public function destroy(int $id): void {
        $item = $this->model->findById($id);
        if (!$item) Response::notFound('Item gallery tidak ditemukan');
        FileUpload::deleteImage($item['image']);
        $this->model->delete($id);
        Response::success(null, 'Gambar berhasil dihapus');
    }

    /** POST /api/projects/{projectId}/gallery/reorder  — body: { "order": [3,1,2] } */
    public function reorder(int $projectId): void {
        $project = $this->projectModel->findById($projectId, false);
        if (!$project) Response::notFound('Proyek tidak ditemukan');

        $body = json_decode(file_get_contents('php://input'), true) ?? [];
        $orderedIds = $body['order'] ?? [];

        if (empty($orderedIds) || !is_array($orderedIds)) {
            Response::error('Array urutan (order) wajib diisi', 422);
        }

        $this->model->reorder(array_map('intval', $orderedIds));
        Response::success($this->model->getByProjectId($projectId), 'Urutan berhasil diperbarui');
    }
}
