/**
 * - `LoginFormHead` · the line written in, the brand under it, the quote handed in
 */
import type { ReactNode } from 'react';
import { Text } from '../../../atoms/Text/index.ts';
import { sxListOf } from '../../../../utils/sxListUtils.ts';
import { LOGIN_TAGLINE_SX } from '../constants/loginFormConstants.ts';
import type {
  LoginFormBrand,
  LoginFormWords,
} from '../types/loginFormTypes.ts';
import { taglineSxOf } from '../utils/loginFormEntranceUtils.ts';
import { LoginFormMark } from './LoginFormMark.tsx';

/** No brand, no mark · no quote, nothing under the mark. */
export function LoginFormHead({
  brand,
  words,
  quote,
  shown,
}: {
  readonly brand: LoginFormBrand | undefined;
  readonly words: LoginFormWords;
  readonly quote: ReactNode;
  readonly shown: boolean;
}): React.ReactElement {
  return (
    <>
      <Text
        tone="secondary"
        block
        sx={[LOGIN_TAGLINE_SX, ...sxListOf(taglineSxOf(shown))]}
      >
        {words.tagline}
      </Text>
      {brand && <LoginFormMark brand={brand} shown={shown} />}
      {quote}
    </>
  );
}
