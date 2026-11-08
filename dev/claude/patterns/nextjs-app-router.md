# Next.js App Router Guide

## Purpose

Define how the project uses App Router with clear server/client boundaries, predictable data loading, and secure route handlers.

## Core Rules

- Default to Server Components.
- Add `use client` only for browser APIs, event handlers, or client-only state.
- Keep auth/session/bootstrap reads on server side (`cookies()`, `headers()`, server utilities).
- Keep route handlers thin: validate request, call service, return typed response.

## Folder Architecture

- Keep route files (`page.tsx`, `layout.tsx`, `route.ts`) focused on orchestration and composition.
- Keep heavy UI logic in `app/components/organisms/*`.
- Keep reusable UI primitives in `app/components/atoms|molecules/*`.
- Keep data/network logic in `app/services/*` (or feature-local services).
- Keep reusable behaviors in `app/hooks/*` (or feature-local hooks).

## Auth & Route Groups

- Auth is **enforced** server-side at the edge kernel, `handle()` in
  `app/services/handleRouteService.ts` — never at provider level, and there is no `AuthGuard`:
  T-E01-01 deleted the scaffold's guard and its provider, and a UI guard protects pixels while the
  API is what answers with data.
- **There is an `AuthProvider` again from T-E01-04, and it enforces nothing.** It is
  `app/providers/AuthProvider/`, it holds `{ session, googleIsOn }` resolved at the edge by the root
  layout, and it exists so the session is read once per request instead of once per component —
  `useAuth()` is the reader. Nothing in it decides access; a client that lied to it would still be
  answered 401 by `handle()`. It is mounted **inside `AppProvider`**, which is the one provider the
  root layout mounts.
- The sign-in page is `app/signin/page.tsx`, which renders `LoginForm.tsx` (kept from the scaffold)
  and nothing more. `pages.signIn` in the auth config points at it — without that the kept component
  has no mount, because `AuthProvider` was its only one. T-E01-06 restyles the page.
- Route groups (`(feature)`) available for layout boundaries only, not auth gating.
- Root `layout.tsx` wraps everything with `AppProvider` — auth, theme, query, drawer, dialog and
  notifications, in that nesting order. Only `AuthProvider` knows who is asking, and it only carries
  the answer the server already gave. The layout resolves it by building a `Request` from
  `next/headers` and calling the same `resolveSessionService` the routes call.
- See `docs/rules/security.md` for the session, the cookie and the CSRF check.

## Component Boundary Pattern

- Server component: layout/page-level orchestration, secure bootstrap data.
- Client component: interactive UI, form state, query hooks, optimistic UX.
- Never pass secrets from server to client props.

## Data Loading Pattern

- Resolve independent async server operations in parallel with `Promise.all`.
- Fetch auth-dependent data only after auth context is known.
- Fail closed for missing/invalid auth context.

## Route Handlers

- Use `route.ts` (thin re-export) + `{action}Route.ts` (handler logic) pattern.
- Validate auth context from cookies before backend calls — through `handle()`, never by reading
  `cookies()` in the route.
- Return normalized error responses with safe messages.
- Never leak internal tokens, raw backend errors, or secret headers.

## Caching and Revalidation

- Prefer explicit caching behavior over defaults.
- For user/session-sensitive data, avoid static leakage across users.
- Revalidate only where business freshness requires it.
