/**
 * - `TAKE_SCRIPTS`, `packageSource` · the take's scripts; a remote as a pin
 * - `SpawnNames`, `namesRefused` · the names a spawn is handed, those it refuses
 * - `spawnedTexts` · each sample file a spawn rewrites, the product's names in it
 */

interface SpawnNames {
  // the folder and the package: argus-design
  readonly repository: string;
  // the product's name, one word: Argus
  readonly product: string;
  readonly company: string;
}

type Pairs = readonly (readonly [string, string])[];

// the take's two scripts, as every product holds them: node strips no type under node_modules
const TAKE_SCRIPTS = {
  wow: 'T=$(mktemp -d) && cp -R node_modules/design-ways-of-work/shared/take "$T" && node "$T/take/takeWow.ts"',
  postinstall: 'yarn -s wow',
} as const;

// each name's shape: it lands in a quoted string, a package's name and a heading
const SHAPES: readonly (readonly [keyof SpawnNames, RegExp])[] = [
  ['repository', /^[a-z][a-z0-9-]*$/],
  ['product', /^[A-Z][A-Za-z0-9]*$/],
  ['company', /^[A-Za-z0-9][A-Za-z0-9 .&-]*$/],
];

// the sample's own words for itself, each replaced by the product's
const SAMPLE_HEAD = [
  '# Acme · a sample design product',
  '',
  "The smallest design product the way of working's checks pass on. It names no real product: a new",
  'design product starts from it, and the way of working runs its checks on it.',
].join('\n');

// git@host:owner/repo.git, ssh:// or https://: the address a package manager fetches
function packageSource(remote: string): string {
  const scp = /^([^@/]+)@([^:/]+):(.+)$/.exec(remote);
  if (scp !== null) return `git+ssh://${scp[1]}@${scp[2]}/${scp[3]}`;
  if (/^(ssh|https):\/\//.test(remote)) return `git+${remote}`;
  throw new Error(`spawn · ${remote} · no address a package manager fetches`);
}

const namesRefused = (names: SpawnNames): readonly string[] =>
  SHAPES.filter(([key, shape]) => !shape.test(names[key])).map(
    ([key, shape]) => `${key} · ${names[key]} · not ${shape}`,
  );

// a pair the sample no longer holds stops the spawn: the sample changed, and the spawn follows it
function replaced({
  file,
  text,
  pairs,
}: {
  readonly file: string;
  readonly text: string;
  readonly pairs: Pairs;
}): string {
  return pairs.reduce((done, [from, to]) => {
    if (!done.includes(from))
      throw new Error(`spawn · ${file} holds no ${from}`);
    return done.replaceAll(from, to);
  }, text);
}

function pairsOf(names: SpawnNames): Readonly<Record<string, Pairs>> {
  const slug = names.product.toLowerCase();
  const head = [
    `# ${names.product} · design`,
    '',
    `The design side of ${names.product}: its specification, its tickets and its pages, on the way of`,
    'working taken at the tag `package.json` pins (`design-ways-of-work`).',
  ].join('\n');
  return {
    'CLAUDE.md': [[SAMPLE_HEAD, head]],
    'sheet/project.ts': [
      ["'Acme Corp'", `'${names.company}'`],
      ["'Acme", `'${names.product}`],
      ["'acme", `'${slug}`],
    ],
    'scope.ts': [
      ["'a sample: nothing of it is kept'", "'no remote yet'"],
      ["'a sample: no page of its own is run'", "'no page of its own yet'"],
    ],
    'product.ts': [['the sample', 'the product']],
    'productView.ts': [['the sample', 'the product']],
  };
}

function spawnedManifest({
  text,
  names,
  pin,
}: {
  readonly text: string;
  readonly names: SpawnNames;
  readonly pin: string;
}): string {
  const manifest: Record<string, unknown> = Object(JSON.parse(text));
  const devDependencies = Object.fromEntries(
    Object.entries({
      ...Object(manifest.devDependencies),
      'design-ways-of-work': pin,
    }).sort(([one], [other]) => one.localeCompare(other)),
  );
  const spawned = {
    ...manifest,
    name: names.repository,
    scripts: { ...Object(manifest.scripts), ...TAKE_SCRIPTS },
    devDependencies,
  };
  return `${JSON.stringify(spawned, null, 2)}\n`;
}

// each file the spawn rewrites, as the product holds it: `pin` is the package's address and tag
function spawnedTexts({
  read,
  names,
  pin,
}: {
  readonly read: (file: string) => string;
  readonly names: SpawnNames;
  readonly pin: string;
}): ReadonlyMap<string, string> {
  const texts = Object.entries(pairsOf(names)).map(
    ([file, pairs]) =>
      [file, replaced({ file, text: read(file), pairs })] as const,
  );
  const manifest = spawnedManifest({ text: read('package.json'), names, pin });
  return new Map([...texts, ['package.json', manifest]]);
}

export { namesRefused, packageSource, spawnedTexts, TAKE_SCRIPTS };
export type { SpawnNames };
