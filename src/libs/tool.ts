import { RegularObject, UrlParseProps } from './interface';
import { getRawBean } from './us';

// 获取目标 url 的 几个属性
const parse = (targetUrl: string = window.location.href): UrlParseProps => {
  if (typeof targetUrl !== 'string' || targetUrl.indexOf('http') !== 0) {
    throw new Error('Error(us-parse): invalid params');
  }

  const parseProps: UrlParseProps = { origin: '', search: '', hash: '' };
  const searchMarkIndex: number = targetUrl.indexOf('?');
  const hashMarkIndex: number = targetUrl.indexOf('#');
  const hasSearch: boolean = searchMarkIndex > -1;
  const hasHash: boolean = hashMarkIndex > -1;

  let origin: string = targetUrl;
  if (hasHash) {
    origin = origin.slice(0, hashMarkIndex);
  }
  if (hasSearch) {
    origin = origin.slice(0, searchMarkIndex);
  }
  parseProps.origin = origin;
  parseProps.search = hasSearch ? targetUrl.slice(searchMarkIndex, hashMarkIndex) : '';
  parseProps.hash = hasHash ? targetUrl.slice(hashMarkIndex) : '';
  return parseProps;
};

// url search 的特殊符号去除
const trim = (targetSearch: string = window.location.search): string => {
  if (typeof targetSearch !== 'string') {
    throw new Error('Error(us-trim): invalid params');
  }

  // 从头开始剔除 ?/&
  if (targetSearch.length > 0) {
    for (let i = 0; i < targetSearch.length; i++) {
      if (!['?', '&'].includes(targetSearch[i])) {
        if (i > 0) targetSearch = targetSearch.slice(i);
        break;
      }
    }
  }
  // 从结束开始剔除 &
  if (targetSearch.length > 0) {
    for (let i = targetSearch.length - 1; i >= 0; i--) {
      if (targetSearch[i] !== '&') {
        if (i < targetSearch.length - 1) targetSearch = targetSearch.slice(0, i + 1);
        break;
      }
    }
  }

  return targetSearch;
};

// 为目标 url 拼接目标 search
const concat = (targetSearch: string | RegularObject, targetUrl?: string): string => {
  if (typeof targetSearch !== 'string' && typeof targetSearch !== 'object') {
    throw new Error('Error(us-searchConcat): invalid params');
  }

  // 如果是 object 的格式 search
  if (typeof targetSearch !== 'string') {
    targetSearch = ofString(targetSearch);
  } else {
    targetSearch = trim(targetSearch);
  }

  const { origin, search, hash } = parse(targetUrl);
  const newSearch = search.length > 0 ? `${search}&${targetSearch}` : `?${targetSearch}`;
  return origin + newSearch + hash;
};

// 获取对象类型的返回值
const ofObject = (ts: string = ''): RegularObject => {
  if (typeof ts !== 'string') {
    throw new Error('Error(us-ofObject): invalid params');
  }

  if (ts.length > 0) {
    ts = trim(ts);
  }

  const uspBean: URLSearchParams = getRawBean(ts);
  const regularObject: RegularObject = {}; 

  uspBean.forEach((val, key) => {
    regularObject[key] = val;
  })
  return regularObject;
}

// 获取 string 类型的 search
const ofString = (ro: RegularObject = {}): string => {
  if (typeof ro !== 'object') {
    throw new Error('Error(us-ofString): invalid params');
  }

  const roKeys = Object.keys(ro);
  if (roKeys.length < 1) {
    return trim();
  }

  return roKeys.reduce((prevValue: string, roK: string, i: number) => {
    if (i !== 0) prevValue += '&';
    prevValue += `${roK}=${ro[roK]}`;
    return prevValue;
  }, '');
}

export default {
  parse,
  trim,
  concat,
  ofObject,
  ofString
}
