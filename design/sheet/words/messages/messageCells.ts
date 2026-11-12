/**
 * - `cells` · every line the tables hold, each with its table, situation and reader
 * - `MessageCell` · one such line
 */
import {
  OUTCOME,
  PILL,
  READERS,
  SCREEN,
  VALIDATOR,
  VALIDATOR_WORD_KEYS,
  WALKED_TABLES,
} from './messageRows.ts';
import { REFUSAL } from './refusals.ts';
import { ROWS } from './situations.ts';
import { HINT, HOVER, LABEL } from './words.ts';

interface MessageCell {
  readonly table: string;
  readonly situation: string;
  readonly reader: string;
  readonly line: unknown;
}

const tableCells = (): MessageCell[] =>
  ROWS.flatMap((row) => [
    { table: 'state', situation: row[0], reader: '', line: row[2] },
    ...READERS.map((reader, index) => ({
      table: 'move',
      situation: row[0],
      reader,
      line: row[3 + index],
    })),
  ]);

const outcomeCells = (): MessageCell[] =>
  Object.entries(OUTCOME).flatMap(([situation, parts]) =>
    Object.entries(parts).map(([reader, line]) => ({
      table: 'outcome',
      situation,
      reader,
      line,
    })),
  );

const hintCells = (): MessageCell[] =>
  ROWS.flatMap((row) => {
    const line = HINT[row[0]];
    return line ? [{ table: 'hint', situation: row[0], reader: '', line }] : [];
  });

// a table walked whole, each string a line the glossary reads
function walked(
  table: object,
  at: { readonly table: string; readonly path: string },
): MessageCell[] {
  return Object.entries(table).flatMap(([key, inner]: [string, unknown]) => {
    const situation = at.path ? `${at.path}.${key}` : key;
    if (typeof inner === 'string')
      return [{ table: at.table, situation, reader: '', line: inner }];
    return inner && typeof inner === 'object'
      ? walked(inner, { table: at.table, path: situation })
      : [];
  });
}

const namedCells = (): MessageCell[] =>
  (
    [
      ['label', LABEL],
      ['hover', HOVER],
      ['screen', SCREEN],
    ] as const
  ).flatMap(([table, words]) =>
    Object.entries(words).map(([situation, line]: [string, unknown]) => ({
      table,
      situation,
      reader: '',
      line,
    })),
  );

const validatorCells = (): MessageCell[] =>
  Object.entries(VALIDATOR).flatMap(([situation, validator]) =>
    VALIDATOR_WORD_KEYS.flatMap((part) => {
      const text = validator[part];
      if (text && typeof text === 'object')
        return Object.entries(text).map(([query, line]) => ({
          table: 'validator',
          situation,
          reader: `${part}.${query}`,
          line,
        }));
      return text
        ? [{ table: 'validator', situation, reader: part, line: text }]
        : [];
    }),
  );

const refusalCells = (): MessageCell[] =>
  Object.entries(REFUSAL).flatMap(([situation, row]) => {
    const cell = (reader: string, line: unknown): MessageCell => ({
      table: 'refusal',
      situation,
      reader,
      line,
    });
    return [
      cell('line', row.line),
      ...(row.fix ? [cell('fix', row.fix)] : []),
      ...Object.entries(row.empty ?? {}).map(([count, line]) =>
        cell(`empty.${count}`, line),
      ),
      ...Object.entries(row.variants ?? {}).map(([count, line]) =>
        cell(`variant.${count}`, line),
      ),
    ];
  });

function cells(): MessageCell[] {
  return [
    ...tableCells(),
    ...outcomeCells(),
    { table: 'pill', situation: 'empty', reader: '', line: PILL.empty },
    ...hintCells(),
    ...Object.entries(WALKED_TABLES).flatMap(([table, words]) =>
      walked(words, { table, path: '' }),
    ),
    ...namedCells(),
    ...validatorCells(),
    ...refusalCells(),
  ];
}

export { cells };
export type { MessageCell };
