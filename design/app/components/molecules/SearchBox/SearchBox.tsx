/**
 * - `SearchBox` · a search field; a spinner while an answer is out
 */
import Box from '@mui/material/Box';
import { Input } from '../../atoms/Input/index.ts';
import type { InputProps } from '../../atoms/Input/index.ts';
import { Glyph } from '../../atoms/Glyph/index.ts';
import { SearchBoxPending } from './components/SearchBoxPending.tsx';

export type SearchBoxProps = {
  readonly value: string;
  readonly onQuery: (value: string) => void;
  readonly placeholder?: string;
  // px, or full for the row it sits in
  readonly width?: number | 'full';
  readonly size?: InputProps['size'];
  readonly disabled?: boolean;
  readonly pending?: boolean;
  readonly testId?: string | undefined;
  readonly pendingTestId?: string;
};

export function SearchBox({
  value,
  onQuery,
  placeholder,
  width,
  size,
  disabled = false,
  pending = false,
  testId,
  pendingTestId,
}: SearchBoxProps): React.ReactElement {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      label={placeholder}
      {...(size === undefined ? {} : { size })}
      onChange={onQuery}
      state={disabled ? 'locked' : 'default'}
      startAdornment={
        <Box
          component="span"
          aria-hidden
          sx={{ display: 'inline-flex', color: 'text.secondary', mr: 1 }}
        >
          <Glyph name="search" size="medium" />
        </Box>
      }
      endAdornment={
        pending ? <SearchBoxPending testId={pendingTestId} /> : undefined
      }
      testId={testId}
      sx={
        width === undefined
          ? undefined
          : { width: width === 'full' ? '100%' : width }
      }
    />
  );
}
