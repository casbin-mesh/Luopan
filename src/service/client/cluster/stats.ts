import { useAsyncFn } from 'react-use';
import { useFetcher } from '../../context/fetcher';
import { Stats } from '../interface';

export const useStats = () => {
  const fetcher = useFetcher();
  return useAsyncFn(async () => {
    const { data } = await fetcher.get<Stats>('/stats');
    return data;
  });
};
