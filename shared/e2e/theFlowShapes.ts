/**
 * - `FlowItemBase` · a flow as a screen's catalogue holds it, its paths and cases
 */
import type { FlowPath } from './flowPaths.ts';

type AddedCase = {
  readonly step: string;
  readonly case: string;
  readonly why: string;
};

export type FlowItemBase<
  FlowId extends string,
  UserType extends string,
  FlowCategory extends string,
> = {
  readonly id: FlowId;
  readonly name: string;
  readonly userType: UserType;
  readonly flowCategory: FlowCategory;
  // the kinds of path it walks: a screen walks every kind, or its status file says where
  readonly paths: readonly [FlowPath, ...FlowPath[]];
  readonly description: string;
  readonly entryConditions: string;
  readonly mainSteps: string;
  // the state the screen changes to once the flow has worked: what its test asserts
  readonly expectedResult: string;
  // the test cases the flow makes happen, by the ids the product's cases give them
  readonly cases?: readonly string[];
  readonly added?: readonly AddedCase[];
};
