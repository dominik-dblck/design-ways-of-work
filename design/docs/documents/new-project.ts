/**
 * - `newProject` · new-project.md as data: spawn, fill, name it, the first epic
 */
import type { DocumentFile } from './documentTypes.ts';

const newProject: DocumentFile = {
  path: 'docs/process/new-project.md',
  sections: [
    {
      heading: '# A new design project',
      lines: [
        '',
        'A design project starts as the way of working’s sample, written by one command: the homes are taken',
        'at a tag and never edited; the project’s own files hold its names and its rows alone.',
        '',
      ],
    },
    {
      heading: '## 1 · Spawn',
      lines: [
        '',
        '- In `design-ways-of-work`: `yarn spawn design <path> <Product> --company <Company>`.',
        '- It writes the sample at the tag of the version in hand, the product’s names filled in',
        '  (`sheet/project.ts`, `CLAUDE.md`, `package.json` · `name`), and pins `design-ways-of-work` to that tag.',
        '- Then `git init`, the install (its `postinstall` takes the homes, its `prepare` wires the git hooks),',
        '  the generated files, a first commit through the hooks, and the feature tier, all green.',
        '- `wow.takes` names `design`, `shared` and `design-system`: `dev/`, the build side’s tree, waits for',
        '  the build side’s port. The pipeline names the review agents that side holds (`architecture-review`, `types-eval`).',
        '',
      ],
    },
    {
      heading: '## 2 · Fill: the product’s names and rules',
      lines: [
        '',
        '- `sheet/project.ts` · the build side, both sessions, the build repository, its branch and top paths,',
        '  the tools its people know: the spawn writes them from the product’s name, the PM sets them.',
        '- `sheet/rules.ts` · the product’s own rules, written as the product is decided: domain, product,',
        '  experience, architecture, quality.',
        '- `scope.ts` · `backup` names the remote once the repository has one; `browser`, a page of its own',
        '  once it runs one.',
        '- `app/styles/productTokens.ts` · the tokens the product alone holds: the design system is taken, never copied.',
        '',
      ],
    },
    {
      heading: '## 3 · Name it to the way of working',
      lines: [
        '',
        '- Its row in `ports/consumers.ts` of `design-ways-of-work`: the gate then tries every later release on it.',
        '- A later tag is taken by moving the pin and installing; the release’s row says what it asks beside.',
        '',
      ],
    },
    {
      heading: '## 4 · The first epic',
      lines: [
        '',
        '- Refined with the PM (`/design-refine`), then its row in `roadmaps/backlog/` and `yarn new-epic E01`.',
        '',
      ],
    },
    {
      heading: '## What it never holds',
      lines: [
        '',
        '- A home’s file edited: the take writes the homes at each install, hidden from git, and stops on one',
        '  it finds edited.',
        '- A copy of another product: its rows, its decisions and its epics stay in that product.',
        '',
      ],
    },
  ],
};

export { newProject };
