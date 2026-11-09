/**
 * - `COMMITLINT` · commitlint's config: a commit message's shape, its words free
 */
import type { UserConfig } from '@commitlint/types';

// a subject read whole in one line of a log
const SUBJECT_AT_MOST = 72;

const COMMITLINT: UserConfig = {
  rules: {
    'header-max-length': [2, 'always', SUBJECT_AT_MOST],
    // a subject is a line, not a sentence
    'header-full-stop': [2, 'never', '.'],
    // what git and every tool read as the body starts after one blank line
    'body-leading-blank': [2, 'always'],
  },
};

export { COMMITLINT };
