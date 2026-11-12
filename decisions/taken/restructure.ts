/**
 * - `RESTRUCTURE` · a normal repository: its tree, its data, its rules, as a design product took them first
 */
import type { Decision } from '../../scripts/decisionTypes.ts';

const RESTRUCTURE: readonly Decision[] = [
  {
    id: 'W46',
    title: 'a normal repository',
    held: '4 Nov · Q1 · A, PM',
    says: 'the design project leaves `project/` for the tree of the proposal (artifact `Y5nUM71hSjPau7DqLqeiTb`, v4.3), shaped as mailing-automation is; the build side changes its paths once, with release 3. Order of the work (PM): phases 1 → 4 → 5 → 3 → 6 → 2, `notes/restructure-plan.md`.',
    from: 'eagle-design D18',
  },
  {
    id: 'W47',
    title: 'one board, the epic is the card',
    held: '4 Nov · Q5 · A, PM',
    says: 'Ideas, Backlog and Kanban are one page; a fix is a ticket in the epic it fixes; Ticket tracks is a rule of the process, its mode a chip on the ticket.',
    from: 'eagle-design D19',
  },
  {
    id: 'W48',
    title: 'the logic in one place',
    held: '4 Nov · Q6 · A, PM',
    says: 'how the app behaves lives in `sheet/logic/{capability}/` (approval, translation, delivery, assembly, document, agent), each as states, rules, walk, examples; an epic notes what it changed, never holds logic.',
    from: 'eagle-design D20',
  },
  {
    id: 'W49',
    title: 'everything is data',
    held: '4 Nov · Q7 · A, PM',
    says: "decisions, open findings, the state today, epic notebooks, code rules and the build side's instructions are data; markdown is only an output generated from data, `CLAUDE.md` pointing at it, or the archive.",
    from: 'eagle-design D21',
  },
  {
    id: 'W50',
    title: 'styles in TypeScript',
    held: '4 Nov, PM',
    says: 'tokens in `app/styles/tokens.ts`, generated from the design system; styles as CSS-in-JS (Emotion + MUI, as mailing-automation); no hand-written HTML or CSS anywhere.',
    from: 'eagle-design D22',
  },
  {
    id: 'W51',
    title: 'SSOT and SRP held by gates',
    held: '4 Nov, PM',
    says: 'a fact has one home, a folder one job (audit v4.3); every commit runs ESLint, tsc, the architecture tests and the checks against the known fails; an edited `.ts` is linted at once.',
    from: 'eagle-design D23',
  },
  {
    id: 'W52',
    title: 'nothing is deleted, it goes to `legacy/`',
    held: '4 Nov, PM',
    says: 'what the restructure retires stays readable there.',
    from: 'eagle-design D24',
  },
  {
    id: 'W53',
    title: "the design side's process as skills, written from data",
    held: '4 Nov · Skille · A, PM',
    says: 'each job of the design side is a skill, `.claude/skills/design-*/SKILL.md`, written by the build from `docs/skills/{name}.ts`; `CLAUDE.md` keeps what holds on every turn and names the skills. Done before the React pages (PM).',
    from: 'eagle-design D25',
  },
  {
    id: 'W54',
    title: 'a row the sheet cites carries its id, in an array',
    held: '4 Nov · Rows with an id · A, PM',
    says: 'rules, checklist lines, decisions and findings are rows `{ id, … }` in an array, the id written as the sheet cites it (`RULES 47`, `checklist 24`, `D25`, `O17`), never a place to count to; a table the code reads by key is a `Record`. The checks find a gap or a repeat in each run of ids, a test finds a citation with no row.',
    from: 'eagle-design D26',
  },
  {
    id: 'W55',
    title: 'a rule is its words and one sentence of why, never its history',
    held: '4 Nov · Why · A, PM',
    says: 'a row of `RULES` and of `TICKET_CHECKLIST` says the rule in general words and, in one sentence, the cost it avoids; no ticket, date, stage or incident stands in it. The texts as they stand go whole to `legacy/` (D24), and git dates each one-line row.',
    from: 'eagle-design D27',
  },
  {
    id: 'W56',
    title: 'the way of working is product-agnostic',
    held: '4 Nov, PM',
    says: 'the rules, the checklist and the skills are a way of working another product can take as a template: no product fact, business rule or file of the sheet lives in them, and the product’s own rules live with its sheet (where: O18).',
    from: 'eagle-design D28',
  },
  {
    id: 'W57',
    title: 'a rule is named by what it does',
    held: '4 Nov · Key · A, PM',
    says: 'a rule and a checklist line carry a kebab-case key that says what the rule does (`one-source-of-truth`), one namespace for both, cited in text as rule:{key}, in the array shape D26 gave them; a key never changes meaning, and a rule with a new meaning takes a new key. Decisions and findings keep their numbers, being events in time. The numbers stand beside their keys in `legacy/rules-before-4-nov.md`. Replaces D26 for rules and checklist lines.',
    from: 'eagle-design D29',
  },
  {
    id: 'W58',
    title: 'a product fills five slots of rules',
    held: '4 Nov · Slots · A, PM',
    says: 'beside the generic rules, which the template brings, a product fills five slots: domain (its words), product (what it does and for whom), experience (how it looks and behaves), architecture (how it is built) and quality (what it guarantees, apart from how). No organisation layer stands between them. Decisions and a team’s preferences are the project’s data, not rules.',
    from: 'eagle-design D30',
  },
  {
    id: 'W59',
    title: 'the generic rules in four groups, by who applies them',
    held: '4 Nov · Groups, PM',
    says: 'design (the design side’s, the ticket checklist its rules before READY), delivery (the build side’s), principles (those both sides apply) and code (how code is written, `docs/rules`). A rule goes to the group of whoever applies it; what the build side receives is delivery, principles and code.',
    from: 'eagle-design D31',
  },
  {
    id: 'W60',
    title: 'the five slots in one folder, `sheet/rules/`',
    held: '4 Nov · Slot homes · A, PM',
    says: 'one file per slot (`domainRules.ts`, `productRules.ts`, `experienceRules.ts`, `architectureRules.ts`, `qualityRules.ts`), each saying what it asks, the homes that already hold its facts (the glossary, the requirement rows) and its rows; `sheet/rules.ts` reads them. A template brings the five files empty.',
    from: 'eagle-design D32',
  },
  {
    id: 'W61',
    title: 'a rule has one row, the checklist cites the others',
    held: '4 Nov · Duplicates · A, PM',
    says: 'a checklist line that says what a rule of another group says leaves the checklist; what it said beyond the rule goes into that rule’s row, and the checklist names the rule in `CHECKLIST_CITES`. The pack prints the checklist’s lines and the rules it cites, each as rule:{key} · its words, and a clause of Checklist, read may be keyed by either.',
    from: 'eagle-design D34',
  },
  {
    id: 'W62',
    title: 'a feature run decides a contradiction, the PM reads it after',
    held: '4 Nov · Stop or run · A, PM',
    says: 'outside a feature run the build stops at a spec that does not hold together (rule:stop-at-a-contradiction); in a feature run two rows that contradict each other are decided like a silence of the sheet, written as did X because Y and read at the contract snapshot or the report (rule:feature-run-never-stops). Every call of the build side takes one path.',
    from: 'eagle-design D35',
  },
];

export { RESTRUCTURE };
