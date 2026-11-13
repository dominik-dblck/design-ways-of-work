/**
 * - `REPOSITORY_LINE` · every report ends on the repository; the board reads it
 */
import type { Carried } from '../../../scripts/portTypes.ts';

const REPOSITORY_LINE: readonly Carried[] = [
  {
    file: 'app/workspace/board-view/boardNumbers.ts',
    blob: '8c7472cb2896d6a567a961897a25a24c46016541',
    how: 'design/app/workspace/boardView/boardNumbers.ts: the four numbers as Stats, the tickets done of their whole with its bar',
  },
  {
    file: 'docs/documents/ticket-pipeline/ticketPipelineEight.ts',
    blob: 'babd2ba115de80089f98941f3af2474b9924565e',
    how: 'design/docs/documents/ticket-pipeline/reportTemplate.ts: the receipt carries its repository line',
  },
  {
    file: 'docs/documents/ticket-pipeline/ticketPipelineFour.ts',
    blob: 'bc8706759f606b69cd514e9215da9a4e0872b2ea',
    how: 'design/docs/documents/ticket-pipeline/reportSkill.ts: step 6b, the repository whole at the report’s commit',
  },
  {
    file: 'docs/skills/answer-cc.ts',
    blob: '069bf810e5e7dd5e54fdf443b61eadf7a18417d4',
    how: 'design/docs/skills/answer-cc.ts: the close copies the receipt’s repository line too',
  },
];

export { REPOSITORY_LINE };
