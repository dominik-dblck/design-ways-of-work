/**
 * - `yarn spawn design <path> <Product> --company <Company>` · a design product
 * - the sample at this version's tag, its names filled, the tag pinned
 * - installed, taken, generated, hooked; a first commit, then its feature tier
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { belowOf } from '../shared/emptied.ts';
import { stepIn } from './ran.ts';
import { HERE } from './repos.ts';
import { namesRefused, packageSource, spawnedTexts } from './spawnTexts.ts';

const SAMPLE = 'examples/sample-product';
// a blob's mode as git stores it: a file, or one that runs
const MODES: Readonly<Record<string, number>> = {
  '100644': 0o644,
  '100755': 0o755,
};

function refused(reasons: readonly string[]): void {
  if (reasons.length === 0) return;
  for (const reason of reasons) console.log(`spawn · ${reason}`);
  process.exit(1);
}

const git = (args: readonly string[]): string =>
  execFileSync('git', args, { cwd: HERE, encoding: 'utf8' }).trim();

const args = process.argv.slice(2);
const companyAt = args.indexOf('--company');
const company = companyAt === -1 ? undefined : args[companyAt + 1];
const [kind, place, product] = args.filter(
  (_, at) => companyAt === -1 || (at !== companyAt && at !== companyAt + 1),
);
refused(
  kind === 'design'
    ? []
    : [
        'design alone: a build repository waits for the build side’s port',
        'yarn spawn design <path> <Product> --company <Company>',
      ],
);
refused(
  place === undefined || product === undefined || company === undefined
    ? ['yarn spawn design <path> <Product> --company <Company>']
    : [],
);
// yarn runs a script at the package's root: a path is read from where it was typed
const ROOT = path.resolve(process.env.INIT_CWD ?? process.cwd(), String(place));
const names = {
  repository: path.basename(ROOT),
  product: String(product),
  company: String(company),
};
const isInside = belowOf({ within: HERE, folder: ROOT }) !== null;
const isTaken = fs.existsSync(ROOT) && fs.readdirSync(ROOT).length > 0;
const version = String(
  Object(JSON.parse(fs.readFileSync(path.join(HERE, 'package.json'), 'utf8')))
    .version,
);
const tag = `v${version}`;
const isTagged = git(['tag', '--list', tag]) === tag;
refused([
  ...namesRefused(names),
  ...(isInside ? [`${ROOT} · inside the way of working`] : []),
  ...(isTaken ? [`${ROOT} · holds files already`] : []),
  ...(isTagged ? [] : [`${tag} · no tag here: the version is not released`]),
]);

// the sample as the tag holds it: the release's gate ran it green on that tag's homes
const blobs = git(['ls-tree', '-r', '-z', tag, '--', `${SAMPLE}/`])
  .split('\0')
  .filter(Boolean)
  .map((line) => {
    const [meta = '', file = ''] = line.split('\t');
    const [mode = '', , blob = ''] = meta.split(' ');
    return { file: path.relative(SAMPLE, file), mode: MODES[mode], blob };
  });
refused(
  blobs
    .filter(({ mode }) => mode === undefined)
    .map(({ file }) => `${file} · neither a file nor one that runs`),
);
for (const { file, mode, blob } of blobs) {
  const target = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(
    target,
    execFileSync('git', ['cat-file', 'blob', blob], { cwd: HERE }),
    { mode },
  );
}
const pin = `${packageSource(git(['remote', 'get-url', 'origin']))}#${tag}`;
const texts = spawnedTexts({
  read: (file) => fs.readFileSync(path.join(ROOT, file), 'utf8'),
  names,
  pin,
});
for (const [file, text] of texts) fs.writeFileSync(path.join(ROOT, file), text);

const step = stepIn({ root: ROOT, label: 'spawn' });
step('git', ['init', '-q', '-b', 'main']);
// its prepare wires the git hooks; its postinstall takes the homes
step('yarn', ['install', '--prefer-offline', '--silent']);
step(process.execPath, ['tools/writeGenerated.ts']);
step('git', ['add', '-A']);
step('git', [
  'commit',
  '-q',
  '-m',
  `chore: spawn ${names.repository} on the way of working ${tag}`,
]);
step('yarn', ['-s', 'check:feature']);
console.log(`spawn · ${ROOT} · green on its first commit, at ${tag}`);
console.log(
  'spawn · next: its row in ports/consumers.ts, so the gate tries it',
);
