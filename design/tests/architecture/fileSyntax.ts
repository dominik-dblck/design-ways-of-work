/**
 * - `syntaxOf`, `exportedValuesOf`, `exportedNamesOf` · a source's tree and what it exports
 */
import ts from 'typescript';
import { exportedNamesOf as namesOf } from '../../shared/lint/exportedNames.ts';
import type { Source } from './tree.ts';

export const syntaxOf = (source: Source): ts.SourceFile =>
  ts.createSourceFile(source.path, source.text, ts.ScriptTarget.Latest, true);

/** The values a file exports by name · types are the vocabulary, and are not counted. */
export const exportedValuesOf = (source: Source): readonly string[] =>
  namesOf(syntaxOf(source), { types: false });

/** Every name a file exports, its types too. */
export const exportedNamesOf = (source: Source): readonly string[] =>
  namesOf(syntaxOf(source), { types: true });
