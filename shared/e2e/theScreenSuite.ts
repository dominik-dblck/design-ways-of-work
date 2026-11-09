/**
 * - `screenSuite`, `ScreenSuite`, `FlowReporter` · a screen's suite and registry
 * - `journeysKept`, `journeysRunApart`, `JourneysTaken` · the journeys a run takes
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Browser, Page } from '@playwright/test';
import type {
  CategoryMap,
  RunCategorisedTestsParams,
} from './runCategorisedTests.ts';
import { createCoverageRegistry } from './theCoverageRegistry.ts';
import type { ScreenDefinitions } from './theDefinitions.ts';

// what a flow hands the registry once it has run: its id, its steps being its catalogue's
export type FlowReporter<FlowId extends string> = (flowId: FlowId) => void;

// which of a screen's journeys a run takes: the ones `only` names, less the ones `except` does
export type JourneysTaken = {
  readonly only?: readonly string[];
  readonly except?: readonly string[];
};

// a test's journey: what its name says before the first ` · `, `J7` or `DONE`
const journeyOf = (testName: string): string => testName.split(' · ')[0] ?? '';

// the categories with only the tests whose journey the run takes; a category left empty goes
export const journeysKept = <Context>({
  categories,
  only,
  except,
}: JourneysTaken & {
  readonly categories: CategoryMap<Context>;
}): CategoryMap<Context> => {
  const isKept = (testName: string): boolean =>
    (only === undefined || only.includes(journeyOf(testName))) &&
    (except === undefined || !except.includes(journeyOf(testName)));
  return Object.fromEntries(
    Object.entries(categories)
      .map(([category, byName]) => ({
        category,
        tests: Object.fromEntries(
          Object.entries(byName).filter(([name]) => isKept(name)),
        ),
      }))
      .filter(({ tests }) => Object.keys(tests).length > 0)
      .map(({ category, tests }) => [category, tests]),
  );
};

// the ids an `only: [...]` lists in a journey file's text, each unquoted
const onlyIdsIn = (text: string): readonly string[] =>
  text
    .split('only: [')
    .slice(1)
    .flatMap((after) =>
      after
        .slice(0, after.indexOf(']'))
        .split(',')
        .map((id) => id.trim().replace(/^'|'$/g, ''))
        .filter((id) => id !== ''),
    );

// the journeys a screen's `journeys/` files run, each in a file of its own: its spec leaves them
export const journeysRunApart = ({
  screensRoot,
  screen,
}: {
  readonly screensRoot: string;
  readonly screen: string;
}): readonly string[] => {
  const folder = path.join(screensRoot, screen, 'journeys');
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith('.spec.ts'))
    .flatMap((file) =>
      onlyIdsIn(fs.readFileSync(path.join(folder, file), 'utf8')),
    );
};

// what a screen hands the runner: everything but Playwright's `test`
export type ScreenSuite<Context> = Omit<
  RunCategorisedTestsParams<
    { readonly page: Page },
    { readonly browser: Browser },
    Context
  >,
  'test'
>;

// a screen's suite: the registry its flows report to, built from the screen's definitions
export const screenSuite = <FlowId extends string, Context>({
  definitions,
  categories,
  ...rest
}: Pick<
  ScreenSuite<Context>,
  'createContext' | 'beforeAll' | 'serial' | 'healthPath' | 'reportingProject'
> & {
  readonly definitions: ScreenDefinitions<FlowId>;
  readonly categories: (covered: FlowReporter<FlowId>) => CategoryMap<Context>;
}): ScreenSuite<Context> => {
  const registry = createCoverageRegistry(definitions.allFlowIds);
  return {
    ...rest,
    suiteName: definitions.screen,
    coverageRegistry: registry,
    categories: categories((flowId) => registry.register(flowId)),
  };
};
