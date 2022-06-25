import { useAsyncFn } from 'react-use';
import { useFetcher } from '../../context/fetcher';

export const useCreateNamespace = () => {
  const fetcher = useFetcher();

  return useAsyncFn(async ({ ns, text }) => {
    await fetcher.post('/create/namespace', { ns });
    await fetcher.post('/set/model', { ns, text });
  });
};
