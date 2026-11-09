/**
 * - `node scripts/codefix.ts <repo> <code> [--flag <option>] [--keep <regex>]`
 * - each error of one code fixed as TypeScript's own codefix writes it, in place
 * - `--keep`: an access whose object's text it matches stays, listed for later
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import ts from 'typescript';
import { serviceOf } from './languageService.ts';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { flag: { type: 'string' }, keep: { type: 'string' } },
});
const [repo = '', code = ''] = positionals;
const ROOT = path.resolve(repo);
const CODE = Number(code);
const KEEP = values.keep === undefined ? null : new RegExp(values.keep);
const PREFERENCES: ts.UserPreferences = { quotePreference: 'single' };

const service = serviceOf(
  ROOT,
  values.flag === undefined ? {} : { [values.flag]: true },
);
const program = service.getProgram();
if (program === undefined) throw new Error(`no program in ${ROOT}`);

// the object an error's access reads: `payload` in `payload.kind`
function objectAt(file: ts.SourceFile, start: number): string {
  const find = (node: ts.Node): ts.Node | undefined =>
    ts.isPropertyAccessExpression(node) && node.name.getStart(file) === start
      ? node.expression
      : ts.forEachChild(node, find);
  return find(file)?.getText(file) ?? '';
}

const errors = program
  .getSemanticDiagnostics()
  .filter((one) => one.code === CODE && one.file !== undefined);
const isKept = (one: ts.Diagnostic): boolean =>
  one.file !== undefined &&
  KEEP?.test(objectAt(one.file, one.start ?? 0)) === true;

// TypeScript's first fix for one error, its edits by file
const fixesOf = (one: ts.Diagnostic): readonly ts.FileTextChanges[] =>
  service
    .getCodeFixesAtPosition(
      one.file?.fileName ?? '',
      one.start ?? 0,
      (one.start ?? 0) + (one.length ?? 0),
      [CODE],
      ts.getDefaultFormatCodeSettings(),
      PREFERENCES,
    )
    .slice(0, 1)
    .flatMap((fix) => fix.changes);

// each file's edits written from its end, so an earlier offset still holds; in place, a link kept
function written(changes: readonly ts.FileTextChanges[]): readonly string[] {
  const byFile = new Map<string, ts.TextChange[]>();
  // TypeScript may report one error twice: its edit is written once
  const seen = new Set<string>();
  for (const one of changes)
    byFile.set(one.fileName, [
      ...(byFile.get(one.fileName) ?? []),
      ...one.textChanges.filter((edit) => {
        const key = `${one.fileName}:${String(edit.span.start)}:${edit.newText}`;
        const isNew = !seen.has(key);
        seen.add(key);
        return isNew;
      }),
    ]);
  for (const [file, edits] of byFile) {
    const text = [...edits]
      .sort((one, other) => other.span.start - one.span.start)
      .reduce(
        (now, edit) =>
          now.slice(0, edit.span.start) +
          edit.newText +
          now.slice(edit.span.start + edit.span.length),
        fs.readFileSync(file, 'utf8'),
      );
    fs.writeFileSync(file, text);
  }
  return [...byFile.keys()];
}

const kept = errors.filter(isKept);
const files = written(errors.filter((one) => !isKept(one)).flatMap(fixesOf));
console.log(
  `${errors.length - kept.length} fixed in ${files.length} files, ${kept.length} kept`,
);
for (const file of files) console.log(`  FIXED · ${path.relative(ROOT, file)}`);
for (const one of kept) {
  const at = one.file?.getLineAndCharacterOfPosition(one.start ?? 0);
  console.log(
    `  KEPT · ${path.relative(ROOT, one.file?.fileName ?? '')}:${(at?.line ?? 0) + 1}`,
  );
}
