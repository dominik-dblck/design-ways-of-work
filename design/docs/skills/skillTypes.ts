/**
 * - `SkillFile`, `SkillSection` · a design-side skill: what, when, its sections
 */
interface SkillSection {
  readonly heading: string;
  readonly lead: string | null;
  readonly first: number | null;
  readonly lines: readonly string[];
}

interface SkillFile {
  readonly title: string;
  readonly description: string;
  readonly intro: string;
  readonly sections: readonly SkillSection[];
}

export type { SkillFile };
