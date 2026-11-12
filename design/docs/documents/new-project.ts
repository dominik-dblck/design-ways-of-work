/**
 * - `newProject` · new-project.md as data: copy this project, fill, cut, check (D61)
 */
import type { DocumentFile } from './documentTypes.ts';

const newProject: DocumentFile = {
  path: 'docs/process/new-project.md',
  sections: [
    {
      heading: '# A new project from this one',
      lines: [
        '',
        'The way of working travels as a copy of this repository (D28, D61): the rules, the checklist, the',
        'skills, the checks, the pages and the tools stay as they are; the product’s names are filled in',
        'again, and what is the product’s own is cut by hand. No tool writes the copy.',
        '',
      ],
    },
    {
      heading: '## 1 · Copy',
      lines: [
        '',
        '- Copy the tree without `.git/`, `dist/` and `node_modules/`, then `git init` and `yarn install`.',
        '- The design system is never copied: `design-system/` comes from the way of working, and the',
        '  product keeps only the tokens it alone holds, in `app/styles/productTokens.ts` (PM, 8 Nov).',
        '',
      ],
    },
    {
      heading: '## 2 · Fill: the product’s names and rules',
      lines: [
        '',
        '- `sheet/project.ts` · the product, the company, the build side, both sessions, the build',
        '  repository, its branch and top paths, the tools its people know, the design system’s stylesheet.',
        '- `sheet/rules/` · the five slots, each file’s rows emptied, then written as the product is',
        '  decided: domain, product, experience, architecture, quality (D30, D32).',
        '- `CLAUDE.md` · the design side’s role, named for the product; `package.json` · its `name`.',
        '- `docs/rules/README.md` · where the code rules were adapted from.',
        '',
      ],
    },
    {
      heading: '## 3 · Cut: what is the product’s own',
      lines: [
        '',
        '- `roadmaps/E*/` · every epic’s folder. The registries keep their shape with no items:',
        '  `roadmaps/tickets/ticketList.ts`, `roadmaps/edges.ts`, `roadmaps/receipts.ts`, `roadmaps/notes.ts`.',
        '- `roadmaps/backlog/`, `roadmaps/ideas/`, `roadmaps/findings/`, `roadmaps/tracks.ts` · their rows.',
        '- `sheet/` · each entry’s rows: the contract, the cases, the words, the model, the screens;',
        '  `sheet/logic/` and `sheet/samples/` whole, being the product’s behaviour and its samples.',
        '- `docs/process/decisions/` · its rows: decisions are the project’s data, not the way of working.',
        '- `docs/process/projectPlan/` and `docs/process/plans/planPages.ts` · their rows.',
        '- `app/styles/componentsSpec/` · its rows; `app/styles/gateStates.ts` · the product’s looks.',
        '- `legacy/`, `records/`, `notes/`, `fixtures/`, `poc/`, `guards/__snapshots__/`, `public/assets/` · whole.',
        '',
      ],
    },
    {
      heading: '## 4 · Check',
      lines: [
        '',
        '- `npx tsc --noEmit` names each file that read what was cut: a check or a test of the product’s',
        '  own logic goes with it; a file of the way of working is changed to read nothing of the product.',
        '- Then `yarn build`, `npx eslint .`, `npx vitest run` and `yarn checks:gate`, all green.',
        '- The first epic: its row in `roadmaps/backlog/`, then `yarn new-epic E01`.',
        '',
      ],
    },
    {
      heading: '## What stays as it is',
      lines: [
        '',
        '- `tools/`, `guards/` (the checks), `tests/architecture/`, the configs at the root.',
        '- `docs/rules/`, `docs/skills/`, `docs/process/plans/` (the rules and the checklist), `docs/documents/`.',
        '- `app/pages/`, `app/theme/`, `app/workspace/`, `roadmaps/templates.ts`.',
        '',
      ],
    },
  ],
};

export { newProject };
