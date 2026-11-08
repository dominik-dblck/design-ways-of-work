/**
 * - `agentInstructions` · agent-instructions.md as data, printed byte for byte
 */
import type { DocumentFile } from './documentTypes.ts';
import { INSTRUCTIONS_ONE } from './agent-instructions/agentInstructionsOne.ts';

const agentInstructions: DocumentFile = {
  path: 'docs/process/agent-instructions.md',
  sections: [...INSTRUCTIONS_ONE],
};

export { agentInstructions };
