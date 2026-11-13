/**
 * - the Contract page: every endpoint as TypeScript, under the pages' theme
 */
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { pagesTheme } from '../theme/pagesTheme.ts';
import { ContractPage } from '../components/organisms/ContractPage/index.ts';

const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={pagesTheme}>
        <CssBaseline />
        <ContractPage />
      </ThemeProvider>
    </StrictMode>,
  );
