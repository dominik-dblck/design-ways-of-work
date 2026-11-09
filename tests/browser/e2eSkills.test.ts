import { describe, expect, it } from 'vitest';
import { e2eSkillPart } from '../../dev/claude/skills/e2e/e2eSkillPart.ts';
import type { BrowserTier } from '../../shared/browserTypes.ts';
import { e2eSkillFiles } from '../../shared/skills/e2eSkills.ts';

// the product's half of the skills, as its tier holds it
type BrowserSkill = BrowserTier['skill'];

const SHARED = '.agent/skills/e2e/_shared.md';
const DISCOVERY = '.agent/skills/e2e-discovery/SKILL.md';
const CATEGORY = '.agent/skills/e2e-category/SKILL.md';
const NO_SKILL: BrowserSkill = {
  folder: '.agent/skills',
  rules: [],
  after: {},
};

const tierWith = (skill: BrowserSkill): BrowserTier => ({
  screensRoot: 'app/screens',
  statusRoot: 'roadmaps/e2e',
  registry: 'app/testIds',
  templates: 'docs/templates',
  componentRoots: [],
  roles: ['AU', 'AP'],
  command: 'pnpm flows',
  healthPath: '/healthz',
  skill,
  exemptions: [],
});

const pageAt = (files: ReadonlyMap<string, string>, at: string): string =>
  files.get(at) ?? '';

describe('the e2e skills, written from the data and a tier never put on disk', () => {
  it('green · three files in the tier’s folder, each saying it is written', () => {
    const files = e2eSkillFiles(tierWith(NO_SKILL));
    expect([...files.keys()]).toEqual([SHARED, DISCOVERY, CATEGORY]);
    for (const page of files.values()) {
      expect(page).toContain('edit the data, never this file');
      expect(page).not.toContain('{{');
    }
  });

  it('green · every name the tier gives, in place of its token', () => {
    const files = e2eSkillFiles(tierWith(NO_SKILL));
    expect(pageAt(files, SHARED)).toContain('/healthz');
    expect(pageAt(files, SHARED)).toContain('from `app/testIds/`.');
    expect(pageAt(files, SHARED)).toContain(
      '`pnpm flows app/screens/{screen} --grep "<category>"`',
    );
    expect(pageAt(files, DISCOVERY)).toContain(
      '`.agent/skills/e2e/_shared.md`',
    );
    expect(pageAt(files, DISCOVERY)).toContain(
      '`roadmaps/e2e/{screen}-status.md`',
    );
    expect(pageAt(files, DISCOVERY)).toContain(
      '`docs/templates/e2e-catalog.md`',
    );
  });

  it('green · the shared rules numbered 1 to 12, the product’s after them', () => {
    const shared = pageAt(
      e2eSkillFiles(
        tierWith({
          ...NO_SKILL,
          rules: [
            {
              key: 'seeded',
              text: '**The store is seeded.** Or nothing runs.',
            },
          ],
        }),
      ),
      SHARED,
    );
    expect(shared).toContain('**1 · The app is running');
    expect(shared).toContain('**12 · Time is moved');
    expect(shared).toContain('**13 · The store is seeded.** Or nothing runs.');
  });

  it('green · a step cites a step and a rule by number, its second half as `Na.`', () => {
    const files = e2eSkillFiles(tierWith(NO_SKILL));
    expect(pageAt(files, DISCOVERY)).toContain(
      '\n7. Check the catalogue against step 2 ',
    );
    expect(pageAt(files, DISCOVERY)).toContain('\n   2a. Write the matrix');
    expect(pageAt(files, DISCOVERY)).toContain('every role (rule 8)');
    expect(pageAt(files, CATEGORY)).toContain('`getByTestId` alone (rule 11)');
  });

  it('green · the product’s lines after a step and closing an input, its rule cited', () => {
    const files = e2eSkillFiles(
      tierWith({ ...e2eSkillPart, folder: '.agent/skills' }),
    );
    expect(pageAt(files, SHARED)).toContain(
      '**16 · One command on the database at a time.**',
    );
    expect(pageAt(files, DISCOVERY)).toContain(
      "**Input.** One screen. The screen roster is the design project's; the code is here.",
    );
    expect(pageAt(files, DISCOVERY)).toMatch(
      /\n {3}8a\. Run the three gates[^\n]*\n {3}Here they run as one `yarn vitest run` on the three, never while `pnpm flows` runs \(rule 16\)\.\n9\. /,
    );
    expect(pageAt(files, CATEGORY)).toMatch(
      /\n {3}- [^\n]*\n {3}A case the sheet does not hold goes on the entry as `added`, and in the report\.\n5\. /,
    );
  });

  it('red · a token nothing gives, a rule key twice, a line at a step no page holds', () => {
    expect(() =>
      e2eSkillFiles(
        tierWith({
          ...NO_SKILL,
          rules: [{ key: 'own', text: '**Own.** `{{database}}`' }],
        }),
      ),
    ).toThrow('{{database}} names nothing the tier or the data holds');
    expect(() =>
      e2eSkillFiles(
        tierWith({
          ...NO_SKILL,
          after: { 'e2e-category.flows': 'see {{ruleNumber:nowhere}}' },
        }),
      ),
    ).toThrow('{{ruleNumber:nowhere}} names nothing');
    expect(() =>
      e2eSkillFiles(
        tierWith({
          ...NO_SKILL,
          rules: [{ key: 'probe', text: '**Again.**' }],
        }),
      ),
    ).toThrow('a rule key twice: probe');
    expect(() =>
      e2eSkillFiles(
        tierWith({ ...NO_SKILL, after: { 'e2e-category.nowhere': 'lost' } }),
      ),
    ).toThrow('names no step or input a page holds: e2e-category.nowhere');
  });
});
