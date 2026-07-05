import api from './axios';

/** Fetch all projects. Pass optional params: { status, category_id, category_slug } */
export const getProjects = (params = {}) =>
  api.get('/api/projects', { params }).then((r) => r.data.data);

/** Fetch a single project with its gallery by numeric ID */
export const getProjectById = (id) =>
  api.get(`/api/projects/${id}`).then((r) => r.data.data);

/** Fetch a single project with its gallery by slug */
export const getProjectBySlug = (slug) =>
  api.get(`/api/projects/slug/${slug}`).then((r) => r.data.data);

/** Fetch gallery items for a project */
export const getProjectGallery = (projectId) =>
  api.get(`/api/projects/${projectId}/gallery`).then((r) => r.data.data);

/** Create a project (FormData) */
export const createProject = (formData) =>
  api.post('/api/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data.data);

/** Update a project (FormData + _method=PUT) */
export const updateProject = (id, formData) => {
  formData.append('_method', 'PUT');
  return api.post(`/api/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data.data);
};

/** Delete a project */
export const deleteProject = (id) =>
  api.delete(`/api/projects/${id}`).then((r) => r.data);

/** Upload gallery images to a project (FormData with images[]) */
export const uploadGallery = (projectId, formData) =>
  api.post(`/api/projects/${projectId}/gallery`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data.data);

/** Update a gallery item */
export const updateGalleryItem = (galleryId, formData) => {
  formData.append('_method', 'PUT');
  return api.post(`/api/gallery/${galleryId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data.data);
};

/** Delete a gallery item */
export const deleteGalleryItem = (galleryId) =>
  api.delete(`/api/gallery/${galleryId}`).then((r) => r.data);

/** Reorder gallery items: orderedIds = [id, id, id, ...] */
export const reorderGallery = (projectId, orderedIds) =>
  api.post(`/api/projects/${projectId}/gallery/reorder`, { order: orderedIds })
    .then((r) => r.data.data);
