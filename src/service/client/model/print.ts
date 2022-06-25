import { useEffect, useState } from 'react';
import { useFetcher } from '../../context/fetcher';

export const usePrintModel = () => {
  const fetcher = useFetcher();
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<string[]>();

  useEffect(() => {
    fetcher
      .get('/model')
      .then((res) => setData(res.data))
      .catch(setError);
  }, [fetcher]);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
