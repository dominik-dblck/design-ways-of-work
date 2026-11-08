/**
 * - cuts a ticket's pack from the sheet's sources, each section under the
 * - sha256 of the file it was cut from; a refusal is a finding, exit 1
 * - `node tools/pack.ts <ticket> [more]` · lists the packs written and removed
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { errorMessageOf, mirrorAt } from '../guards/checks/checkWorld.ts';
import { homes, sourceOf } from './layout.ts';
import type { Mirror } from '../guards/checks/checkWorld.ts';
import { answerFails } from './pack/answerCheck.ts';
import { featureFails } from './pack/featureGates.ts';
import type { Cut } from './pack/fileLines.ts';
import { refineGate, sourceFails, typesFails } from './pack/packGates.ts';
import { sourceReader } from './pack/packSources.ts';
import type { SourceReader } from './pack/packSources.ts';
import { packText, ticketOf } from './pack/packText.ts';
import { selfFails } from './pack/selfCheck.ts';
import { builtRoot } from './root.ts';

interface Run {
  readonly mirror: Mirror;
  readonly reader: SourceReader;
  readonly log: (line: string) => void;
}

// a pack is one file: the parts an older cut left beside it go
function removeParts(id: string): readonly string[] {
  const folders = [
    sourceOf('packs') ?? 'packs',
    path.join(builtRoot(), 'packs'),
  ];
  const part = new RegExp(`^${id}\\.\\d+\\.md$`);
  const gone = folders.flatMap((folder) => {
    const names = fs.existsSync(folder) ? fs.readdirSync(folder) : [];
    return names
      .filter((name) => part.test(name))
      .map((name) => path.join(folder, name));
  });
  gone.forEach((file) => fs.rmSync(file));
  return [...new Set(gone.map((file) => `packs/${path.basename(file)}`))];
}

// one ticket cut, saved, then checked against its sources
function cutOne(
  id: string,
  { run, cut }: { readonly run: Run; readonly cut: Cut },
): readonly string[] {
  const md = packText(id, { cut, mirror: run.mirror });
  run.mirror.save(`packs/${id}.md`, md);
  run.log(
    `packs/${id}.md · ${md.split('\n').length} lines · ${Buffer.byteLength(md)} B`,
  );
  const ticket = ticketOf(cut, id);
  const context = { cut, mirror: run.mirror, log: run.log };
  return [
    ...typesFails(ticket, context),
    ...featureFails(ticket, context),
    ...(ticket.kind === 'feature' ? sourceFails(ticket, context) : []),
    ...selfFails(ticket, { md, cut }),
    ...answerFails(ticket),
  ];
}

function cutAll(ids: readonly string[], run: Run): readonly string[] {
  const base = { reader: run.reader };
  refineGate(ids, {
    cut: { ...base, epic: null, miss: () => {} },
    log: run.log,
  });
  const fails = ids.flatMap((id) => {
    const missed: string[] = [];
    const cut: Cut = {
      ...base,
      epic: ticketOf({ ...base, epic: null, miss: () => {} }, id).epic,
      miss: (one) => missed.push(one),
    };
    const found = cutOne(id, { run, cut });
    return [
      ...(missed.length
        ? [`${id} · pointer not resolved: ${missed.join(' ‖ ')}`]
        : []),
      ...found,
    ];
  });
  if (fails.length)
    throw new Error(`pack self-check failed:\n${fails.join('\n')}`);
  run.log(
    'self-check: all packs verbatim against their sources · answer-check: one path per file',
  );
  return ids.flatMap((id) => removeParts(id));
}

// the digests hold at the release's commit: what is not committed yet goes with the pack
function uncommitted(): string {
  const tops = [...new Set(homes().map((home) => home.source.split('/')[0]))];
  const root = tops.join(', ');
  let said: string;
  try {
    said = execFileSync('git', ['status', '--porcelain', '--', ...tops], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return `${root} is not in a git checkout: its digests name no commit`;
  }
  const files = said.split('\n').filter(Boolean).length;
  return files
    ? `${files} files in ${root} not committed: commit them with the pack, its digests are theirs`
    : `${root} clean at HEAD`;
}

function main(): number {
  const ids = process.argv.slice(2);
  if (!ids.length) {
    console.error('usage: node tools/pack.ts T-E18-00 [more ids]');
    return 2;
  }
  const mirror = mirrorAt(builtRoot(), { mode: 'cut', copyTo: sourceOf });
  const lines: string[] = [];
  const run: Run = {
    mirror,
    reader: sourceReader(),
    log: (line) => lines.push(line),
  };
  let removed: readonly string[] = [];
  let isOk = true;
  try {
    removed = cutAll(ids, run);
  } catch (error) {
    isOk = false;
    lines.push(`REFUSED · ${errorMessageOf(error).slice(0, 4000)}`);
  }
  console.log([...lines, uncommitted()].join('\n'));
  const saved = mirror.saved();
  console.log(
    `\n${saved.length ? `written (publish with the sheet edit): ${saved.join(', ')}` : 'nothing written'}`,
  );
  if (removed.length)
    console.log(
      `removed (publish as null): ${removed.map((file) => `project/${file}`).join(', ')}`,
    );
  return isOk && saved.length ? 0 : 1;
}

process.exitCode = main();
