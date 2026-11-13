/**
 * - `ROUTE_LABEL_SX` · a route's label, on one line in the wide rail's width
 */
import { NAV_LABEL_SX } from './sideNavRailHeadConstants.ts';
import { RAIL_LABEL_WIDE } from './sideNavRailConstants.ts';

export const ROUTE_LABEL_SX = {
  ...NAV_LABEL_SX,
  width: RAIL_LABEL_WIDE,
} as const;
