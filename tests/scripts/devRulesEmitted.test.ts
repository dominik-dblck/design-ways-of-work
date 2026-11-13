import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import { describe, expect, it } from 'vitest';
import { rulesMarkdown } from '../../design/tools/emit/rulesMarkdown.ts';
import type { RuleFile } from '../../design/docs/rules/ruleTypes.ts';
import { HERE } from '../../scripts/repos.ts';

const DEV_RULES = path.join(HERE, 'dev', 'rules');
const basesOf = (extension: string): readonly string[] =>
  fs
    .readdirSync(DEV_RULES)
    .filter((file) => file.endsWith(extension))
    .map((file) => file.slice(0, -extension.length))
    .sort();
const BASES = basesOf('.ts');

// both sides as the formatter leaves them: a product's run formats what it writes
async function formatted(text: string, file: string): Promise<string> {
  const options = await prettier.resolveConfig(file);
  return prettier.format(text, { ...options, filepath: file });
}

describe('the build side’s rule files are what its rules print', () => {
  it('there are rule files to compare', () => {
    expect(BASES.length).toBeGreaterThan(0);
  });

  // a page left after its module went, or a module with no page, is a rule read two ways
  it('each module has its page, and each page its module', () => {
    expect(basesOf('.md')).toEqual(BASES);
  });

  it.each(BASES)('dev/rules/%s.md', async (base) => {
    const loaded: { readonly rules: RuleFile } = await import(
      path.join(DEV_RULES, `${base}.ts`)
    );
    const file = path.join(DEV_RULES, `${base}.md`);
    expect(await formatted(rulesMarkdown(loaded.rules), file)).toBe(
      await formatted(fs.readFileSync(file, 'utf8'), file),
    );
  });
});
