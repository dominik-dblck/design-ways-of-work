/**
 * - `app/workspace/feature-view.ts`: one epic read whole, from the sheet lent to the page
 */
import { describe, expect, it } from 'vitest';
import { journeysOfEpic } from '../../sheet/cases/journeys.ts';
import { all as COMMANDS } from '../../sheet/contract/commands.ts';
import { decidedIn } from '../../sheet/model/field-kinds.ts';
import {
  featureOf,
  features,
  firstEpic,
} from '../../app/workspace/feature-view.ts';
import { piecesOf } from '../../app/workspace/contract-view/codeTokens.ts';

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

  it('frames the screens its read list names, and names its combinations or the states without them', () => {
    expect(featureOf('E04').screens.map((one) => one.href)).toEqual([
      'E04 Blocks UI spec.dc.html',
    ]);
    expect(featureOf('E09').combinations.map((one) => one.file)).toEqual([
      'role-combinations.js',
    ]);
    const approvals = featureOf('E06');
    expect(approvals.combinations).toEqual([]);
    expect(approvals.statesNamed).toBeGreaterThan(0);
  });

  it('shows the field kinds on the epic that decided them, and only there', () => {
    expect(featureOf(decidedIn).fieldKinds.length).toBeGreaterThan(0);
    expect(featureOf('E06').fieldKinds).toEqual([]);
    const blocks = featureOf(decidedIn);
    expect(blocks.fieldOptions.map((one) => one.name)).toContain('localized');
    const code = blocks.fieldsCode.map((line) =>
      line.map((piece) => piece.text).join(''),
    );
    expect(code).toContain('type Field =');
    expect(featureOf('E06').fieldsCode).toEqual([]);
  });
});
