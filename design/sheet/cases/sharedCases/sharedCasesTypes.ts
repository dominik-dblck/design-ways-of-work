/**
 * - `SharedCase` · one rule many endpoints share: the rows it reaches, its answer
 * - `CaseEndpoint`, `Applies` · a row as a shared case reads it, and the question
 */
interface SharedCase {
  // the slug in a test case's id, Endpoint.shared.{id}: a name, never a position
  readonly id: string;
  // shown: they do it and see the answer · guarded: the UI never sends it · api: a caller alone
  readonly reach: 'shown' | 'guarded' | 'api';
  readonly to: 'every' | 'command' | 'query';
  // text the row's route must hold
  readonly route?: string;
  // a body with fields, a body of —, a body carrying commandId
  readonly body?: 'some' | 'none' | 'commandId';
  readonly params?: boolean;
  readonly param?: string;
  // a field of this type, in the body or a param
  readonly of?: string;
  // the command's actor leaves some role out
  readonly actor?: 'limited';
  // a regex source: skipped when one of the row's own cases already says it
  readonly unless?: string;
  readonly when: string;
  readonly then: string;
  readonly source: string;
}

interface CaseEndpoint {
  readonly body?: string;
  readonly route?: string;
  readonly params?: readonly (readonly string[])[];
  readonly actor?: readonly string[];
}

interface Applies {
  readonly sharedCase: SharedCase;
  readonly endpoint: CaseEndpoint;
  readonly isCommand: boolean;
  readonly whens?: readonly string[];
}

export type { Applies, SharedCase };
