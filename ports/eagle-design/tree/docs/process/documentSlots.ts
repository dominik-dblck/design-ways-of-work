/**
 * - `cites` · this product's own texts the home's documents ask for, by key
 * - a lesson's reason, a decision's date, an example, each where a document asks
 */
import { ARCH_REVIEW_CITES } from './documentSlots/archReviewCites.ts';
import { CODE_CITES } from './documentSlots/codeCites.ts';
import { FEATURE_CITES } from './documentSlots/featureCites.ts';
import { PIPELINE_OVERVIEW_CITES } from './documentSlots/pipelineOverviewCites.ts';
import { RECON_CITES } from './documentSlots/reconCites.ts';
import { REGRESSION_CITES } from './documentSlots/regressionCites.ts';
import { REPORT_CITES } from './documentSlots/reportCites.ts';
import { SHARED_CITES } from './documentSlots/sharedCites.ts';
import { MODES_CITES } from './documentSlots/modesCites.ts';

const cites: Readonly<Record<string, string>> = {
  ...ARCH_REVIEW_CITES,
  ...CODE_CITES,
  ...FEATURE_CITES,
  ...PIPELINE_OVERVIEW_CITES,
  ...RECON_CITES,
  ...REGRESSION_CITES,
  ...REPORT_CITES,
  ...SHARED_CITES,
  ...MODES_CITES,
};

export { cites };
