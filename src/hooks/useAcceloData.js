import { useState, useEffect, useCallback } from 'react';
import { getCompanies } from '../services/acceloApi';

const useAcceloData = (apiKey) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanies = useCallback(async () => {
    if (!apiKey) {
      setCompanies([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getCompanies(apiKey, { standing: 'active' });
      setCompanies(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch companies');
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const refetch = () => {
    fetchCompanies();
  };

  return {
    companies,
    loading,
    error,
    refetch
  };
};

export default useAcceloData;