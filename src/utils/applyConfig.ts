import { AxiosInstance } from 'axios';
import { Configuration } from '../store/interface';

export const ApplyConfig = (i: AxiosInstance, cfg: Configuration) => {
  const proto = cfg.tls === 'on' ? 'https://' : 'http://';
  i.defaults.baseURL = proto + cfg.hosts?.[0];
  const { type, ...rest } = cfg.authentication;

  switch (type) {
    case 'basic':
      i.defaults.auth = { ...rest } as never;
      break;
    default:
      i.defaults.auth = undefined;
      break;
  }
};
