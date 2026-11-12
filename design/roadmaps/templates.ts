/**
 * - `epicFilesOf` · the files an epic's folder starts with: path, text, registry
 * - `registered` · a registry with the file imported and listed, in epic order
 * - the epic's row is the backlog's: a folder is started for an epic it holds
 */
import { EPIC_FILES } from './templates/epicFiles.ts';
import type { EpicFile, EpicStart } from './templates/templatesTypes.ts';

interface StartedFile {
  readonly path: string;
  readonly text: string;
  readonly registry: string;
  readonly name: string;
  readonly line: string;
  readonly item: string;
}

const AN_EPIC_IMPORT =
  /^import \{ (E\d\d)_[A-Z_]+ \} from '[./]+\/E\d\d\/E\d\d\w*\.ts';$/;

// the registry reaches the epic folder from its own depth under roadmaps/
const prefixOf = (registry: string): string => {
  const depth = registry.split('/').length - 2;
  return depth === 0
    ? '.'
    : Array.from({ length: depth }, () => '..').join('/');
};

function startedFile(epic: EpicStart, file: EpicFile): StartedFile {
  const name = `${epic.id}_${file.kind.toUpperCase()}`;
  const module = `${epic.id}/${epic.id}${file.kind}.ts`;
  return {
    path: `roadmaps/${module}`,
    text: file.text(epic),
    registry: file.registry,
    name,
    line: `import { ${name} } from '${prefixOf(file.registry)}/${module}';`,
    item: file.item === 'spread' ? `  ...${name},` : `  ${name},`,
  };
}

const epicFilesOf = (epic: EpicStart): readonly StartedFile[] =>
  EPIC_FILES.map((file) => startedFile(epic, file));

// the line goes before the first like it of a later epic, or after the last like it
function inOrder(
  lines: readonly string[],
  { line, like }: { readonly line: string; readonly like: RegExp },
): readonly string[] {
  const epicOf = (text: string): string => like.exec(text)?.[1] ?? '';
  const mine = epicOf(line);
  const at = lines.findIndex((text) => like.test(text) && epicOf(text) > mine);
  const last = lines.reduce(
    (found, text, index) => (like.test(text) ? index : found),
    -1,
  );
  const where = at === -1 ? last + 1 : at;
  return [...lines.slice(0, where), line, ...lines.slice(where)];
}

function registered(text: string, file: StartedFile): string | null {
  if (text.includes(file.line)) return null;
  const anItem = file.item.startsWith('  ...')
    ? /^ {2}\.\.\.(E\d\d)_[A-Z_]+,$/
    : /^ {2}(E\d\d)_[A-Z_]+,$/;
  const imported = inOrder(text.split('\n'), {
    line: file.line,
    like: AN_EPIC_IMPORT,
  });
  return inOrder(imported, { line: file.item, like: anItem }).join('\n');
}

export { epicFilesOf, registered };
export type { EpicStart, StartedFile };
