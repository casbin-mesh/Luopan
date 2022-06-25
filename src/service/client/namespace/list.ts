import { useAsyncFn } from 'react-use';
import { useFetcher } from '../../context/fetcher';

export const useListNamespaces = () => {
  const fetcher = useFetcher();

  return useAsyncFn(async () => {
    const { data } = await fetcher.get<string[]>('/list/namespaces');
    return data;
  });
};
