import { Mutate, StoreApi } from 'zustand/vanilla';
import { UseBoundStore } from 'zustand/react';
import { enableMapSet } from 'immer';
import { createRootSlice } from '../../store/store';
import createConnectionSlice from '../../store/connection';
// eslint-disable-next-line jest/no-mocks-import
import create from '../../__mocks__/zustand';
import {
  AppStore,
  Configuration,
  ConnectionKey,
  IConnectionSlice,
  TabKey,
} from '../../store/interface';

describe('Connection Store Test', () => {
  let store: UseBoundStore<Mutate<StoreApi<IConnectionSlice>, []>>;
  beforeAll(() => {
    enableMapSet();
    store = create(createConnectionSlice);
  });
  it('should add a recent connection', () => {
    const config: Configuration = {
      authentication: {
        type: 'none',
      },
      hosts: [],
      tls: 'off',
    };
    const key = store.getState().addConnection(config);
    expect(key).toBeDefined();

    const got = store.getState().getConnection(key);
    expect(got?.config).toEqual(config);

    const { recent, favorites } = store.getState();
    expect(favorites.find((k) => k === key)).toBeFalsy();
    expect(recent.find((k) => k === key)).toBeTruthy();
  });

  it('should add a favorite connection', () => {
    const config: Configuration = {
      authentication: {
        type: 'none',
      },
      hosts: [],
      tls: 'off',
      name: 'my',
    };
    const key = store.getState().addConnection(config);
    expect(key).toBeDefined();

    const got = store.getState().getConnection(key);
    expect(got?.config).toEqual(config);

    const { recent, favorites } = store.getState();
    expect(favorites.find((k) => k === key)).toBeTruthy();
    expect(recent.find((k) => k === key)).toBeFalsy();
  });

  it('should delete a connection', () => {
    const config: Configuration = {
      authentication: {
        type: 'none',
      },
      hosts: [],
      tls: 'off',
    };
    const key = store.getState().addConnection(config);
    expect(key).toBeDefined();

    store.getState().removeConnection(key);

    const { recent, favorites, connectionMap } = store.getState();
    expect(favorites.find((k) => k === key)).toBeFalsy();
    expect(recent.find((k) => k === key)).toBeFalsy();
    expect(connectionMap[key]).toBeFalsy();
  });
});

const newConnHelper = (
  store: UseBoundStore<Mutate<StoreApi<AppStore>, []>>
): ConnectionKey => {
  const config: Configuration = {
    authentication: {
      type: 'none',
    },
    hosts: [],
    tls: 'off',
  };
  return store.getState().addConnection(config);
};

describe('Tab Store Test', () => {
  let store: UseBoundStore<Mutate<StoreApi<AppStore>, []>>;
  beforeAll(() => {
    enableMapSet();
    store = create(createRootSlice);
  });

  it('should create a new tab', () => {
    const key = newConnHelper(store);
    const tabKey = store.getState().newNamespaceTab(key, 'test');
    expect(tabKey).toBeDefined();
    const tab = store.getState().getTab(key, tabKey as TabKey);
    expect(tab).toBeDefined();
  });

  it('should delete a tab', () => {
    const key = newConnHelper(store);
    const tabKey = store.getState().newNamespaceTab(key, 'test');
    expect(tabKey).toBeDefined();
    const tab = store.getState().getTab(key, tabKey as TabKey);
    expect(tab).toBeDefined();

    store.getState().removeTab(key, tabKey as TabKey);
    const got = store.getState().getTab(key, tabKey as TabKey);
    expect(got).toBeUndefined();
  });

  it('should replace a current map', () => {
    const key = newConnHelper(store);
    const tabKey = store.getState().newNamespaceTab(key, 'first tab');
    expect(tabKey).toBeDefined();
    const tab = store.getState().getTab(key, tabKey as TabKey);
    expect(tab).toBeDefined();
    store.getState().setCurrentTab(key, tabKey as TabKey);

    expect(store.getState().getCurrentTab(key)).toEqual(tab);

    const tabKey2 = store.getState().newNamespaceTab(key, 'another tab');
    expect(tabKey2).toBeDefined();
    const tab2 = store.getState().getTab(key, tabKey2 as TabKey);
    expect(tab2).toBeDefined();

    store.getState().setCurrentTab(key, tabKey2 as TabKey);

    const tab1 = store.getState().getTab(key, tabKey as TabKey);
    expect(tab1).toBeUndefined();

    expect(store.getState().getCurrentTab(key)).toEqual(tab2);
  });
});
