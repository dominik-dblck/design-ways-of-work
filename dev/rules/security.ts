/**
 * - `rules` · security: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

const rules: RuleFile = {
  title: 'Security',
  intro: '\nThe browser is untrusted: the server decides who is asking and what they may do, at one door.\n',
  rows: [
    { rule: 'Every route under `app/api` answers through `handle()` in `app/services/handleRouteService.ts`, which resolves the session first; there is no guard component and no client session (`useSession`, `SessionProvider`).', gate: '`everyHandlerCallsHandle` · `theEdgeIsTheOnlyDoor` · `nextAuthStaysAtTheEdge`', exceptions: 'the Auth.js route and the health check', why: 'A guard in the UI protects pixels; the door protects the data.' },
    { rule: "The actor is the edge's: no route reads `by`, `actor` or `userId` off a request.", gate: '`theEdgeOwnsTheActor`', exceptions: '—', why: 'Whoever the body says they are is whoever wrote the body.' },
    { rule: 'The cookie carries the roster id and nothing that decides access; role, name and languages are read from the directory on every request. A claim is added to both minting sites, the `jwt` callback and `renewedSessionCookie`, or to neither.', gate: '`theCookieIsTheSession`', exceptions: '`picture`, the one fact the roster cannot answer', why: 'A change of role takes effect on the next request, not the next sign-in.' },
    { rule: 'No cookie, another secret, an expired one, a person the roster no longer holds: one 401 `unauthenticated`, the same answer for all four.', gate: '`theCookieIsTheSession` · `theSessionLifetime`', exceptions: '—', why: 'Nothing on the wire says whether a session exists.' },
    { rule: 'A session lives 8 hours rolling and 7 days at most; it is renewed past the half-life, on an answer that resolved a session, and a refusal or a 500 renews nothing.', gate: '`theSessionLifetime`', exceptions: '—', why: 'A refusal must not extend what it refused.' },
    { rule: "The cookie's attributes (`HttpOnly`, `Secure` in production, `SameSite=Lax`) are declared once, in `readSessionCookieService`, and spelled once, in `serialiseCookieService`.", gate: '`oneCookieSerialiser` · `theCookieIsSerialisedOnce`', exceptions: '—', why: 'Flags written twice drift apart.' },
    { rule: "A write (`POST`, `PUT`, `PATCH`, `DELETE`) is same-origin or answered 403 `cross-site`: `Sec-Fetch-Site: same-origin`, or an `Origin` equal to `AUTH_URL`'s; checked in `handle()` after the session and before the actor, under the stub too. `GET` is never checked.", gate: '`theCookieIsTheSession` · `personaRoute.switchOff`', exceptions: '—', why: "The browser's own headers refuse a forgery without a client to mint a token; a browser client or a cross-origin partner brings the token back." },
    { rule: "A forged write's 403 is `cross-site`, never the role's `forbidden`.", gate: '`theCookieIsTheSession`', exceptions: '—', why: 'A caller told "your role may not" goes and fixes the wrong thing.' },
    { rule: "The app refuses to start misconfigured: production without SSO, a missing `SSO_DOMAIN`, `AUTH_SECRET` or `AUTH_URL`, an empty `AUTH_GOOGLE_ID`, and in production a secret under 32 characters or an `AUTH_URL` that is not `https`, each throwing with the variable's name.", gate: '`resolveSessionService`', exceptions: '—', why: 'The alternative is a 401 nobody can explain.' },
    { rule: "Secrets stay on the server: `AUTH_*` is read in two files, no `'use client'` file imports `app/services/`, `DATABASE_ADMIN_URL` is named under neither `app/` nor `packages/`, and no token reaches a payload, a log or browser storage.", gate: '`ssoCredentialsStayPut` · `noClientReadsTheEdge` · `theAdminLoginStaysOut` · `review` (payloads, logs, storage)', exceptions: '—', why: 'Whatever reaches the browser, its owner can read.' },
    { rule: 'Signing in writes nothing: no event, no command, no record.', gate: '`theLoginWritesNothing`', exceptions: '—', why: "Who may enter is the directory's answer, not the log's." },
  ],
  outro: '',
};

export { rules };
