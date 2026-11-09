/**
 * - `runtimeOf`, `Runtime` · the app's address, from the product's Playwright
 * - config alone (`use.baseURL`): no default of its own and no env read here
 */
export type Runtime = {
  readonly baseUrl: string;
};

const withoutTrailingSlash = (url: string): string =>
  url.endsWith('/') ? withoutTrailingSlash(url.slice(0, -1)) : url;

export const runtimeOf = (baseUrl: string | undefined): Runtime => {
  if (baseUrl === undefined || baseUrl.trim() === '')
    throw new Error(
      "the browser tier has no address · the product's playwright.config.ts names `use.baseURL`",
    );
  return { baseUrl: withoutTrailingSlash(baseUrl.trim()) };
};
