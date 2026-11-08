/**
 * - `all`, `byId` · the plan pages, and one by its id
 * - `spec`, `combinations`, `projectContext` · the spec files, and the first read
 * - `rules`, `checklistRules`, `guards`, `decisions`, `refineSteps` · how we work
 */
import { DECISIONS, GUARDS } from './plans/driftGuards.ts';
import { PLANS } from './plans/planPages.ts';
import type { PlanPage, RuleRow } from './plans/plansTypes.ts';
import { DELIVERY_RULES } from './plans/deliveryRules.ts';
import { DESIGN_RULES } from './plans/designRules.ts';
import { PRINCIPLES } from './plans/principleRules.ts';
import { COMBINATIONS, PROJECT_CONTEXT, SPEC } from './plans/specFiles.ts';
import { CHECKLIST_CITES, TICKET_CHECKLIST } from './plans/checklistRules.ts';
import { REFINE_STEPS } from './plans/refineSteps.ts';

// the generic rules (D31), principles first: those both sides apply
const RULES: readonly RuleRow[] = [
  ...PRINCIPLES,
  ...DESIGN_RULES,
  ...DELIVERY_RULES,
];

const byId: Readonly<Record<string, PlanPage>> = Object.fromEntries(
  PLANS.map((plan) => [plan.id, plan]),
);

export type { DeliveryKey } from './plans/deliveryRules.ts';
export type { DesignKey } from './plans/designRules.ts';
export type { PrincipleKey } from './plans/principleRules.ts';
export type { RuleRow, RuleSlot } from './plans/plansTypes.ts';
export type { ChecklistKey, ReadyKey } from './plans/checklistRules.ts';
export {
  PLANS as all,
  byId,
  CHECKLIST_CITES as checklistCites,
  COMBINATIONS as combinations,
  DECISIONS as decisions,
  GUARDS as guards,
  PROJECT_CONTEXT as projectContext,
  REFINE_STEPS as refineSteps,
  RULES as rules,
  SPEC as spec,
  TICKET_CHECKLIST as ticketChecklist,
};
