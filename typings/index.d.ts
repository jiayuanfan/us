declare module 'uus' {
	type RegularObject = { [props: string]: string };

	interface UrlParseProps {
		origin: string;
		search: string;
		hash: string;
	}

	export function get(name: string): string | null;
	export function parse(targetUrl?: string): UrlParseProps;
  export function trim(targetSearch?: string): string;
  export function concat(targetSearch: string | RegularObject, targetUrl?: string): string;
	export function ofObject(targetSearchString?: string): RegularObject;
	export function ofString(targetSearchObject?: RegularObject): string;
}
