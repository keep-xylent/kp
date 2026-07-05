import { useState, useEffect } from 'react';
import { getProjectById } from '../api/projects';

/**
 * Fetches a single project (with gallery) by ID.
 */
export function useProjectDetail(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getProjectById(id)
      .then((data) => {
        if (!cancelled) setProject(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Gagal memuat detail proyek');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  return { project, loading, error };
}
