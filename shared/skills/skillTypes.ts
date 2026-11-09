/**
 * - `SkillPage`, `SkillStep` · a skill as data: its steps numbered when written
 */
// a step: its key, which a product's line cites to follow it, its text, its list, its second half (`2a`)
interface SkillStep {
  readonly key: string;
  readonly text: string;
  readonly points?: readonly string[];
  readonly then?: string;
}

// a skill's page: its frontmatter, purpose and input, its steps, then the paragraphs that close it
interface SkillPage {
  readonly name: string;
  readonly description: string;
  readonly purpose: string;
  readonly input: string;
  readonly steps: readonly SkillStep[];
  readonly closing: readonly string[];
}

export type { SkillPage, SkillStep };
