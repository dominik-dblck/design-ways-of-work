/**
 * - `app/pages/feature/FeaturePage.tsx`: the page draws the epic it opens on, section by section
 */
import { ThemeProvider } from '@mui/material/styles';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FeaturePageCombinationsSection } from '../../app/components/organisms/FeaturePage/components/FeaturePageCombinationsSection.tsx';
import { FeaturePage } from '../../app/components/organisms/FeaturePage/index.ts';
import { pagesTheme } from '../../app/theme/pagesTheme.ts';
import { productView } from '../../productView.ts';
import {
  featureOf,
  features,
  featureWords as words,
  firstEpic,
} from '../../app/workspace/featureView.ts';

const drawn = (node: React.ReactElement): string =>
  renderToString(<ThemeProvider theme={pagesTheme}>{node}</ThemeProvider>);

const views = features().map(({ epic }) => featureOf(epic, productView));

describe('the Feature page', () => {
  it('draws the epic it opens on, its journeys and its endpoints', () => {
    const html = drawn(<FeaturePage plugs={productView} />);
    const view = featureOf(firstEpic() ?? '', productView);
    expect(html).toContain(view.title);
    expect(html).toContain(words.journeys.label);
    for (const journey of view.journeys) expect(html).toContain(journey.id);
    for (const endpoint of view.endpoints)
      expect(html).toContain(endpoint.title);
  });

  it('asks before counting a combinations file', () => {
    for (const view of views.filter((one) => one.combinations.length > 0)) {
      const html = drawn(<FeaturePageCombinationsSection view={view} />);
      for (const one of view.combinations) expect(html).toContain(one.file);
      expect(html).toContain(words.combinations.count);
    }
  });

  it('names the states an epic without combinations stands in, or draws nothing', () => {
    const bare = views.filter((one) => one.combinations.length === 0);
    for (const view of bare.filter((one) => one.statesNamed > 0))
      expect(drawn(<FeaturePageCombinationsSection view={view} />)).toContain(
        words.combinations.missing(view.statesNamed, view.epic),
      );
    for (const view of bare.filter((one) => one.statesNamed === 0))
      expect(
        drawn(<FeaturePageCombinationsSection view={view} />),
      ).not.toContain('id="combinations"');
  });
});
