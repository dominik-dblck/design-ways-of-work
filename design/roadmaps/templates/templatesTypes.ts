/**
 * - `EpicStart`, `EpicFile` · the epic a folder is started for, one file of it
 */
interface EpicStart {
  readonly id: string;
  readonly name: string;
}

// kind: the last word of the file's name, naming the entry it serves · item: how the registry lists it
interface EpicFile {
  readonly kind: 'Tickets' | 'Edges' | 'Receipts' | 'Notes';
  readonly registry: string;
  readonly item: 'spread' | 'value';
  readonly text: (epic: EpicStart) => string;
}

export type { EpicFile, EpicStart };
