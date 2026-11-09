import type { Property } from 'csstype';

interface BoardLook {
  readonly font: Property.FontFamily;
  readonly title: string;
}

export const BOARD_LOOK: BoardLook = {
  font: 'Basis Grotesque Pro',
  title: 'Board look',
};
