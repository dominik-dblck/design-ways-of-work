/**
 * - `app/workspace/featureView.ts`: one epic read whole, from the sheet lent to the page
 * - each case reads every feature of the product, none named, its registries the truth
 */
import { describe, expect, it } from 'vitest';
import { combinations } from '../../docs/process/projectPlan.ts';
import { refineSteps } from '../../docs/process/plans.ts';
import { journeysOfEpic } from '../../sheet/cases/journeys.ts';
import { all as COMMANDS } from '../../sheet/contract/commands.ts';
import {
  featureOf,
  features,
  firstEpic,
} from '../../app/workspace/featureView.ts';
import { piecesOf } from '../../app/workspace/contractView/codeTokens.ts';
import type { ProductView } from '../../tools/productTypes.ts';

const EPICS = features().map((tab) => tab.epic);
const [ONE = '', OTHER = ''] = EPICS;

const journeyed = EPICS.filter((epic) => journeysOfEpic(epic).length > 0);

const filesOf = (epic: string): readonly string[] =>
  combinations.filter((one) => one.epic === epic).map((one) => one.file);

describe('the Feature view', () => {
  it('has a tab per feature ticket and opens on the first one not done', () => {
    expect(EPICS.length).toBeGreaterThan(0);
    expect(EPICS).toContain(firstEpic());
  });

  it('reads every journey of an epic, each step’s words filled in', () => {
    for (const epic of journeyed) {
      const view = featureOf(epic);
      expect(view.journeys.length).toBe(journeysOfEpic(epic).length);
      const text = view.journeys
        .flatMap((one) => one.steps.map((step) => step.does))
        .join(' ');
      expect(text).not.toMatch(/\{say:|\{refusal:/);
    }
  });

  it('covers every test case a person meets on a closed epic', () => {
    const closed = journeyed.filter(
      (epic) => featureOf(epic).status === 'done',
    );
    for (const epic of closed) {
      const cover = featureOf(epic).cover;
      expect(cover?.cases.ok).toBe(true);
      expect(cover?.cases.share).toBe(100);
    }
  });

  it('writes each of an epic’s commands as code, its route a line of its own', () => {
    for (const epic of EPICS) {
      const view = featureOf(epic);
      for (const command of COMMANDS.filter((one) => one.epic === epic)) {
        const endpoint = view.endpoints.find(
          (one) => one.anchor === command.id,
        );
        expect(
          endpoint?.lines.map((line) =>
            line.map((piece) => piece.text).join(''),
          ),
        ).toContain(command.route);
      }
    }
  });

  it('cuts a line of code into the pieces it was made of', () => {
    const line = "  | Refused<'record.sent'>";
    expect(
      piecesOf(line)
        .map((piece) => piece.text)
        .join(''),
    ).toBe(line);
    expect(piecesOf(line).find((piece) => piece.kind === 'str')?.text).toBe(
      "'record.sent'",
    );
  });

  it('reads a feature’s standing at each refine step, or none for an epic not refined', () => {
    for (const epic of EPICS)
      expect([[], refineSteps]).toContainEqual(
        featureOf(epic).steps.map((one) => one.step),
      );
  });

  it('names its combinations, and counts the states the product hands in', () => {
    for (const epic of EPICS)
      expect(featureOf(epic).combinations.map((one) => one.file)).toEqual(
        filesOf(epic),
      );
    expect(featureOf(ONE, { statesOf: () => 3 }).statesNamed).toBe(3);
    expect(featureOf(ONE).statesNamed).toBe(0);
  });

  it('draws the fields the product hands in, on their epic alone', () => {
    const plugs: ProductView = {
      fieldsOf: (epic) =>
        epic === ONE
          ? {
              kinds: [],
              options: [{ name: 'localized', ts: 'boolean', means: 'one' }],
              code: 'type Field = {\n  name: string;\n};',
              docTypes: [],
            }
          : undefined,
    };
    const blocks = featureOf(ONE, plugs);
    expect(blocks.fieldOptions.map((one) => one.name)).toContain('localized');
    const code = blocks.fieldsCode.map((line) =>
      line.map((piece) => piece.text).join(''),
    );
    expect(code).toEqual(['type Field = {', '  name: string;', '};']);
    expect(featureOf(OTHER, plugs).fieldsCode).toEqual([]);
    expect(featureOf(ONE).fieldOptions).toEqual([]);
  });
});
