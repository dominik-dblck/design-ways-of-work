/**
 * - `ContractPage` · the page whole: its head, then the contract
 */
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import { ContractBody } from '../ContractBody/index.ts';
import { ContractPageHead } from './components/ContractPageHead.tsx';

function ContractPage(): ReactElement {
  return (
    <Container maxWidth="lg" sx={{ py: 5.5 }}>
      <Stack spacing={4}>
        <ContractPageHead />
        <ContractBody />
      </Stack>
    </Container>
  );
}

export { ContractPage };
