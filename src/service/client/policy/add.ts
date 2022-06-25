import { useBoolean } from 'react-use';
import { useCallback, useState } from 'react';
import {
  AddPoliciesArguments,
  MutationPoliciesResponse,
} from '../interface/policy';
import { useFetcher } from '../../context/fetcher';

export const useAddPolicies = () => {
  const fetcher = useFetcher();
  const [loading, setLoading] = useBoolean(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<MutationPoliciesResponse>();

  const Fn = useCallback(
    async (args: AddPoliciesArguments) => {
      setLoading();
      try {
        const response = await fetcher('/add/policies', { data: args });
        setData(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading();
    },
    [fetcher, setLoading]
  );

  return [{ data, loading, error }, Fn];
};
