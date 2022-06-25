import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppStore } from './interface';
import createConnectionSlice from './connection';
import createTabSlice from './tab';

export const createRootSlice = (
  set: SetState<AppStore>,
  get: GetState<AppStore>
) => ({
  ...createConnectionSlice(set, get),
  ...createTabSlice(set, get),
});

const useStore = create(persist(createRootSlice, { name: 'app-storage' }));

export default useStore;
