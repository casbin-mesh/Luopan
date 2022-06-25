import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import {
  ClusterInfo,
  Connection,
  IConnectionSlice,
  StoreSlice,
} from './interface';

const createConnectionSlice: StoreSlice<IConnectionSlice> = (set, get) => ({
  recent: [],
  favorites: [],
  connectionMap: {},
  getConnection: (key) => {
    return get().connectionMap?.[key];
  },
  addConnection: (config) => {
    const key = uuidv4();
    const conn: Connection = {
      tab: [],
      tabMap: {},
      config,
      updatedAt: new Date(),
    };
    set(
      produce((state) => {
        state.connectionMap[key] = conn;
        if (!config?.name) {
          state.recent.push(key);
        } else {
          state.favorites.push(key);
        }
      })
    );
    return key;
  },
  updateConnection: (key, config) => {
    set(
      produce((state) => {
        // remove old value
        state.favorites = state.favorites.filter((f: string) => f !== key);
        state.recent = state.recent.filter((f: string) => f !== key);

        state.connectionMap[key].config = {
          ...config,
          updatedAt: new Date(),
        };
        // update new
        if (config?.name) {
          state.favorites.push(key);
        } else {
          state.recent.push(key);
        }
      })
    );
    return key;
  },
  removeConnection: (key) => {
    set(
      produce((state) => {
        state.favorites = state.favorites.filter((f: string) => f !== key);
        state.recent = state.recent.filter((f: string) => f !== key);
        delete state.connectionMap[key];
      })
    );
  },
  updateClusterInfo: (key, stats) => {
    const clusterInfo: ClusterInfo = {
      version: 'unknown',
      nodes: {},
      leader: stats.leader?.node_id,
      stats,
    };
    // eslint-disable-next-line no-return-assign
    stats.nodes.forEach((n) => (clusterInfo.nodes[n.id] = { address: n.addr }));
    set(
      produce((state) => {
        if (state.connectionMap[key]) {
          state.connectionMap[key].cluster = clusterInfo;
        }
      })
    );
    return clusterInfo;
  },
  getClusterInfo: (key) => {
    return get().connectionMap[key].cluster;
  },
});
export default createConnectionSlice;
