/**
 * - the Board page: every epic by the column it stands in, under the workspace's theme
 */
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { theme } from '../theme/theme.ts';
import { BoardPage } from '../components/organisms/BoardPage/index.ts';

const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BoardPage />
      </ThemeProvider>
    </StrictMode>,
  );
