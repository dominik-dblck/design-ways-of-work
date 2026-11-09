/**
 * - `rules` · data: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

const rules: RuleFile = {
  title: 'Data',
  intro: "\nHow a screen reaches the server and keeps what it read: services, an entity's calls, query hooks.\nHow an answer comes back: `errors.md`.\n",
  rows: [
    { rule: "A service is one function per file, named like the file (`names.md`): in `app/services/` on the server, in `app/clients/{entity}/services/` for an entity's calls from the browser, or in an organism's `services/`.", gate: '`aServiceIsOneFunction`', exceptions: '`handleRouteService.ts`, the edge kernel, and its parts in `app/services/handleRoute/`: the answers, the specs, the doors · `createPostgresStore`, which implements a port and lives in `packages/store-postgres`', why: 'One search finds the file and the function, and every caller imports the same one.' },
    { rule: 'A service is `async` unless it waits on nothing; a sync one says why in its header (`openStoreService`, `buildRevisionService`).', gate: '`aServiceIsOneFunction`', exceptions: '—', why: 'A promise that never yields makes every caller await nothing.' },
    { rule: "An entity's calls live in `app/clients/{entity}/` (`groups`, `documents`, `assets`, `directory`), named by the entity (`deleteGroupService`, `useCommandDocumentMutation`) and imported by every screen that needs them; an organism keeps only its components, adapters and words.", gate: '`theServerIsReadThroughItsClient`', exceptions: '—', why: 'A screen is one use of the domain; the call belongs to the entity.' },
    { rule: 'A query or mutation hook lives in `app/clients/{entity}/queries/`; no component holds a `queries/` of its own.', gate: '`aComponentFolderIsStructured` · `theServerIsReadThroughItsClient`', exceptions: '—', why: 'A second hook over one entity is a second cache key that can disagree with the first.' },
    { rule: 'Every folder and document read keys under one root, `contentQueryKeys`, and a write marks stale exactly the reads it moves.', gate: '`aRefusedWriteReadsAgain` · `theAssetWritesReadNarrowly`', exceptions: '—', why: 'A write on one screen refreshes the counts, the lists and the open document on every other.' },
    { rule: 'Every query client comes from `createQueryClient()` in `app/utils/queryClientUtils.ts`, which holds the retry and the freshness; a hook states only what differs, never the retry.', gate: '`oneQueryClient`', exceptions: '—', why: 'One place decides how hard the app retries.' },
    { rule: "A command's `commandId` is minted once per press (`mintCommandId`) and kept by that press's retries; the autosave keeps it for a save it resends.", gate: '`theAutosave` · `everyDocumentCommandReplays`', exceptions: '—', why: 'The server answers a repeat with `replayed: true` instead of doing the work twice.' },
    { rule: 'A create whose id is taken tries the next one with the same draft; an upload goes out as one multipart form.', gate: '`aWriteGoesOutWhole`', exceptions: '—', why: 'A write either lands whole or is refused whole.' },
    { rule: '`app/hooks/` holds hooks over the browser and the screen (`useFileDrop`, `useScrollFade`); a hook that reads the server is a query hook in `app/clients/`.', gate: '`theServerIsReadThroughItsClient`', exceptions: '—', why: 'A hook named for the screen does not grow a second cache.' },
    { rule: '`app/utils/requestUtils.ts` (`errors.md`) takes `{ url, method, body }` and answers `{ ok: true, data } \\| { ok: false, error }`; on `unauthenticated` it sends the page to `/signin?callbackUrl=` with the path it stood on, and on `/signin` itself goes nowhere.', gate: '`requestService.test`', exceptions: '—', why: 'Every call passes through it, so a lapsed session is caught once, for every screen.' },
    { rule: "A feature service turns the transport's answer into the feature's words: a write lifts the refusal's sentence, a read a query uses throws, so the query's error state is what the screen branches on.", gate: '`review`', exceptions: '—', why: 'The person reads why; the screen branches on one state.' },
    { rule: 'A pure function that reads no environment lives in `utils/`, not `app/services/` (`requestService`, `cookieJarUtils`).', gate: '`noClientReadsTheEdge` · `review`', exceptions: '—', why: 'A client may import it, and a module mock survives where the edge and the session service import each other.' },
  ],
  outro: '',
};

export { rules };
