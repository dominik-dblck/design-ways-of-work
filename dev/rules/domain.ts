/**
 * - `rules` · domain: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Domain',
  intro: '\n`packages/domain` holds the rules, the log and the replay; everything else hands it what it needs\nand reads what it answers. The principles are `CLAUDE.md` → How the work goes; these rows are the\nboundaries the scans hold.\n',
  rows: [
    { rule: '`packages/domain` imports no framework, no driver, no built-in and nothing outside itself that its `allowed` list does not name; it reaches for no request, session, header, environment or `pg`.', gate: '`domainBoundary` · `theDomainNamesNoDatabase`', exceptions: '—', why: 'The rules run anywhere and are proved without a server.' },
    { rule: 'The store and the directory reach the domain as arguments: each is opened or built once, at the edge.', gate: '`storeHandedIn` · `directoryHandedIn`', exceptions: '—', why: 'The rules name a port, never a database.' },
    { rule: 'The store port is twelve operations and imports nothing from the model or the log.', gate: '`adapterIsOpaque`', exceptions: '—', why: 'An implementation knows rows, not rules.' },
    { rule: 'The log is appended through one door, `runCommand`, and by the seed; there is no third caller.', gate: '`oneDoor`', exceptions: '—', why: 'Every change is an event that passed the rules.' },
    { rule: 'A stream belongs to one document.', gate: '`oneLogOneDocument`', exceptions: '—', why: 'A document\'s history is read in one place.' },
    { rule: 'A refusal is one of three `ok: false` shapes, and nothing builds a fourth.', gate: '`theThreeShapes`', exceptions: '—', why: 'Every caller branches on a closed set.' },
    { rule: 'A command arrives as a decide, never declared under a name of its own; a derived event is built only by the decide that produces it, and no command lists one in its emits.', gate: '`noCommandsYet` · `aDerivedEventHasNoCommand`', exceptions: '—', why: 'An event is produced in one place, so its meaning cannot split.' },
    { rule: 'Nothing reads `owner` off a block, a spec or a catalog.', gate: '`nothingReadsAnOwner`', exceptions: '—', why: 'Who may act is the rules\' answer, not a field on the data.' },
    { rule: 'The approving role is Product; no file names a CEO.', gate: '`theApprovalIsProduct`', exceptions: '—', why: 'A renamed word is gone everywhere, or it comes back.' },
    { rule: 'The log is called tamper-evident and nothing stronger: the chain shows that nothing changed after it was written.', gate: '`nothingClaimsTamperProof`', exceptions: '—', why: 'Append-only in code is not protected storage, and a promise the system cannot keep misleads.' },
    { rule: 'The specification is read where it sits, in the design project; a spec file a test needs is a fixture copied byte for byte with its hash, and there is no `spec/` folder.', gate: '`noSpecFolder` · `everyFixtureRootIsHeld` · `theSpecHoldsTogether` · `theComponentSpecIsTheDesignSide`', exceptions: '—', why: 'A second copy of the spec is the one that drifts.' },
  ],
  outro: '',
};

export { rules };
