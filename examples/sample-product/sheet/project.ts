/**
 * - `product`, `company`, `buildSide`, `referenceTools`, `stack` · who, built how
 * - `designSession`, `buildSession`, `buildRepository`, `buildBranch` · where
 * - `buildPaths`, `buildReads`, `recordEras` · its paths, its reads, its records
 */
const product = 'Acme';
const company = 'Acme Corp';
const buildSide = 'Acme Build';
const stack = 'web';
const designSession = 'acme-design';
const buildSession = 'acme-dev';
const buildRepository = 'acme';
const buildBranch = 'acme-build';
// the build repository's top folders and files, so a pack's pointer into them is told apart
const buildPaths: readonly string[] = [];
// the tools its people already know, where a known pattern is looked for first
const referenceTools: readonly string[] = [];
// a module's export the build prints for its side, and the file it lands in
interface PrintedRead {
  readonly module: string;
  readonly name: string;
  readonly fixture: string;
}
// what the build side reads: every module under these homes, these beside them, what they import, and these files whole
const buildReads: {
  readonly homes: readonly string[];
  readonly modules: readonly string[];
  readonly files: readonly string[];
  readonly json: readonly PrintedRead[];
  readonly documents: readonly PrintedRead[];
  readonly names: Readonly<Record<string, readonly string[]>>;
} = {
  homes: [],
  modules: [],
  files: [],
  json: [],
  documents: [],
  names: {},
};
// its release records written before the tool's form: none, a product that starts on the tool
const recordEras: {
  readonly beforeTheTool: readonly string[];
  readonly beforeTheFiles: readonly string[];
  readonly beforeTheRename: readonly string[];
  readonly namedThen: Readonly<Record<string, string>>;
} = {
  beforeTheTool: [],
  beforeTheFiles: [],
  beforeTheRename: [],
  namedThen: {},
};

export {
  buildBranch,
  buildPaths,
  buildReads,
  buildRepository,
  buildSession,
  buildSide,
  company,
  designSession,
  product,
  recordEras,
  referenceTools,
  stack,
};
