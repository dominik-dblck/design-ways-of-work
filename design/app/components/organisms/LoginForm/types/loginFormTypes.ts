/**
 * - `LoginFormWay`, `LoginFormBrand` · one way in, the mark over the name
 * - `LoginFormWords`, `LoginFormTestIds` · the card's words, the ids it writes
 */
import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type LoginFormWay = {
  readonly key: string;
  readonly label: string;
  readonly icon: ReactNode;
  readonly onClick: () => void;
  readonly testId?: string | undefined;
};

/** The word is drawn with the entrance's own style, so it is handed the sx. */
export type LoginFormBrand = {
  readonly name: string;
  readonly mark: ReactNode;
  readonly word: (sx: SxProps<Theme>) => ReactNode;
};

export type LoginFormWords = {
  readonly tagline: string;
  readonly restricted: string;
};

export type LoginFormTestIds = {
  readonly card: string;
  readonly error: string;
};
