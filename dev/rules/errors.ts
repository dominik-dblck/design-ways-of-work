/**
 * - `rules` · errors: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

const rules: RuleFile = {
  title: 'Errors',
  intro: '\nA refusal is an answer, not an exception: it travels as a value and the caller branches on it.\n',
  rows: [
    { rule: 'Every answer is `{ ok: true, … }` or `{ ok: false, kind, … }`, `kind` one of `REFUSAL_KINDS`, each with one status at the edge (`rule` 409, `unauthenticated` 401, `cross-site` and `forbidden` 403, `missing` 404, `malformed` 400, `error` 500).', gate: '`tsc` (`satisfies Record<RefusalKind, number>`) · `everyDocumentEndpoint`', exceptions: '—', why: 'The caller branches on a closed set and a status nobody has to look up.' },
    { rule: 'A domain refusal carries its rule key, one sentence for a person, what it fired on, the current stream version, and what would make the call pass (`fix`, `null` when nothing recovers); the sentence is read from `packages/domain/refusals/refusalCatalog.ts`, never copied.', gate: '`refusals.test` · `theWordsFollowTheGlossary`', exceptions: '—', why: 'The person reads why, and the caller knows what to send next.' },
    { rule: 'The browser calls the server through `app/utils/requestUtils.ts` alone; it never throws for an HTTP answer, and a refusal comes back as a value.', gate: '`oneFetch` (one caller) · `review` (never throws)', exceptions: '—', why: 'One door, so a lost answer and a refusal are handled the same way everywhere.' },
    { rule: "An unexpected throw at the edge answers 500 `{ ok: false, kind: 'error', id }`: the detail is logged on the server under the `id`, nothing internal goes on the wire, and no session is renewed.", gate: '`theSessionLifetime` (renews nothing) · `review` (nothing internal on the wire)', exceptions: '—', why: 'A stack trace on the wire is a map of the server.' },
    { rule: "A render that throws reads one line and Retry: `app/error.tsx` inside the app's theme, `app/global-error.tsx` in a document of its own when the layout itself threw.", gate: '`theErrorBoundaries`', exceptions: '—', why: 'Retry asks the segment again instead of redrawing what failed.' },
    { rule: 'A read that fails shows its line and a Retry that asks again; the screen never goes blank.', gate: '`everyPathIsWalked` (the lost answer)', exceptions: '—', why: 'A blank screen tells nobody what happened or what to do.' },
    { rule: 'A promise is awaited, returned, or handed to `void` where nothing waits on it; none floats.', gate: 'ESLint `no-floating-promises`', exceptions: '—', why: "A floating promise's rejection reaches no boundary and no log." },
  ],
  outro: '',
};

export { rules };
