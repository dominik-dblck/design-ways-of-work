/**
 * - `theAppAnswers` · the app answers on its health path before a flow runs
 */
import type { Runtime } from './theRuntime.ts';

const HEALTH_TIMEOUT_MS = 10_000;

const refusalOf = (health: string, error: unknown): Error =>
  new Error(
    error instanceof Error && error.name === 'AbortError'
      ? `${health} did not answer within ${HEALTH_TIMEOUT_MS}ms · start the app before the browser tier`
      : `${health} is not reachable · start the app before the browser tier`,
    { cause: error },
  );

export const theAppAnswers = async ({
  runtime,
  healthPath,
}: {
  readonly runtime: Runtime;
  readonly healthPath: string;
}): Promise<void> => {
  const health = `${runtime.baseUrl}${healthPath}`;
  const abort = new AbortController();
  const giveUp = setTimeout(() => abort.abort(), HEALTH_TIMEOUT_MS);
  const answer = await fetch(health, {
    signal: abort.signal,
    cache: 'no-store',
  })
    .catch((error: unknown) => {
      throw refusalOf(health, error);
    })
    .finally(() => clearTimeout(giveUp));
  if (!answer.ok)
    throw new Error(
      `${health} answered ${answer.status} · start the app before the browser tier`,
    );
};
