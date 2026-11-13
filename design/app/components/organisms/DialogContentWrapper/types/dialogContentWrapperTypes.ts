/**
 * - `DialogContentWrapperProps` · what a body draws inside the dialog's frame
 * - `DialogContentWrapperWords`, `DialogContentWrapperTestIds` · its words, its ids
 */
import type { ReactNode } from 'react';
import type { GlyphName } from '../../../atoms/Glyph/index.ts';

/** A greyed primary says why on hover · what is pinned never scrolls away · a glyph may lead the title and the primary. */
export type DialogContentWrapperProps = {
  readonly title: string;
  readonly icon?: GlyphName;
  readonly subtitle?: string;
  readonly summary?: string;
  readonly onClose: () => void;
  readonly primaryLabel: string;
  readonly primaryIcon?: GlyphName;
  readonly cancelLabel?: string;
  readonly onPrimary: () => void;
  readonly pending?: boolean;
  readonly primaryDisabled?: boolean;
  readonly primaryWhy?: string;
  readonly children?: ReactNode;
  readonly pinned?: ReactNode;
  readonly testId?: string;
  readonly primaryTestId?: string;
  readonly words?: DialogContentWrapperWords | undefined;
  readonly testIds?: DialogContentWrapperTestIds | undefined;
};

export type DialogContentWrapperWords = {
  readonly cancel: string;
  readonly close: string;
};

export type DialogContentWrapperTestIds = {
  readonly cancel: string;
  readonly close: string;
};
