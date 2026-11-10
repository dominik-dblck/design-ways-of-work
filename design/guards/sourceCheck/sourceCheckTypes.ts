/**
 * - `SourceFinding`, `Texts`, `MapRow`, `TextKinds`, `LineAt`, `Leaf` · the scans
 * - `FileHead`, `ReadRow`, `FileReads`, `CallRow`, `UseRow` · a header, its reads
 * - `FileNode`, `FileLink`, `MapMove`, `GuardMap` · the files' map
 */

interface SourceFinding {
  readonly kind: string;
  readonly row: string;
  readonly file: string;
  readonly line: number;
  readonly home?: string;
  readonly text: string;
}

// a file the run could not read is null, one it did not ask for is missing
type Texts = Readonly<Record<string, string | null | undefined>>;

interface MapRow {
  readonly row: string;
  readonly home: readonly string[];
}

// a file's default kind, then the keys and declarations whose strings are another kind
interface TextKinds {
  readonly is: string;
  readonly sheet?: readonly string[];
  readonly screen?: readonly string[];
  readonly content?: readonly string[];
  readonly typed?: readonly string[];
  readonly sheetIn?: {
    readonly decl: readonly string[];
    readonly keys: readonly string[];
  };
  readonly sheetDecl?: readonly string[];
  readonly expectedIn?: readonly string[];
}

// a line the scan stands on, and the declaration it sits in
interface LineAt {
  readonly file: string;
  readonly index: number;
  readonly line: string;
  readonly decl: string;
}

// a string of messages.js with a space in it: its path, its key, its object's other keys
interface Leaf {
  readonly path: string;
  readonly text: string;
  readonly key: string | number;
  readonly siblings: readonly string[] | null;
}

// a glossary word a screen never says, the texts it may stand in, the term it belongs to
interface WordBan {
  readonly word: string;
  readonly pattern: RegExp;
  readonly except: readonly string[];
  readonly term: string;
}

interface FileHead {
  readonly about: string;
  readonly answers: string;
  readonly answersCount: number;
  readonly holds: readonly string[];
  readonly bullets?: boolean;
}

interface ReadRow {
  readonly file: string;
  readonly line: number;
}

interface FileReads {
  readonly exports: readonly string[];
  readonly reads: readonly ReadRow[];
}

interface CallRow {
  readonly line: number;
  readonly code: string;
}

interface UseRow extends CallRow {
  readonly file: string;
  readonly layer: number;
}

interface FileNode {
  readonly file: string;
  readonly layer: number;
  readonly homeRows: readonly string[];
  readonly ported: boolean;
  readonly about: string;
  readonly findings: Readonly<Record<string, number>>;
  readonly total: number;
  readonly answers: string;
  readonly holds: readonly string[];
  readonly exposes: {
    readonly globals: readonly string[];
    readonly names: readonly string[];
  };
  readonly reads: readonly (ReadRow & { readonly code: string })[];
  readonly usedBy: readonly UseRow[];
  readonly checkedBy: readonly UseRow[];
}

type NodeBase = Pick<
  FileNode,
  'file' | 'layer' | 'homeRows' | 'ported' | 'about'
>;

// what the map is drawn from: the texts, the layered files' reads, every file's readers
interface DrawnFiles {
  readonly texts: Texts;
  readonly reads: Readonly<Record<string, FileReads>>;
  readonly uses: ReadonlyMap<string, readonly UseRow[]>;
}

// a copy's file and its home, and the copies between them by kind
interface CopyTally {
  readonly from: string;
  readonly to: string;
  readonly kinds: ReadonlyMap<string, number>;
}

interface MapMove {
  readonly from: string;
  readonly to: string;
  readonly fact?: unknown;
  readonly by?: unknown;
}

interface FileLink extends MapMove {
  readonly kind: string;
  readonly against?: boolean;
  readonly n?: number;
  readonly kinds?: Readonly<Record<string, number>>;
}

interface MapOptions {
  readonly moves?: readonly MapMove[];
  readonly layerNames?: Readonly<Record<string, unknown>>;
}

interface GuardMap {
  readonly files: readonly FileNode[];
  readonly links: readonly FileLink[];
  readonly moves: readonly MapMove[];
  readonly layerNames: Readonly<Record<string, unknown>>;
  readonly quiet: readonly string[];
  readonly counts: Readonly<Record<string, number>>;
}

export type {
  CallRow,
  CopyTally,
  DrawnFiles,
  FileHead,
  FileLink,
  FileNode,
  FileReads,
  SourceFinding,
  GuardMap,
  Leaf,
  LineAt,
  MapOptions,
  MapRow,
  NodeBase,
  ReadRow,
  Texts,
  TextKinds,
  UseRow,
  WordBan,
};
