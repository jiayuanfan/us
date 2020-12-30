import 'url-search-params-polyfill';

let usBean: URLSearchParams | undefined = undefined;

// 获取 url 参数原生唯一实例
export const getRawBean = (ts: string = ''): URLSearchParams => {
  if (!usBean) {
    if (ts.length < 1) ts = window.location.search;
    usBean = new URLSearchParams(ts);
  }
  return usBean;
};