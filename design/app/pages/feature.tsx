/**
 * - the Feature page: one epic read whole, its journeys, endpoints, cases and pages
 */
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { theme } from '../theme/theme.ts';
import { FeaturePage } from '../components/organisms/FeaturePage/index.ts';
import { productView } from '../../productView.ts';

const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FeaturePage plugs={productView} />
      </ThemeProvider>
    </StrictMode>,
  );
