/**
 * - `Browser`, `BrowserTier` · a product's browser tier as its scope names it,
 * - or `none` and why: its gates then skip, saying so
 */
// a product's browser tier, its paths named once here, never fixed by the way of working
interface BrowserTier {
  // `{screensRoot}/{screen}/testingFlows/{screen}FlowsCatalog.ts`: a screen is a folder holding its catalogue
  readonly screensRoot: string;
  // `{statusRoot}/{screen}-status.md`: what each screen's flows cover, measured
  readonly statusRoot: string;
  readonly registry: string;
  readonly templates: string;
  readonly componentRoots: readonly string[];
  readonly roles: readonly string[];
  readonly exemptions: readonly {
    readonly file: string;
    readonly why: string;
  }[];
}

// none: why a repository has no browser tier, which its gates say as they skip
type Browser = BrowserTier | { readonly none: string };

export type { Browser, BrowserTier };
