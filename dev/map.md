# Directory map

Every build repository holds these folders; its own map adds its routes, its screens and its domain.
`{name}/` stands for every folder at its level. Taken from eagle-dev by `scripts/takeDevMap.ts`.

```
{project}/
├── .claude/                        # AI knowledge base & skills
│   ├── __fixtures__/               # ticket-pipeline.md and the design side's scans, copied with their hashes
│   ├── skills/                     # Lane A's ticket pipeline, the browser tier, lane B's planning pipeline, knowledge, UX
│   │   ├── ticket/                 # _shared.md · the rules every stage reads first · generated
│   │   ├── ticket-{stage}/         # One per mode or block of lane A · generated from ticket-pipeline.md
│   │   ├── e2e/                    # _shared.md · the browser tier's rules
│   │   ├── e2e-{stage}/            # Discovery and category · one screen's flows
│   │   ├── evaluate-onboarding-ux/ # UX audit — 27 criteria, 9 human-in-the-loop gates
│   │   └── evaluate-app-ux/        # UX audit of an app screen — Nielsen, Gestalt, accessibility, 7 gates
│   ├── evaluations/                # Validation criteria for pipeline gates
│   ├── commands/                    # Claude Code slash commands
│   └── patterns/                   # The four the ticket pipeline names, until its sync moves them into docs/rules/
├── .husky/                         # Git hooks
├── app/                            # Next.js App Router
│   ├── api/                        # Backend API routes
│   │   └── {feature}/              # One folder per endpoint
│   ├── components/                 # UI components (atomic design)
│   │   ├── icons/                  # Brand marks and one-offs Lucide lacks · the rest is lucide-react
│   │   ├── atoms/                  # One primitive each, composing nothing (Button, Input, Text)
│   │   ├── molecules/              # Atoms and at most one molecule (HintButton, Field)
│   │   ├── organisms/              # Complex feature blocks (forms, lists, charts)
│   │   │   └── {Name}/            # Organism with internal structure
│   │   │       ├── components/     # {Name}SubComponent.tsx (PascalCase prefix)
│   │   │       │   └── state-views/ # {Name}{Step}View.tsx · one per step of the organism's flow
│   │   │       ├── providers/      # {Name}Provider.tsx · context scoped to this organism
│   │   │       ├── hooks/          # use{Name}Hook.ts (use + PascalCase prefix)
│   │   │       ├── services/       # get{Name}Service.ts (camelCase prefix)
│   │   │       ├── types/          # {name}Types.ts (camelCase prefix)
│   │   │       ├── constants/      # {name}Constants.ts, or {name}Words.ts for its copy
│   │   │       └── utils/          # {name}{Purpose}.ts · {name}Adapters.ts shapes answers into props
│   │   └── templates/              # Page-level layouts
│   ├── clients/                    # An entity's HTTP calls, shared by every screen that reads it
│   │   └── {entity}/               # groups/, documents/, assets/, directory/ · services/ and queries/, named by the entity
│   ├── constants/                  # Constants
│   ├── hooks/                      # Custom React hooks (use{Feature}.ts)
│   ├── providers/                  # React context providers
│   │   ├── AppProvider/            # Composite provider (nests all others)
│   │   └── AuthProvider/           # Who is asking · filled by the layout from the edge
│   ├── services/                   # One function a file ({verb}{Noun}Service.ts) · async, or its header says why not
│   ├── styles/                     # MUI theme & design tokens
│   │   ├── __fixtures__/           # The design system's tokens.css and colors_and_type.css, with their hashes
│   │   └── theme/                  # The theme's parts · token reads, palette, chips, scales, type, overrides by family
│   └── utils/                      # Utility functions ({name}{Purpose}.ts)
├── knowledge/                      # Knowledge base
│   ├── ux/                         # UX Evaluation & Onboarding domain
│   └── ai/                         # AI & Agent Design domain
├── docs/                           # Project documentation
│   └── rules/                      # Every rule, one file per concern · README.md says which a change loads
├── roadmaps/                       # Work trail · by epic, never by date
│   ├── templates/
│   └── {epic}/                     # e.g., E00/
│       ├── {ticket}/               # Lane A · e.g., T-E00-01/
│       └── {feature}/              # Lane B · E15 and work outside the specification
├── scripts/                        # CLI scripts
│   └── lib/                        # The scripts' parts · the generator's emitters, one per output; the snapshot's and readTicket's steps; typescriptHooks.ts, what lets a script import the domain's TypeScript by its aliases
├── packages/                       # Outside the framework · no yarn workspaces, plain folders
│   ├── domain/                     # The rules, the replay, the decisions · @domain/* alias
│   │   └── {concept}/              # One folder per concept · its decides, its rules, its __fixtures__
│   └── store-postgres/             # The real store · the driver the domain may not name · @store/*
├── db/
│   ├── init/                       # 001_databases.sql · the databases, created once by the container
│   └── migrations/                 # One numbered .sql file · idempotent, no ledger table
├── tests/                          # Suites that belong to no single app folder
│   ├── architecture/               # Fitness functions · the boundaries above, asserted
│   │   └── baselines/              # Each scan's offenders when it landed · they only shrink
│   ├── store-contract/             # Tier `store-contract` · one suite, run against both stores
│   ├── postgres/                   # Tier `postgres` · what only a real database can answer
│   ├── seed/                       # Tier `seed` · the seed against a store handed in
│   ├── seeded/                     # Tier `seeded` · the seed read back over HTTP
│   ├── scripts/                    # Tier `scripts` · the CLI scripts against their own database
│   ├── setup/                      # resetDatabase.ts · the one globalSetup, run once per vitest run
│   ├── types/                      # *.test-d.ts · what the compiler must refuse
│   └── helpers/                    # What two tiers or more build the same way · the roster, the cookie
├── e2e/                            # Tier `browser` · Playwright, one command against one server
│   ├── framework/                  # runCategorisedTests and the interactions every flow reuses
│   ├── testingIds/                 # The registry · every element a flow reaches, by test id
│   └── {screen}/                   # One per screen · its spec, its implementations
│       ├── testingFlows/           # {screen}FlowsCatalog.ts · the flows, before any run()
│       └── journeys/               # One flow per journey of the ticket pack
├── public/                         # Served as it is
│   └── assets/                     # The roster's avatars
└── legacy/                         # Previous implementation · reference only, never extended
```
