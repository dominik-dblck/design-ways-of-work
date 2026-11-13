/**
 * - `ChoiceCard` · one of a few exclusive choices, the whole card the target
 * - refused, it keeps its place and tab stop, says why, and a press goes nowhere
 */
import { useId } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import { Hint } from '../../atoms/Hint/index.ts';
import { Why } from '../../atoms/Why/index.ts';
import type { ChoiceCardGate } from './types/choiceCardTypes.ts';
import { ChoiceCardFace } from './components/ChoiceCardFace.tsx';
import { choiceCardAttrsOf } from './utils/choiceCardAttrsUtils.ts';
import { choiceCardSxOf, choiceSpanSxOf } from './utils/choiceCardSxUtils.ts';

export type ChoiceCardProps = {
  readonly label: string;
  readonly caption?: string;
  readonly note?: string;
  readonly icon?: React.ReactNode;
  readonly selected: boolean;
  readonly onPick: () => void;
  readonly grow?: boolean;
  readonly testId?: string;
} & ChoiceCardGate;

/** The group is the parent's · a refused card greys the way `HintIconButton` does. */
export function ChoiceCard(props: ChoiceCardProps): React.ReactElement {
  const describedBy = useId();
  const { hint, testId } = props;
  const isDisabled = props.disabled ?? false;
  const canGrow = props.grow ?? false;
  const shouldSayWhy = isDisabled && hint !== undefined;
  const card = (
    <ButtonBase
      {...choiceCardAttrsOf({
        selected: props.selected,
        disabled: isDisabled,
        describedBy: shouldSayWhy ? describedBy : undefined,
        onPick: props.onPick,
      })}
      disableRipple
      data-testid={testId}
      sx={choiceCardSxOf({
        grow: canGrow,
        selected: props.selected,
        disabled: isDisabled,
        centred: props.caption === undefined,
      })}
    >
      <ChoiceCardFace {...props} />
      {shouldSayWhy ? <Why id={describedBy}>{hint}</Why> : null}
    </ButtonBase>
  );
  if (hint === undefined) return card;
  return (
    <Hint title={hint} testId={props.hintTestId}>
      <Box component="span" sx={choiceSpanSxOf(canGrow)}>
        {card}
      </Box>
    </Hint>
  );
}
