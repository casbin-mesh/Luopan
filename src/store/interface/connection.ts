import { GetState, SetState } from 'zustand';
import { ITabSlice, Tab, TabKey } from './tab';
import { Stats } from '../../service/client';

export type ConnectionKey = string;

type NodeId = string;

export interface INode {
  address: string;
}

export interface ClusterInfo {
  version: string;
  nodes: Record<NodeId, INode>;
  leader: NodeId;
  stats: Stats;
}

export interface Configuration {
  hosts: string[];
  authentication: {
    type: string;
    username?: string;
    password?: string;
  };
  tls: string;
  name?: string;
  color?: string;
}

export interface Connection {
  tab: TabKey[];
  tabMap: Record<TabKey, Tab>;
  currentTab?: TabKey;
  cluster?: ClusterInfo;
  config: Configuration;
  updatedAt: Date;
}

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;

export interface IConnectionSlice {
  recent: ConnectionKey[];
  favorites: ConnectionKey[];
  connectionMap: Record<ConnectionKey, Connection>;
  addConnection: (config: Configuration) => ConnectionKey;
  updateConnection: (key: ConnectionKey, config: Configuration) => void;
  removeConnection: (key: ConnectionKey) => void;
  getConnection: (key: ConnectionKey) => Connection | undefined;
  updateClusterInfo: (key: ConnectionKey, stats: Stats) => ClusterInfo;
  getClusterInfo: (key: ConnectionKey) => ClusterInfo | undefined;
}

export type AppStore = IConnectionSlice & ITabSlice;
