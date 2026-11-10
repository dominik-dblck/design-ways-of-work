/**
 * - the Wireframes page: every screen the sheet draws, together, family by family
 */
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { theme } from '../theme/theme.ts';
import { WireframesPage } from '../components/organisms/WireframesPage/index.ts';

const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WireframesPage />
      </ThemeProvider>
    </StrictMode>,
  );
