/**
 * - `e2eSkillFiles` · a product's e2e skills, written from the shared data
 * - every name its browser tier gives resolved, every rule and step numbered
 */
import type { BrowserTier, SkillRule } from '../browserTypes.ts';
import { FLOW_CATEGORY } from './e2e/flowCategory.ts';
import { FLOW_DISCOVERY } from './e2e/flowDiscovery.ts';
import { BROWSER_OPENING, BROWSER_RULES } from './e2e/browserRules.ts';
import type { SkillPage, SkillStep } from './skillTypes.ts';

const WRITTEN =
  '<!-- Written by `node shared/skills/writeE2eSkills.ts` from `shared/skills/e2e/` and the scope’s browser tier: edit the data, never this file. -->';
const A_TOKEN = /\{\{([\w:]+)\}\}/g;

interface Lookup {
  readonly names: Readonly<Record<string, string>>;
  readonly rules: ReadonlyMap<string, string>;
  readonly steps: ReadonlyMap<string, string>;
}

const namesOf = (tier: BrowserTier): Readonly<Record<string, string>> => ({
  screensRoot: tier.screensRoot,
  statusRoot: tier.statusRoot,
  registry: tier.registry,
  templates: tier.templates,
  command: tier.command,
  healthPath: tier.healthPath,
  skills: tier.skill.folder,
  roles: tier.roles.map((role) => `\`${role}\``).join(', '),
});

// every token resolved, or the writer stops naming it: a name nothing gives is a typo in the data
const resolved = (text: string, { names, rules, steps }: Lookup): string =>
  text.replace(A_TOKEN, (token, name: string) => {
    const [kind = '', key] = name.split(':');
    const found =
      key === undefined
        ? names[kind]
        : ({ ruleNumber: rules, stepNumber: steps }[kind]?.get(key) ??
          undefined);
    if (found === undefined)
      throw new Error(
        `e2e skills · ${token} names nothing the tier or the data holds`,
      );
    return found;
  });

// the shared rules, then the product's, numbered on: a key twice would cite two rules
function rulesOf(tier: BrowserTier): readonly SkillRule[] {
  const rules = [...BROWSER_RULES, ...tier.skill.rules];
  const keys = rules.map(({ key }) => key);
  const twice = keys.filter((key, at) => keys.indexOf(key) !== at);
  if (twice.length > 0)
    throw new Error(`e2e skills · a rule key twice: ${twice.join(', ')}`);
  return rules;
}

const numbered = (rule: SkillRule, at: number): string =>
  rule.text.replace(/^\*\*/, `**${at + 1} · `);

// a step as the page prints it: its line, its list, its second half, then the product's line after it
function stepLines({
  step,
  at,
  after,
}: {
  readonly step: SkillStep;
  readonly at: number;
  readonly after: string | undefined;
}): readonly string[] {
  return [
    `${at + 1}. ${step.text}`,
    ...(step.points ?? []).map((point) => `   - ${point}`),
    ...(step.then === undefined ? [] : [`   ${at + 1}a. ${step.then}`]),
    ...(after === undefined ? [] : [`   ${after}`]),
  ];
}

function pageText({
  page,
  tier,
  lookup,
}: {
  readonly page: SkillPage;
  readonly tier: BrowserTier;
  readonly lookup: Lookup;
}): string {
  const steps = new Map(page.steps.map(({ key }, at) => [key, String(at + 1)]));
  const after = (key: string): string | undefined =>
    tier.skill.after[`${page.name}.${key}`];
  const text = [
    `---\nname: ${page.name}\ndescription: ${page.description}\n---`,
    WRITTEN,
    `**Purpose.** ${page.purpose}`,
    [`**Input.** ${page.input}`, after('input')].filter(Boolean).join(' '),
    `**Tasks.**\n\n${page.steps.flatMap((step, at) => stepLines({ step, at, after: after(step.key) })).join('\n')}`,
    ...page.closing,
  ].join('\n\n');
  return `${resolved(text, { ...lookup, steps })}\n`;
}

// a product line naming a step no page holds would print nowhere; `{page}.input` closes the input
function strayAfters(tier: BrowserTier): readonly string[] {
  const held = new Set(
    [FLOW_DISCOVERY, FLOW_CATEGORY].flatMap((page) =>
      ['input', ...page.steps.map(({ key }) => key)].map(
        (key) => `${page.name}.${key}`,
      ),
    ),
  );
  return Object.keys(tier.skill.after).filter((key) => !held.has(key));
}

function e2eSkillFiles(tier: BrowserTier): ReadonlyMap<string, string> {
  const stray = strayAfters(tier);
  if (stray.length > 0)
    throw new Error(
      `e2e skills · a product line names no step or input a page holds: ${stray.join(', ')}`,
    );
  const rules = rulesOf(tier);
  const lookup: Lookup = {
    names: namesOf(tier),
    rules: new Map(rules.map(({ key }, at) => [key, `rule ${at + 1}`])),
    steps: new Map(),
  };
  const shared = [WRITTEN, BROWSER_OPENING, ...rules.map(numbered)].join(
    '\n\n',
  );
  const folder = tier.skill.folder;
  return new Map([
    [`${folder}/e2e/_shared.md`, `${resolved(shared, lookup)}\n`],
    [
      `${folder}/e2e-discovery/SKILL.md`,
      pageText({ page: FLOW_DISCOVERY, tier, lookup }),
    ],
    [
      `${folder}/e2e-category/SKILL.md`,
      pageText({ page: FLOW_CATEGORY, tier, lookup }),
    ],
  ]);
}

export { e2eSkillFiles };
