import api from './axios';

/** Fetch all categories */
export const getCategories = () =>
  api.get('/api/categories').then((r) => r.data.data);

/** Create a category */
export const createCategory = (data) =>
  api.post('/api/categories', data).then((r) => r.data.data);

/** Update a category */
export const updateCategory = (id, data) =>
  api.put(`/api/categories/${id}`, data).then((r) => r.data.data);

/** Delete a category */
export const deleteCategory = (id) =>
  api.delete(`/api/categories/${id}`).then((r) => r.data);
