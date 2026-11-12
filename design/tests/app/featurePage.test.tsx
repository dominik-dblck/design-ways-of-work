/**
 * - `app/pages/feature/FeaturePage.tsx`: the page draws the epic it opens on, section by section
 */
import { ThemeProvider } from '@mui/material/styles';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FeaturePageCombinationsSection } from '../../app/components/organisms/FeaturePage/components/FeaturePageCombinationsSection.tsx';
import { FeaturePage } from '../../app/components/organisms/FeaturePage/index.ts';
import { theme } from '../../app/theme/theme.ts';
import { productView } from '../../productView.ts';
import {
  featureOf,
  featureWords as words,
  firstEpic,
} from '../../app/workspace/featureView.ts';

describe('the Feature page', () => {
  it('draws the epic it opens on, its journeys and its endpoints', () => {
    const html = renderToString(
      <ThemeProvider theme={theme}>
        <FeaturePage plugs={productView} />
      </ThemeProvider>,
    );
    const view = featureOf(firstEpic() ?? '', productView);
    expect(html).toContain(view.title);
    expect(html).toContain(words.journeys.label);
    for (const journey of view.journeys) expect(html).toContain(journey.id);
    for (const endpoint of view.endpoints)
      expect(html).toContain(endpoint.title);
  });

  it('asks before counting a combinations file', () => {
    const drawn = (node: React.ReactElement): string =>
      renderToString(<ThemeProvider theme={theme}>{node}</ThemeProvider>);
    const translations = drawn(
      <FeaturePageCombinationsSection view={featureOf('E09', productView)} />,
    );
    expect(translations).toContain('roleCombinations.js');
    expect(translations).toContain(words.combinations.count);
    const approvals = featureOf('E06', productView);
    expect(
      drawn(<FeaturePageCombinationsSection view={approvals} />),
    ).toContain(words.combinations.missing(approvals.statesNamed, 'E06'));
  });
});
