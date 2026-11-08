/**
 * - `ticketPipeline` · ticket-pipeline.md as data, printed at its path byte for byte
 */
import type { DocumentFile } from './documentTypes.ts';
import { PIPELINE_OVERVIEW } from './ticket-pipeline/pipelineOverview.ts';
import { SHARED_SKILL } from './ticket-pipeline/sharedSkill.ts';
import { CODE_SKILL } from './ticket-pipeline/codeSkill.ts';
import { RECON_SKILL } from './ticket-pipeline/reconSkill.ts';
import { ARCH_REVIEW_SKILL } from './ticket-pipeline/archReviewSkill.ts';
import { REGRESSION_SKILL } from './ticket-pipeline/regressionSkill.ts';
import { REPORT_SKILL } from './ticket-pipeline/reportSkill.ts';
import { STANDARD_SKILL } from './ticket-pipeline/standardSkill.ts';
import { FAST_SKILL } from './ticket-pipeline/fastSkill.ts';
import { FEATURE_SKILL } from './ticket-pipeline/featureSkill.ts';
import { RECON_TEMPLATE } from './ticket-pipeline/reconTemplate.ts';
import { SNAPSHOT_TEMPLATE } from './ticket-pipeline/snapshotTemplate.ts';
import { ARCH_REVIEW_TEMPLATE } from './ticket-pipeline/archReviewTemplate.ts';
import { REGRESSION_TEMPLATE } from './ticket-pipeline/regressionTemplate.ts';
import { REPORT_TEMPLATE } from './ticket-pipeline/reportTemplate.ts';

const ticketPipeline: DocumentFile = {
  path: 'docs/process/ticket-pipeline.md',
  sections: [
    ...PIPELINE_OVERVIEW,
    ...SHARED_SKILL,
    ...CODE_SKILL,
    ...RECON_SKILL,
    ...ARCH_REVIEW_SKILL,
    ...REGRESSION_SKILL,
    ...REPORT_SKILL,
    ...STANDARD_SKILL,
    ...FAST_SKILL,
    ...FEATURE_SKILL,
    ...RECON_TEMPLATE,
    ...SNAPSHOT_TEMPLATE,
    ...ARCH_REVIEW_TEMPLATE,
    ...REGRESSION_TEMPLATE,
    ...REPORT_TEMPLATE,
  ],
};

export { ticketPipeline };
