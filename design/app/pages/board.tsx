/**
 * - the Board page: every epic by its column, under the pages' theme
 */
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { pagesTheme } from '../theme/pagesTheme.ts';
import { TokenVariables } from '../components/atoms/TokenVariables/index.ts';
import { BoardPage } from '../components/organisms/BoardPage/index.ts';

const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={pagesTheme}>
        <CssBaseline />
        <TokenVariables />
        <BoardPage />
      </ThemeProvider>
    </StrictMode>,
  );
