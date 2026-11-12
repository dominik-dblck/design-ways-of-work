/**
 * - `MODES_CITES` · the texts the modes' page asks this product for
 */
const MODES_CITES: Readonly<Record<string, string>> = {
  'modes.decided': ' (PM, 25 Sep 2026)',
  'modes.eyebrow':
    'DECIDED WITH THE PM 25 SEP · LANDED 28 SEP AS SYNC 6, BEFORE E04',
  'modes.since': ' since 28 Sep (sync 6)',
  'modes.landed': 'decided 25 Sep · landed 28 Sep (sync 6) · ',
  'modes.reconStopEpics': ' (E06, E13)',
  'modes.reconStopRow': 'E06, E13 → feature + reconStop',
  'modes.refineEpics': ' (E06, E13 + reconStop)',
  'modes.when': 'after T-E03-00’s report, ',
  'modes.runsHistory':
    ' · the feature flow lived in plan-Feature flow until 25 Sep',
  'modes.exampleTicket': 'T-E03-00',
};

export { MODES_CITES };
