/**
 * - `REWRITTEN` · the snapshots eagle-design's port holds as modules, each with
 * - the JSON its `main` still holds; the guard's map is none, a run writes it
 */
import type { Rewritten } from '../../scripts/portTypes.ts';

const at = (file: string): string => `guards/__snapshots__/${file}`;

const REWRITTEN: readonly Rewritten[] = [
  {
    from: at('content-type-snapshot.json'),
    to: at('contentTypeSnapshot.ts'),
    name: 'contentTypeSnapshot',
  },
  {
    from: at('measure-snapshot.json'),
    to: at('measureSnapshot.ts'),
    name: 'measureSnapshot',
  },
  {
    from: at('pool-snapshot.json'),
    to: at('poolSnapshot.ts'),
    name: 'poolSnapshot',
  },
  {
    from: at('sentences-snapshot-19-oct.json'),
    to: at('sentencesSnapshot.ts'),
    name: 'sentencesSnapshot',
  },
  {
    from: at('wireframes-snapshot.json'),
    to: at('wireframesSnapshot.ts'),
    name: 'wireframesSnapshot',
  },
];

export { REWRITTEN };
