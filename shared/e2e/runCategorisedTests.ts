/**
 * - `runCategorisedTests` · a screen's flows as Playwright tests, by category
 * - `CategoryMap`, `TestDefinition`, `ContextParams`, `RunCategorisedTestsParams`
 */
import type { Browser, Page, TestInfo, TestType } from '@playwright/test';
import { theAppAnswers } from './theAppAnswers.ts';
import { runtimeOf } from './theRuntime.ts';
import type { Runtime } from './theRuntime.ts';

export type TestDefinition<Context> = {
  readonly run: (context: Context) => Promise<void>;
};

export type CategoryMap<Context> = Readonly<
  Record<string, Readonly<Record<string, TestDefinition<Context>>>>
>;

export type ContextParams = {
  readonly page: Page;
  readonly browser: Browser;
  readonly testInfo: TestInfo;
  readonly runtime: Runtime;
  readonly category: string;
  readonly testName: string;
  readonly skip: (why?: string) => void;
};

type CoverageReporter = {
  readonly printCoverageTable: (title: string) => void;
};

export type RunCategorisedTestsParams<
  Args extends { readonly page: Page },
  WorkerArgs extends { readonly browser: Browser },
  Context,
> = {
  readonly test: TestType<Args, WorkerArgs>;
  readonly suiteName: string;
  readonly categories: CategoryMap<Context>;
  readonly createContext: (params: ContextParams) => Promise<Context> | Context;
  // the path the app answers on once up, and the project whose run prints the coverage: the product's
  readonly healthPath: string;
  readonly reportingProject: string;
  readonly serial?: boolean;
  readonly coverageRegistry?: CoverageReporter;
  readonly beforeAll?: (params: {
    readonly runtime: Runtime;
  }) => Promise<void> | void;
  readonly afterAll?: (params: {
    readonly runtime: Runtime;
    readonly testInfo: TestInfo;
  }) => Promise<void> | void;
};

// the app's address for a hook or a test: the project's `use.baseURL`, the one home of it
const runtimeIn = (testInfo: TestInfo): Runtime =>
  runtimeOf(testInfo.project.use.baseURL);

// each category a describe, each of its flows a test handed its context
const testsOf = <
  Args extends { readonly page: Page },
  WorkerArgs extends { readonly browser: Browser },
  Context,
>(
  {
    test,
    categories,
    createContext,
  }: RunCategorisedTestsParams<Args, WorkerArgs, Context>,
  onRun: () => void,
): void => {
  const { skip } = test;
  for (const [category, byName] of Object.entries(categories))
    test.describe(category, () => {
      for (const [testName, definition] of Object.entries(byName))
        test(testName, async ({ page, browser }, testInfo) => {
          onRun();
          const context = await createContext({
            page,
            browser,
            testInfo,
            runtime: runtimeIn(testInfo),
            category,
            testName,
            // a flow skips itself, its reason said: a provider off, a run stopped
            skip: (why) => skip(true, why ?? 'skipped by the flow'),
          });
          await definition.run(context);
        });
    });
};

// the hooks around a suite: the app answers before it, the coverage printed once after, by one project
const hooksOf = <
  Args extends { readonly page: Page },
  WorkerArgs extends { readonly browser: Browser },
  Context,
>(
  params: RunCategorisedTestsParams<Args, WorkerArgs, Context>,
  hasRun: () => boolean,
): void => {
  const { test, suiteName, healthPath, reportingProject, coverageRegistry } =
    params;
  let isPrinted = false;
  const printTheTable = ({
    testInfo,
  }: {
    readonly testInfo: TestInfo;
  }): void => {
    if (coverageRegistry === undefined || isPrinted || !hasRun()) return;
    if (testInfo.project.name !== reportingProject) return;
    isPrinted = true;
    coverageRegistry.printCoverageTable(
      `${suiteName} · ${testInfo.project.name}`,
    );
  };
  test.beforeAll(async () => {
    const runtime = runtimeIn(test.info());
    await (
      params.beforeAll ?? ((ask) => theAppAnswers({ ...ask, healthPath }))
    )({ runtime });
  });
  test.afterAll(async () => {
    const testInfo = test.info();
    await (params.afterAll ?? printTheTable)({
      runtime: runtimeIn(testInfo),
      testInfo,
    });
  });
};

export const runCategorisedTests = <
  Args extends { readonly page: Page } = { readonly page: Page },
  WorkerArgs extends { readonly browser: Browser } = {
    readonly browser: Browser;
  },
  Context = unknown,
>(
  params: RunCategorisedTestsParams<Args, WorkerArgs, Context>,
): void => {
  let hasRun = false;
  params.test.describe(params.suiteName, () => {
    if (params.serial === true)
      params.test.describe.configure({ mode: 'serial' });
    hooksOf(params, () => hasRun);
    testsOf(params, () => {
      hasRun = true;
    });
  });
};
