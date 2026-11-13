'use client';

/**
 * - `LoginForm` · the sign-in card: a line, the brand, the ways in, who may use it
 * - it enters as the design draws it, part by part, once
 */
import type { ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import { Surface } from '../../atoms/Surface/index.ts';
import { Text } from '../../atoms/Text/index.ts';
import { sxListOf } from '../../../utils/sxListUtils.ts';
import {
  LOGIN_CARD_SX,
  LOGIN_DENIED_SX,
  LOGIN_FOOT_SX,
} from './constants/loginFormConstants.ts';
import { LOGIN_FORM_TEST_IDS } from './constants/loginFormIdConstants.ts';
import { LOGIN_FORM_WORDS } from './constants/loginFormWords.ts';
import { useLoginFormEntrance } from './hooks/useLoginFormEntrance.ts';
import { riseSxOf } from './utils/loginFormEntranceUtils.ts';
import { LoginFormHead } from './components/LoginFormHead.tsx';
import { LoginFormWays } from './components/LoginFormWays.tsx';
import type {
  LoginFormBrand,
  LoginFormTestIds,
  LoginFormWay,
  LoginFormWords,
} from './types/loginFormTypes.ts';

type LoginFormProps = {
  readonly ways: readonly LoginFormWay[];
  readonly error?: string | null;
  readonly brand?: LoginFormBrand | undefined;
  readonly quote?: ReactNode;
  readonly words?: LoginFormWords | undefined;
  readonly testIds?: LoginFormTestIds | undefined;
};

/** No error, no alert · the error is a sentence, already worded. */
export function LoginForm({
  ways,
  error = null,
  brand,
  quote,
  words = LOGIN_FORM_WORDS,
  testIds = LOGIN_FORM_TEST_IDS,
}: LoginFormProps): React.ReactElement {
  const isShown = useLoginFormEntrance();
  return (
    <Surface variant="card" testId={testIds.card} sx={LOGIN_CARD_SX}>
      <LoginFormHead
        brand={brand}
        words={words}
        quote={quote}
        shown={isShown}
      />
      {error !== null && (
        <Alert
          data-testid={testIds.error}
          severity="error"
          sx={LOGIN_DENIED_SX}
        >
          {error}
        </Alert>
      )}
      <LoginFormWays ways={ways} sx={riseSxOf(isShown, 2)} />
      <Text
        tone="secondary"
        block
        sx={[LOGIN_FOOT_SX, ...sxListOf(riseSxOf(isShown, 3))]}
      >
        {words.restricted}
      </Text>
    </Surface>
  );
}
