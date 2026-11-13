/**
 * - `FileInput` · the file picker a visible control opens, never drawn
 * - one file, and it clears itself so the same file again is a change
 */
import Box from '@mui/material/Box';

export type FileInputProps = {
  readonly inputRef: React.RefObject<HTMLInputElement | null>;
  readonly onFile: (file: File) => void;
  readonly testId?: string;
};

export function FileInput({
  inputRef,
  onFile,
  testId,
}: FileInputProps): React.ReactElement {
  return (
    <Box
      component="input"
      ref={inputRef}
      data-testid={testId}
      type="file"
      hidden
      onChange={(event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (file !== undefined) onFile(file);
      }}
    />
  );
}
