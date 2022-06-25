import { createContext, useContext } from 'react';
import { AxiosInstance } from 'axios';

export const Fetcher = createContext<AxiosInstance>(null as never);

export const useFetcher = () => useContext(Fetcher);
export const FetcherProvider = Fetcher.Provider;
