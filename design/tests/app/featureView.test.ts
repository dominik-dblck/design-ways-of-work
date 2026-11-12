/**
 * - `app/workspace/featureView.ts`: one epic read whole, from the sheet lent to the page
 */
import { describe, expect, it } from 'vitest';
import { journeysOfEpic } from '../../sheet/cases/journeys.ts';
import { all as COMMANDS } from '../../sheet/contract/commands.ts';
import {
  featureOf,
  features,
  firstEpic,
} from '../../app/workspace/featureView.ts';
import { piecesOf } from '../../app/workspace/contractView/codeTokens.ts';
import { productView } from '../../productView.ts';
import type { ProductView } from '../../tools/productTypes.ts';

describe('the Feature view', () => {
  it('has a tab per feature ticket and opens on the first one not done', () => {
    const tabs = features();
    expect(tabs.length).toBeGreaterThan(0);
    expect(tabs.map((tab) => tab.epic)).toContain(firstEpic());
  });

  it('reads every journey of the epic, each step’s words filled in', () => {
    const view = featureOf('E06');
    expect(view.journeys.length).toBe(journeysOfEpic('E06').length);
    const text = view.journeys
      .flatMap((one) => one.steps.map((step) => step.does))
      .join(' ');
    expect(text).not.toMatch(/\{say:|\{refusal:/);
  });

  it('covers every test case a person meets on a closed epic', () => {
    const cover = featureOf('E06').cover;
    expect(cover?.cases.ok).toBe(true);
    expect(cover?.cases.share).toBe(100);
  });

  it('writes each of the epic’s commands as code, its route a line of its own', () => {
    const view = featureOf('E06');
    const mine = COMMANDS.filter((one) => one.epic === 'E06');
    for (const command of mine) {
      const endpoint = view.endpoints.find((one) => one.anchor === command.id);
      expect(
        endpoint?.lines.map((line) => line.map((piece) => piece.text).join('')),
      ).toContain(command.route);
    }
  });

  it('cuts a line of code into the pieces it was made of', () => {
    const line = "  | Refused<'document.sent'>";
    expect(
      piecesOf(line)
        .map((piece) => piece.text)
        .join(''),
    ).toBe(line);
    expect(piecesOf(line).find((piece) => piece.kind === 'str')?.text).toBe(
      "'document.sent'",
    );
  });

  it('reads a feature’s standing at each refine step, and none for an epic not refined', () => {
    const steps = featureOf('E03').steps;
    expect(steps.map((one) => one.step)).toEqual([
      'Contract',
      'Test cases',
      'Wireframe walk',
      'Journeys',
      'Spec rows',
      'Feature ticket',
      'The build-side run',
    ]);
    expect(steps[0]?.standing).toBe('done 24 Sep');
    expect(featureOf('E07').steps).toEqual([]);
  });

  it('names its combinations, or the states without them', () => {
    expect(featureOf('E09').combinations.map((one) => one.file)).toEqual([
      'roleCombinations.js',
    ]);
    const approvals = featureOf('E06', productView);
    expect(approvals.combinations).toEqual([]);
    expect(approvals.statesNamed).toBeGreaterThan(0);
    expect(featureOf('E06').statesNamed).toBe(0);
  });

  it('draws the fields the product hands in, on their epic alone', () => {
    const plugs: ProductView = {
      fieldsOf: (epic) =>
        epic === 'E06'
          ? {
              kinds: [],
              options: [{ name: 'localized', ts: 'boolean', means: 'one' }],
              code: 'type Field = {\n  name: string;\n};',
              docTypes: [],
            }
          : undefined,
    };
    const blocks = featureOf('E06', plugs);
    expect(blocks.fieldOptions.map((one) => one.name)).toContain('localized');
    const code = blocks.fieldsCode.map((line) =>
      line.map((piece) => piece.text).join(''),
    );
    expect(code).toEqual(['type Field = {', '  name: string;', '};']);
    expect(featureOf('E09', plugs).fieldsCode).toEqual([]);
    expect(featureOf('E06').fieldOptions).toEqual([]);
  });
});
