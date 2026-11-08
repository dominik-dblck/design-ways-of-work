/**
 * - `ideas` · each idea before it is an epic: its line, and the groups it opens to
 */
import { all as IDEAS } from '../../../roadmaps/ideas.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { IdeaCard, Section } from './boardTypes.ts';

type Idea = (typeof IDEAS)[number];
type Card = NonNullable<Idea['map']>['document'];

const cardLine = (card: Card): string =>
  [`${card.kind} · ${card.name}`, card.what, card.why]
    .filter(Boolean)
    .join(' — ');

// what the agent reads, and who hears when a reference moves; none when the idea draws neither
function mapsOf(idea: Idea): readonly Section[] {
  const { idea: words } = BOARD_WORDS;
  const { map, fresh } = idea;
  return [
    ...(map
      ? [
          {
            label: words.reads,
            lines: [
              cardLine(map.document),
              ...map.refs.map(cardLine),
              `${words.together} · ${map.context}`,
            ],
          },
        ]
      : []),
    ...(fresh
      ? [
          {
            label: words.changes,
            lines: [
              cardLine(fresh.moved),
              ...fresh.told.map(
                (card) => `${words.usedBy} · ${cardLine(card)}`,
              ),
              ...fresh.notTold.map(
                (card) => `${words.notTold} · ${cardLine(card)}`,
              ),
            ],
          },
        ]
      : []),
  ];
}

function sectionsOf(idea: Idea): readonly Section[] {
  const { idea: words } = BOARD_WORDS;
  const pairs = (example: Idea['example']): readonly string[] =>
    example.map(([one, other]) => `${one} — ${other}`);
  return [
    { label: words.points, lines: idea.points },
    { label: words.example, lines: pairs(idea.example) },
    ...mapsOf(idea),
    { label: words.connects, lines: pairs(idea.connects) },
    { label: words.questions, lines: idea.questions },
  ];
}

const ideas = (): readonly IdeaCard[] =>
  IDEAS.map((idea) => ({
    id: idea.id,
    title: idea.title,
    status: idea.status,
    raised: idea.raised,
    line: idea.line,
    sections: sectionsOf(idea),
  }));

export { ideas };
