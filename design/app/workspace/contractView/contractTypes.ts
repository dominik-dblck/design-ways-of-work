/**
 * - `CodeToken`, `CodeLine`, `TokenKind` · a piece of code, coloured by what it is
 * - `EndpointCode`, `EndpointState`, `BodyField` · an endpoint as code, how typed
 */
type TokenKind = 'com' | 'kw' | 'type' | 'str' | 'num' | 'txt' | 'warn';

interface CodeToken {
  readonly text: string;
  readonly kind: TokenKind;
  readonly strong: boolean;
  readonly draft: boolean;
}

type CodeLine = readonly CodeToken[];

// typed: the sheet types every field · draft: one drafts from the model · todo: one is not typed
type EndpointState = 'typed' | 'draft' | 'todo';

type BodyField = readonly [name: string, type: string];

interface EndpointCode {
  readonly anchor: string;
  readonly ticket: string;
  readonly title: string;
  readonly epic: string;
  readonly kind: 'command' | 'query' | 'port';
  readonly state: EndpointState;
  readonly lines: readonly CodeLine[];
}

export type {
  CodeLine,
  CodeToken,
  EndpointCode,
  EndpointState,
  BodyField,
  TokenKind,
};
