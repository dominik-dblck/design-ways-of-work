/**
 * - `PLANS` · the plan pages: what each one renders, who it is for, what it reads
 */
import type { PlanPage } from './plansTypes.ts';

export const PLANS: readonly PlanPage[] = [
  {
    id: 'board',
    title: 'Board',
    file: 'Board.html',
    kind: 'page',
    status: 'current',
    audience: 'both',
    reads: ['board.js'],
    purpose: 'One card per epic, in the column its tickets stand in, the ideas before them, and the context pack an agent needs to start a ticket.',
  },
];
