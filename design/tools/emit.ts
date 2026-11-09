/**
 * - `emittedTexts` · each file the layout lists as its data prints, and the tokens
 * - JSON, two spaces · a rule file as its table · a skill, a document as markdown
 */
import path from 'node:path';
import type { DocumentFile } from '../docs/documents/documentTypes.ts';
import type { RuleFile } from '../docs/rules/ruleTypes.ts';
import type { SkillFile } from '../docs/skills/skillTypes.ts';
import { withContents } from './emit/documentContents.ts';
import { emitted, ROOT } from './layout.ts';
import { tokensText } from './tokens.ts';
import type { Emitted } from './layout.ts';

const HEAD = ['Rule', 'Gate', 'Exceptions', 'Why'] as const;

const isRuleFile = (loaded: unknown): loaded is RuleFile =>
  typeof loaded === 'object' &&
  loaded !== null &&
  ['title', 'intro', 'outro'].every(
    (key) => typeof Reflect.get(loaded, key) === 'string',
  ) &&
  Array.isArray(Reflect.get(loaded, 'rows'));

const isSkillFile = (loaded: unknown): loaded is SkillFile =>
  typeof loaded === 'object' &&
  loaded !== null &&
  ['title', 'description', 'intro'].every(
    (key) => typeof Reflect.get(loaded, key) === 'string',
  ) &&
  Array.isArray(Reflect.get(loaded, 'sections'));

// a skill as Claude Code loads it: its name is its folder's, its sections numbered when the order holds
function skillMarkdown(one: Emitted, file: SkillFile): string {
  const name = path.posix.basename(path.posix.dirname(one.fixture));
  return [
    '---',
    `name: ${name}`,
    `description: ${JSON.stringify(file.description)}`,
    '---',
    '',
    `<!-- Written by \`yarn build\` from \`${one.module}\`: edit the data, never this file. -->`,
    '',
    `# ${file.title}`,
    '',
    file.intro,
    ...file.sections.flatMap((section) => [
      '',
      `## ${section.heading}`,
      '',
      ...(section.lead === null ? [] : [section.lead, '']),
      ...section.lines.map(
        (line, at) =>
          `${section.first === null ? '-' : `${section.first + at}.`} ${line}`,
      ),
    ]),
    '',
  ].join('\n');
}

// the table padded to its widest cell per column, as the rule files were written
function rulesMarkdown(file: RuleFile): string {
  const rows = file.rows.map((row) => [
    row.rule,
    row.gate,
    row.exceptions,
    row.why,
  ]);
  const widths = HEAD.map((head, at) =>
    Math.max(head.length, ...rows.map((row) => String(row[at]).length)),
  );
  const line = (cells: readonly string[]): string =>
    `| ${cells.map((cell, at) => cell.padEnd(widths[at] ?? 0)).join(' | ')} |`;
  const rule = `| ${widths.map((width) => '-'.repeat(width)).join(' | ')} |`;
  return [
    `# ${file.title}`,
    file.intro,
    line(HEAD),
    rule,
    ...rows.map(line),
    file.outro,
  ].join('\n');
}

const isDocumentFile = (loaded: unknown): loaded is DocumentFile =>
  typeof loaded === 'object' &&
  loaded !== null &&
  typeof Reflect.get(loaded, 'path') === 'string' &&
  Array.isArray(Reflect.get(loaded, 'sections'));

// a document's sections joined by newlines, each heading line above its own; a long one's contents above
const documentMarkdown = (file: DocumentFile): string =>
  withContents(
    file.sections
      .flatMap((section) =>
        section.heading === null
          ? section.lines
          : [section.heading, ...section.lines],
      )
      .join('\n'),
  );

function printed(one: Emitted, exported: unknown): string {
  if (one.print === 'json') return `${JSON.stringify(exported, null, 2)}\n`;
  if (one.print === 'document') {
    if (!isDocumentFile(exported) || exported.path !== one.fixture)
      throw new Error(
        `${one.module} · ${one.name} is no document of ${one.fixture}`,
      );
    return documentMarkdown(exported);
  }
  if (one.print === 'skill') {
    if (!isSkillFile(exported))
      throw new Error(`${one.module} · ${one.name} is no skill file`);
    return skillMarkdown(one, exported);
  }
  if (!isRuleFile(exported))
    throw new Error(`${one.module} · ${one.name} is no rule file`);
  return rulesMarkdown(exported);
}

// [the file, its text] for each module the layout lists, in its order, then the tokens
async function emittedTexts(): Promise<readonly (readonly [string, string])[]> {
  const texts = await Promise.all(
    emitted().map(async (one) => {
      const loaded: unknown = await import(path.join(ROOT, one.module));
      const exported: unknown = Reflect.get(Object(loaded), one.name);
      if (exported === undefined)
        throw new Error(`${one.module} exports no ${one.name}`);
      return [one.fixture, printed(one, exported)] as const;
    }),
  );
  return [...texts, ['app/styles/tokens.ts', tokensText()]];
}

export { emittedTexts };
