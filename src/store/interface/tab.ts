import { ConnectionKey } from './connection';

export type TabKey = string;

export interface TabBase {
  type: 'ns';
  label: string;
}

export interface NamespaceTab extends TabBase {
  ns: string;
  queryType: string;
  filter?: string;
}

export type Tab = NamespaceTab;

export interface ITabSlice {
  newNamespaceTab: (key: ConnectionKey, ns: string) => TabKey | undefined;
  getTab: (key: ConnectionKey, tab: TabKey) => Tab | undefined;
  removeTab: (key: ConnectionKey, tab: TabKey) => void;
  getCurrentTab: (key: ConnectionKey) => Tab | undefined;
  setCurrentTab: (key: ConnectionKey, tab: TabKey) => void;
  replaceTab: (key: ConnectionKey, nextTab: TabKey) => void;
  getTabs: (key: ConnectionKey) => Tab[];
}
