import { getRawBean } from './us';

// 获取具体某个值
const get = (name: string): string | null => {
  const uspBean: URLSearchParams = getRawBean();
  return uspBean.get(name);
}

export default {
  get
}
