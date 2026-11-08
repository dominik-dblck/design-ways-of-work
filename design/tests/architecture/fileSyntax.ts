/**
 * - `exportedValuesOf` · the values a source exports, read off its tree
 */
import ts from 'typescript';
import { exportedNamesOf as namesOf } from '../../shared/lint/exportedNames.ts';
import type { Source } from './tree.ts';

const syntaxOf = (source: Source): ts.SourceFile =>
  ts.createSourceFile(source.path, source.text, ts.ScriptTarget.Latest, true);

/** The values a file exports by name · types are the vocabulary, and are not counted. */
export const exportedValuesOf = (source: Source): readonly string[] =>
  namesOf(syntaxOf(source), { types: false });
