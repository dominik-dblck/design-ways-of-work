/**
 * - `Browser`, `BrowserTier` · a product's browser tier as its scope names it,
 * - or `none` and why: its gates then skip, saying so
 * - `SkillRule` · a rule of the e2e skills, the shared ones' or the product's own
 */
// a rule of the e2e skills: its key, which a step cites as `{{ruleNumber:key}}`, and its text
interface SkillRule {
  readonly key: string;
  readonly text: string;
}

// the product's half: its skills' folder, its rules after the shared ones, its lines at `{page}.{step}` or `{page}.input`
interface BrowserSkill {
  readonly folder: string;
  readonly rules: readonly SkillRule[];
  readonly after: Readonly<Record<string, string>>;
}

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
  // the product's script that runs its flows, and the path its probe asks
  readonly command: string;
  readonly healthPath: string;
  readonly skill: BrowserSkill;
  readonly exemptions: readonly {
    readonly file: string;
    readonly why: string;
  }[];
}

// none: why a repository has no browser tier, which its gates say as they skip
type Browser = BrowserTier | { readonly none: string };

export type { Browser, BrowserTier, SkillRule };
