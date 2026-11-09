/**
 * - `RepoScope`, `Generator` · what a repository names once; a script that emits
 * - `testsOf`, `SHARED_TESTS` · the files read as tests; the way of working's own
 */
import type { CheckTiers } from './checkTiers.ts';
import type { Renderer } from './lint/componentLadders.ts';
import type { Language } from './lint/cspellConfig.ts';
import type { NameCase } from './lint/fileRules.ts';
import type { Named } from './lint/rules/fileNamesItsPurpose.ts';
import type { Family } from './lint/rules/oneHomePerName.ts';

// a script writing what it generates under `--out <folder>`; `writes` globs what it owns, `!` not
interface Generator {
  readonly script: string;
  readonly args: readonly string[];
  readonly writes: readonly string[];
}

// the files an agent reads, by globs: its skills, and those read whole, on demand, every turn
interface Instructions {
  readonly skills: readonly string[];
  readonly whole: readonly string[];
  readonly onDemand: readonly string[];
  readonly everyTurn: readonly string[];
}

// the docs whose backticked paths exist, by globs, and the top folders such a path starts with
interface NamedPaths {
  readonly docs: readonly string[];
  readonly roots: readonly string[];
}

// the files whose sentences are written once, by globs: code's strings, prose's lines
interface Sentences {
  readonly code: readonly string[];
  readonly prose: readonly string[];
}

// a language some files are also written in (the PM's words, quoted, or a view for them), and its words no dictionary holds
interface AlsoIn {
  readonly language: Language;
  readonly files: readonly string[];
  readonly words: readonly string[];
}

// what cspell spells, by globs, and the words it takes: computed, reviewed, misspelt on purpose, another language's
interface Spelling {
  readonly files: readonly string[];
  readonly computed: readonly string[];
  readonly reviewed: readonly string[];
  readonly onPurpose: readonly RegExp[];
  readonly alsoIn: readonly AlsoIn[];
}

interface RepoScope {
  readonly root: string;
  readonly ignores: readonly string[];
  // the trees a product checks: held here, skipped by its lint and exports, read by a glob naming one
  readonly productTrees: readonly string[];
  readonly production: readonly string[];
  readonly generated: readonly string[];
  readonly react: readonly string[];
  readonly entries: readonly string[];
  readonly parts: readonly string[];
  readonly mutable: Readonly<Record<string, readonly string[]>>;
  readonly families: readonly Family[];
  readonly brands: readonly string[];
  readonly words: readonly string[];
  readonly markup: readonly string[];
  readonly barrels: readonly string[];
  readonly tests: readonly string[];
  readonly owners: Readonly<Record<string, string>>;
  readonly starts: readonly string[];
  readonly names: readonly Named[];
  readonly nameCases: readonly NameCase[];
  readonly typesOnly: readonly string[];
  readonly components: readonly string[];
  readonly renderers: readonly Renderer[];
  readonly generators: readonly Generator[];
  readonly checks: CheckTiers;
  readonly runsCode: Readonly<Record<string, string>>;
  readonly tables: readonly string[];
  readonly unformatted: Readonly<Record<string, string>>;
  readonly instructions: Instructions;
  readonly sentences: Sentences;
  // the rule tables as printed (`| Rule | Gate | Exceptions | Why |`): each row names a gate that runs
  readonly ruleFiles: readonly string[];
  readonly namedPaths: NamedPaths;
  readonly spelling: Spelling;
}

// the way of working's shared tests, which each side's runner includes beside its own
const SHARED_TESTS = 'shared/tests';

const TESTS = [
  'tests/**',
  `${SHARED_TESTS}/**`,
  '**/__tests__/**',
  '**/*.test.{ts,tsx}',
  '**/*.test-d.ts',
];

// a scope's own tests besides the convention: a repository's e2e folder
const testsOf = (scope: RepoScope): readonly string[] => [
  ...TESTS,
  ...scope.tests,
];

export { SHARED_TESTS, testsOf };
export type { Generator, RepoScope };
