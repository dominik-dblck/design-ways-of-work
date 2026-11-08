/**
 * - `DocumentFile`, `DocumentSection` · a markdown file the build side reads
 */

// a heading line as written, `## …`, with the lines under it; null goes on from the one before
interface DocumentSection {
  readonly heading: string | null;
  readonly lines: readonly string[];
}

// the path it prints at, and its sections in order: joined by newlines, it is the file
interface DocumentFile {
  readonly path: string;
  readonly sections: readonly DocumentSection[];
}

export type { DocumentFile, DocumentSection };
