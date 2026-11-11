import { describe, expect, it } from 'vitest';
import { overHttps, versioned } from '../../scripts/releaseTexts.ts';

describe("the manifest's text takes the next version", () => {
  const MANIFEST = '{\n  "name": "a",\n  "version": "0.1.10"\n}\n';

  it('the version moves, the rest stays', () => {
    expect(versioned(MANIFEST, { from: '0.1.10', to: '0.2.0' })).toBe(
      '{\n  "name": "a",\n  "version": "0.2.0"\n}\n',
    );
  });

  it.each([
    ['another spacing', '{"version":"0.1.10"}'],
    ['another version', '{\n  "version": "0.1.9"\n}\n'],
  ])('a text of %s is refused, never left as it was', (_, manifest) => {
    expect(() => versioned(manifest, { from: '0.1.10', to: '0.2.0' })).toThrow(
      'holds no "version": "0.1.10"',
    );
  });
});

describe("a remote's address, as HTTPS reaches it", () => {
  it.each([
    ['git@github.com:owner/repo.git', 'https://github.com/owner/repo.git'],
    [
      'ssh://git@github.com/owner/repo.git',
      'https://github.com/owner/repo.git',
    ],
    [
      'ssh://git@github.com:22/owner/repo.git',
      'https://github.com/owner/repo.git',
    ],
    ['ssh://github.com/owner/repo.git', 'https://github.com/owner/repo.git'],
  ])('%s goes over HTTPS', (origin, url) => {
    expect(overHttps(origin)).toBe(url);
  });

  it.each(['https://github.com/owner/repo.git', '/a/folder/remote.git'])(
    '%s is left as it is',
    (origin) => {
      expect(overHttps(origin)).toBe(origin);
    },
  );
});
