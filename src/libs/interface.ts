// 普通对象
export type RegularObject = { [props: string]: string };

// url 解构后的各项值
export interface UrlParseProps {
  origin: string;
  search: string;
  hash: string;
}