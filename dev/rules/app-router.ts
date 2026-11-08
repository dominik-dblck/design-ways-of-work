/**
 * - `rules` · app router: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'App Router',
  intro: '\nPages and endpoints under `app/`: a page composes, an endpoint maps a verb to a handler, and the\nhandler asks the domain. Server and client components and the rest of App Router:\n`.claude/patterns/nextjs-app-router.md`, until the pipeline\'s sync brings it here.\n',
  rows: [
    { rule: 'An endpoint folder under `app/api/` holds `route.ts`, which maps each HTTP verb to a handler and does nothing else (`export const GET = getGroupsRoute;`), and one `{action}Route.ts` per verb.', gate: '`routeFilesOnlyMap`', exceptions: 'a segment\'s config export (`dynamic` in `app/api/health/route.ts`)', why: '`route.ts` is read to see which verbs an endpoint has; the logic sits where a test can reach it.' },
    { rule: 'A handler answers through `handle()` with a query or a command: it opens no port, writes nothing, takes no lock, and counts, filters or sorts nothing the domain hands it.', gate: '`everyHandlerCallsHandle` · `noRouteOpensAPort` · `theRouteWritesNothing` · `theRouteCountsNothing`', exceptions: 'the Auth.js route and the health check', why: 'The domain decides, so every caller gets the same answer.' },
    { rule: 'A page reads its address (`[id]`) through `routeAddressOf`, the one place it becomes a brand.', gate: '`brandsCrossOnce`', exceptions: '—', why: 'The parse is the check, so it happens once.' },
    { rule: 'The root layout\'s body is `AppProvider` around the page; the layout resolves the session through the same `resolveSessionService` the routes call.', gate: '`theLayoutHoldsTheProviders`', exceptions: '—', why: 'The page and the API see the same person.' },
    { rule: 'A signed-out visitor sees `SignedOutGate`\'s card in place of the page; `app/signin/page.tsx` renders `SignedOutScreen`, and Auth.js\'s `pages.signIn` and `pages.error` send a caller there. Nothing on the client guards a page.', gate: '`everyPathIsWalked` (signed out)', exceptions: '—', why: 'A page that hides itself protects pixels; the API protects the data.' },
    { rule: 'Pages live flat under `app/` (`app/[channel]/[kind]/page.tsx`); a route group bounds a layout, never auth.', gate: '`theMapIsTheTree` · `review`', exceptions: '—', why: 'Who may see what is the edge\'s answer (`security.md`), not a folder\'s.' },
    { rule: 'Independent reads on the server run together, in one `Promise.all`.', gate: '`review`', exceptions: '—', why: 'Waits in a row add up; waits side by side take the longest one.' },
  ],
  outro: '',
};

export { rules };
