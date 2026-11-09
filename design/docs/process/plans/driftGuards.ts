/**
 * - `GUARDS` · the guards against the specification disagreeing with itself
 * - `DECISIONS` · decided points, each keyed, with the phrases to grep when it moves
 * - a decision with a key never drifted, one named by a sentence did
 */
import type { Guard, DriftDecision } from './plansTypes.ts';

// drift happened only where nothing could check, and where a check existed it did not happen once
export const GUARDS: readonly Guard[] = [
  {
    id: 'seams',
    title: 'Name the generator seams',
    prevents: 'one edit changing many outputs with nothing saying so',
    does: 'a comment at each place where a single line propagates, naming what it reaches and how many',
    where: 'tickets.js · fromCommand and contextOf · refusals.js · line() · gate-rules.js · WHY and block-rules.js · WHY (17 sentences copied into the repository at T-E00-10) · plans.js · RULES',
    evidence: ['fromCommand appended “a stale stream version gets 409” to every command ticket · one line, roughly fifty tickets asserting something the concurrency decision had already retired', 'plans.js RULES is copied into agent-instructions.md by hand · both held the same retired rule and both had to be found'],
    cost: 'minutes · comments only',
    risk: 'none · a comment does not execute',
    when: 'first, and it does not touch a criterion',
  },
  {
    id: 'counts',
    title: 'No stated number where an array can be counted',
    prevents: 'prose drifting from the list it describes',
    does: 'derive the number at read time, and where it must stay prose, assert it against the derived value',
    where: 'gate-rules.js · refusals.js · db-schema.js · data-map.json · the rules pages',
    evidence: ['three tables where TABLES held four', 'eighteen refusals in four places where coverage().quoted was seventeen', 'eight approver rules where approverRules() answers nine', 'sixteen content-manager states, correct about the literals and wrong about the array · two more are pushed on below, and the prose was believed over the count', 'docs/repo-structure.md · “Six vitest projects” above a table of seven, eleven lines apart · the seventh came in with T-E00-07, survived its review, and was found at T-E00-08 because the file was open for something else · the first entry from the repository side, and the table it contradicts is itself countable'],
    cost: 'scoped to counts that move · leave 43 event keys and seven gates as prose, they are stable and load-bearing as facts · the tier count moved twice in four tickets, so it is not one of the stable ones',
    risk: 'a hole that resolves to nothing leaves a gap mid-sentence, and a number-word table runs out · both happened while closing two of these by hand',
    when: 'after T-E00-02 · built at T-E00-09, criterion 9 · the repository side first: tests/architecture/statedCounts.test.ts asserts every stated project count in docs/ against vitest.config.mts — project, not tier: three tiers and seven projects are both true, which is why the word matters',
  },
  {
    id: 'phrases',
    title: 'A decision carries the phrases that name it',
    prevents: 'a decision landing in four files and living on in four more',
    does: 'beside each decision, the phrases its repetitions are written in — so the sweep after a change is a grep rather than a memory',
    where: 'db-schema.js · CONSEQUENCES is the pattern · extend it to the decisions that have none',
    evidence: ['Duplicate left the row menu and stayed in six spec files and two annotations', 'the stream version left the request body and stayed in eight places', 'db-schema.js CONSEQUENCES named three files it changed and not glossary · both stale glossary entries were found weeks later, by asking', 'the refusal keys drifted nowhere · approval.version_moved is one unique greppable string, while “the stream version” lives in eight paraphrases and grep has nothing to look for'],
    cost: 'setup is small · the discipline is permanent',
    risk: 'the worst of the three · a list written from memory is prose about prose, and a stale one is worse than none because the sweep stops at it. Phrases, not file lists, and no new file — it belongs beside the decision it serves.',
    when: 'after T-E00-02, and only in the minimal form',
  },
];

// open: an admin role over the whole app is in no ROLES, actor list or gate until the rights matrix
export const DECISIONS: readonly DriftDecision[] = [
  {
    id: 'concurrency',
    decided: 'the server works out the stream version · only a command that states what it read can be refused for having read something old',
    phrases: ['stream version', 'stale command', 'stale stream', '409', 'carries the log length', 'travels both ways', 'version_moved', 'source_moved', 'read from the body'],
    where: 'glossary · Stream version · T-E00-06 · commands.js · contract and queries.js · contract',
  },
  {
    id: 'no-projection',
    decided: 'no stored projection · the campaigns list is read across the document state rows and every count is derived',
    phrases: ['projection', 'stored counter', 'campaigns list', 'ListFolders', 'materialised'],
    where: 'db-schema.js · CONSEQUENCES · glossary · Projection',
  },
  {
    id: 'copy-not-duplicate',
    decided: 'no Duplicate action · a document is created blank or as a copy of an existing one, and the copy carries blocks and English only',
    phrases: ['duplicate', 'duplicated', 'template', 'origin', '(copy)'],
    where: 'commands.js · CreateDocument · backlog.js · E03',
  },
  {
    id: 'store-shape',
    decided: 'nine store operations · reading a set is its own operation on both sides, and a stream id is opaque',
    phrases: ['four operations', 'seven operations', 'store interface', 'by prefix', 'campaign/slug', 'stands on whatever the log already holds', 'max(seq)', 'computes its own seq'],
    where: 'glossary · Store · T-E00-02',
  },
  {
    id: 'refusal-shape',
    decided: 'a rule’s refusal is one envelope · { ok: false, kind: ’rule’, key, line, firedOn, streamVersion, fix } · one line per key, filled by one function · the validator’s and the store’s shapes stay bare and apart',
    phrases: ['key, sentence', 'RuleRefused', 'one envelope', 'two sentences under one key', 'sometimes two sentences', 'puts the two refusals in one envelope'],
    where: 'T-E00-10 · refusals.js · glossary · Refusal · plans.js · RULES three shapes',
  },
];
