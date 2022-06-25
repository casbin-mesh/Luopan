import produce from 'immer';
import { v4 } from 'uuid';
import {
  ConnectionKey,
  IConnectionSlice,
  ITabSlice,
  NamespaceTab,
  StoreSlice,
  TabKey,
} from './interface';

const createTabSlice: StoreSlice<ITabSlice, IConnectionSlice> = (set, get) => ({
  newNamespaceTab: (key: ConnectionKey, ns: string) => {
    const tabKey = v4();
    set(
      produce((state) => {
        if (state.connectionMap[key]) {
          state.connectionMap[key].tab.push(tabKey);
          const tab: NamespaceTab = {
            type: 'ns',
            label: ns,
            ns,
            queryType: 'policy',
          };
          console.log(tab);
          state.connectionMap[key].tabMap[tabKey] = tab;
        }
      })
    );
    return tabKey;
  },
  getTab: (key: ConnectionKey, tab: TabKey) => {
    const conn = get().getConnection(key);
    if (conn) {
      return conn.tabMap[tab];
    }
    return undefined;
  },
  getCurrentTab: (key: ConnectionKey) => {
    const state = get();

    const conn = state.getConnection(key);
    if (conn?.currentTab) {
      return state.getTab(key, conn?.currentTab);
    }
    return undefined;
  },
  setCurrentTab: (key: ConnectionKey, tabKey: TabKey) => {
    const state = get();
    const conn = state.getConnection(key);
    if (conn?.currentTab) {
      state.removeTab(key, conn.currentTab);
    }
    set(
      produce((s) => {
        if (s.connectionMap[key]) {
          s.connectionMap[key].currentTab = tabKey;
        }
      })
    );
  },
  replaceTab: (key: ConnectionKey, nextTab) => {
    get().setCurrentTab(key, nextTab);
  },
  removeTab: (key: ConnectionKey, tabKey: TabKey) => {
    set(
      produce((state) => {
        if (state.connectionMap[key]) {
          state.connectionMap[key].tab = state.connectionMap[key].tab.filter(
            (t: string) => t !== tabKey
          );
          delete state.connectionMap[key].tabMap[tabKey];
        }
      })
    );
  },
  getTabs: (key) => {
    const state = get();
    const conn = state.getConnection(key);
    if (conn) {
      return conn.tab.map((t) => conn.tabMap[t]);
    }
    return [];
  },
});
export default createTabSlice;
