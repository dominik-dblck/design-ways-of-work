/**
 * - each rule the sonar config turns off is one the installed plugin turns on
 */
import { configs } from 'eslint-plugin-sonarjs';
import { describe, expect, it } from 'vitest';
import { SONAR, SONAR_IN_TESTS } from '../../shared/lint/sonarRules.ts';

const RECOMMENDED = new Set(Object.keys(configs.recommended.rules ?? {}));

// a config's rules the plugin's set no longer holds: a rename or a removal left dead text
const staleIn = (rules: Readonly<Record<string, unknown>>): readonly string[] =>
  Object.keys(rules).filter((rule) => !RECOMMENDED.has(rule));

describe('the sonar tables', () => {
  it('a rule the plugin no longer holds is found', () => {
    expect(
      staleIn({
        'sonarjs/no-such-rule': 'planted',
        'sonarjs/todo-tag': 'held',
      }),
    ).toEqual(['sonarjs/no-such-rule']);
  });

  it('turn off only rules the plugin turns on', () => {
    expect([...staleIn(SONAR.rules ?? {}), ...staleIn(SONAR_IN_TESTS)]).toEqual(
      [],
    );
  });
});
