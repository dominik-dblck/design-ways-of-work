/**
 * - `SearchBox` · a search field; a spinner while an answer is out
 */
import { Input } from '../../atoms/Input/index.ts';
import type { InputProps } from '../../atoms/Input/index.ts';
import { SearchBoxGlyph } from './components/SearchBoxGlyph.tsx';
import { SearchBoxPending } from './components/SearchBoxPending.tsx';
import { SEARCH_BOX_WORDS } from './constants/searchBoxWords.ts';
import type { SearchBoxWords } from './types/searchBoxTypes.ts';

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
  readonly words?: SearchBoxWords | undefined;
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
  words = SEARCH_BOX_WORDS,
}: SearchBoxProps): React.ReactElement {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      label={placeholder}
      {...(size === undefined ? {} : { size })}
      onChange={onQuery}
      state={disabled ? 'locked' : 'default'}
      startAdornment={<SearchBoxGlyph />}
      endAdornment={
        pending ? (
          <SearchBoxPending testId={pendingTestId} label={words.pending} />
        ) : undefined
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
