import { useState, useEffect, useCallback } from 'react';
import { getProjects } from '../api/projects';
import { getCategories } from '../api/categories';

/**
 * Fetches projects and categories from the API.
 * Supports filtering by categorySlug or categoryId.
 */
export function useProjects(filters = {}) {
  const [projects,   setProjects]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = { status: 'active', ...filters };
      const [projectsData, categoriesData] = await Promise.all([
        getProjects(params),
        getCategories(),
      ]);

      setProjects(projectsData ?? []);
      setCategories(categoriesData ?? []);
    } catch (err) {
      setError(err.message || 'Gagal memuat data proyek');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { projects, categories, loading, error, refetch: fetchAll };
}
