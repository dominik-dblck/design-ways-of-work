/**
 * - `ticketPipeline` · ticket-pipeline.md as data, printed at its path byte for byte
 */
import type { DocumentFile } from './documentTypes.ts';
import { PIPELINE_ONE } from './ticket-pipeline/ticketPipelineOne.ts';
import { PIPELINE_TWO } from './ticket-pipeline/ticketPipelineTwo.ts';
import { PIPELINE_THREE } from './ticket-pipeline/ticketPipelineThree.ts';
import { PIPELINE_FOUR } from './ticket-pipeline/ticketPipelineFour.ts';
import { PIPELINE_FIVE } from './ticket-pipeline/ticketPipelineFive.ts';
import { PIPELINE_SIX } from './ticket-pipeline/ticketPipelineSix.ts';
import { PIPELINE_SEVEN } from './ticket-pipeline/ticketPipelineSeven.ts';
import { PIPELINE_EIGHT } from './ticket-pipeline/ticketPipelineEight.ts';

const ticketPipeline: DocumentFile = {
  path: 'docs/process/ticket-pipeline.md',
  sections: [
    ...PIPELINE_ONE,
    ...PIPELINE_TWO,
    ...PIPELINE_THREE,
    ...PIPELINE_FOUR,
    ...PIPELINE_FIVE,
    ...PIPELINE_SIX,
    ...PIPELINE_SEVEN,
    ...PIPELINE_EIGHT,
  ],
};

export { ticketPipeline };
