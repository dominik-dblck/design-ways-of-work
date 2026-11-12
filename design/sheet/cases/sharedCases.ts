/**
 * - `all`, `byId` · what every endpoint of a kind answers, whatever its row says
 * - `applies` · whether a shared case reaches a row: its kind, route, body, actor
 */
import { ROLES_ALL, SHARED_CASES } from './sharedCases/sharedCaseRows.ts';
import type { Applies, SharedCase } from './sharedCases/sharedCasesTypes.ts';

const BODY: Readonly<Record<string, (body: string) => boolean>> = {
  none: (body) => body === '—',
  some: (body) => body !== '' && body !== '—',
  commandId: (body) => body.includes('commandId'),
};

function paramsOf({ endpoint }: Applies): readonly string[] {
  return (endpoint.params ?? []).map((param) => param[0] ?? '');
}

// each rule a shared case may set, true when the row passes it
const RULES: readonly ((input: Applies) => boolean)[] = [
  ({ sharedCase, isCommand }) =>
    !(sharedCase.to === 'command' && !isCommand) &&
    !(sharedCase.to === 'query' && isCommand),
  ({ sharedCase, endpoint }) =>
    !sharedCase.route || (endpoint.route ?? '').includes(sharedCase.route),
  ({ sharedCase, endpoint }) =>
    !sharedCase.body || (BODY[sharedCase.body]?.(endpoint.body ?? '') ?? true),
  (input) => !input.sharedCase.params || paramsOf(input).length > 0,
  (input) =>
    !input.sharedCase.param || paramsOf(input).includes(input.sharedCase.param),
  ({ sharedCase, endpoint }) =>
    !sharedCase.of ||
    (endpoint.body ?? '').includes(`: ${sharedCase.of}`) ||
    (endpoint.params ?? []).some((param) =>
      String(param[1] ?? '').includes(`: ${sharedCase.of}`),
    ),
  ({ sharedCase, endpoint }) =>
    sharedCase.actor !== 'limited' || (endpoint.actor ?? []).length < ROLES_ALL,
  ({ sharedCase, whens }) =>
    !sharedCase.unless ||
    !(whens ?? []).some((when) =>
      new RegExp(sharedCase.unless ?? '').test(when),
    ),
];

function applies(input: Applies): boolean {
  return RULES.every((rule) => rule(input));
}

const BY_ID: Readonly<Record<string, SharedCase | undefined>> =
  Object.fromEntries(
    SHARED_CASES.map((sharedCase) => [sharedCase.id, sharedCase]),
  );

const twice = SHARED_CASES.find(
  (one, at) => SHARED_CASES.findIndex((other) => other.id === one.id) !== at,
);
if (twice) throw new Error(`sharedCases.ts · duplicate id ${twice.id}`);

export { SHARED_CASES as all, BY_ID as byId, applies };
