/**
 * - `BACKUP_HOOK` · eagle-design's take of the post-commit hook: a home now
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

// its hook leaves for the home's, which reads the remote from the scope: the bundle and the push only where origin is it
const BACKUP_HOOK: Migration = {
  release: '0.12.0',
  removes: ['.husky/post-commit'],
  moves: [],
  edits: [
    {
      file: 'scope.ts',
      from: '  root: import.meta.dirname,\n',
      to: "  root: import.meta.dirname,\n  // each commit bundled under ~/backups and its branch pushed here, by the post-commit hook\n  backup: { remote: 'https://github.com/dominik-dblck/eagle-design.git' },\n",
    },
  ],
  tree: null,
};

export { BACKUP_HOOK };
