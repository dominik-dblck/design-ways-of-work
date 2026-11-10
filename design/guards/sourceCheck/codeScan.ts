/**
 * - `scan` · every copy in the files handed in, against its fact's home on the map
 * - a requirement's retired code still in its file, a requirement written twice
 * - `scanAll` · the scan over the scope and the requirements' files, fetched
 */
import { copiesInLine, sentencesIn } from './lineFindings.ts';
import { messageWordsCheck } from './messagesWords.ts';
import {
  MODULE_ENTRIES,
  MODULE_IMPORTS,
  ownModulesText,
} from './ownModules.ts';
import {
  decisionLines,
  requirementItems,
  targets,
} from './requirementReads.ts';
import { bannedPatterns } from './screenWords.ts';
import { isCode, mapRowOf, SCOPE } from './sourceScope.ts';
import type { SourceFinding, LineAt, Texts } from './sourceCheckTypes.ts';
import * as MESSAGES from '../../sheet/words/messages.ts';

const VIEW = 'the view of it all';
const DECLARED =
  /^(?: {2}|\t+)(?:(?:var|const|let) (\w+)\s*=|function (\w+)\()/;

// the lines messages.js holds whole, long enough to be a sentence
function messageLines(): ReadonlySet<string> {
  const cells = MESSAGES.cells();
  return new Set(
    cells
      .map((cell): unknown => cell.line)
      .filter(
        (line): line is string =>
          typeof line === 'string' &&
          line !== '' &&
          !/\{\w+\}/.test(line) &&
          line.length >= 14,
      ),
  );
}

// a line inside a requirement row is the decisions' prose, never shown in the product
function fileFindings(
  file: string,
  {
    text,
    words,
  }: {
    readonly text: string;
    readonly words: Parameters<typeof sentencesIn>[1];
  },
): readonly SourceFinding[] {
  const found: SourceFinding[] = [];
  const decided = decisionLines(file, text);
  let decl = '';
  text.split('\n').forEach((line, index) => {
    const declared = DECLARED.exec(line);
    if (declared) decl = String(declared[1] || declared[2]);
    if (!isCode(line)) return;
    if (
      file === 'approvalLogic.js' &&
      (/^\s*R\('/.test(line) || decided.has(index))
    )
      return;
    const at: LineAt = { file, index, line, decl };
    found.push(...copiesInLine(at), ...sentencesIn(at, words));
  });
  return found;
}

function retired(files: Texts): readonly SourceFinding[] {
  return requirementItems().flatMap((requirement) =>
    requirement.replaces.flatMap((replaced): readonly SourceFinding[] => {
      const [file = '', ...rest] = String(replaced).split(' · ');
      const text = rest.join(' · ');
      const said = `${requirement.id} · ${text}`;
      if (!(file in files))
        return [
          {
            kind: 'replaced · file not scanned',
            row: VIEW,
            file,
            line: 1,
            text: said.slice(0, 140),
          },
        ];
      const decided = decisionLines(file, files[file]);
      return String(files[file])
        .split('\n')
        .flatMap((line, index) =>
          isCode(line) &&
          !/^\s*R\('/.test(line) &&
          !decided.has(index) &&
          line.includes(text)
            ? [
                {
                  kind: 'replaced, still there',
                  row: mapRowOf(file),
                  file,
                  line: index + 1,
                  text: said.slice(0, 140),
                },
              ]
            : [],
        );
    }),
  );
}

function twiceWritten(): readonly SourceFinding[] {
  const seen = new Set<string>();
  return requirementItems().flatMap((requirement) => {
    const wasSeen = seen.has(requirement.id);
    seen.add(requirement.id);
    return wasSeen
      ? [
          {
            kind: 'requirement twice',
            row: VIEW,
            file: 'approvalLogic.js',
            line: 1,
            text: requirement.id.slice(0, 140),
          },
        ]
      : [];
  });
}

function scan(files: Texts): readonly SourceFinding[] {
  const words = { banned: bannedPatterns(), lines: messageLines() };
  return [
    ...Object.keys(files).flatMap((file) =>
      fileFindings(file, { text: String(files[file] || ''), words }),
    ),
    ...retired(files),
    ...twiceWritten(),
    ...messageWordsCheck(files),
  ];
}

// a file the fetch cannot read is read as empty
async function fetched(file: string): Promise<string> {
  try {
    const answer = await fetch(file);
    return answer.ok ? await answer.text() : '';
  } catch {
    return '';
  }
}

// each bundle read as the checks read it: its own modules, an entry it imports as a global
async function ownReader(): Promise<(file: string, text: string) => string> {
  const entries: unknown = JSON.parse((await fetched(MODULE_ENTRIES)) || '{}');
  const reads: unknown = JSON.parse((await fetched(MODULE_IMPORTS)) || '{}');
  const map: Readonly<Record<string, string>> =
    entries && typeof entries === 'object' ? { ...entries } : {};
  const imports: Readonly<Record<string, readonly string[]>> =
    reads && typeof reads === 'object' ? { ...reads } : {};
  if (Object.keys(map).length === 0) return (_file, text) => text;
  return (file, text) =>
    file.endsWith('.js')
      ? ownModulesText(text, {
          name: file.slice(0, -'.js'.length),
          entryOf: (module) => map[module] ?? module,
          importsOf: (entry) => imports[entry] ?? [],
        })
      : text;
}

async function scanAll(): Promise<readonly SourceFinding[]> {
  const all = [...SCOPE, ...targets()];
  const own = await ownReader();
  const texts = await Promise.all(
    all.map(async (file) => own(file, await fetched(file))),
  );
  return scan(
    Object.fromEntries(all.map((file, index) => [file, texts[index]])),
  );
}

export { scan, scanAll };
