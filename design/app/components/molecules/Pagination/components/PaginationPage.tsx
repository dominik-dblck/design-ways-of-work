/**
 * - `PaginationPage` · one page number as a button, the current one marked
 */
import { Button } from '../../../atoms/Button/index.ts';
import { PAGE_CURRENT_SX, PAGE_SX } from '../constants/paginationConstants.ts';

type PaginationPageProps = {
  readonly page: number | null;
  readonly selected: boolean;
  readonly onPress: () => void;
  readonly testId?: string | undefined;
};

/** The current page is said as current, and sits on the subtle wash. */
export function PaginationPage({
  page,
  selected,
  onPress,
  testId,
}: PaginationPageProps): React.ReactElement {
  return (
    <Button
      variant="text"
      size="sm"
      testId={testId}
      current={selected}
      onClick={onPress}
      sx={selected ? PAGE_CURRENT_SX : PAGE_SX}
    >
      {String(page)}
    </Button>
  );
}
