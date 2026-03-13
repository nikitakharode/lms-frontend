import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { enabled = true, fallback = null } = options;

  const fetch = useCallback(async () => {
    if (!url || !enabled) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
      if (fallback !== null) setData(fallback);
    } finally {
      setLoading(false);
    }
  }, [url, enabled]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
};

export default useFetch;
