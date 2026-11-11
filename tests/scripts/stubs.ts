/**
 * - `stubbed` · tools as a test sees them, written in a folder: each call logged
 * - `stubEnv` · what a run reads them through: the log, who fails, what it says
 * - `callsIn` · the calls a log holds, a line each
 */
import fs from 'node:fs';
import path from 'node:path';

// its call written down; named red, it says what the test gave it and fails; told to write, it marks each file
const STUB = `#!/bin/sh
name=$(basename "$0")
printf '%s %s\\n' "$name" "$*" >> "$STUB_CALLS"
for word in "$name" "$@"; do
  case " $STUB_RED " in *" $word "*)
    [ -n "$STUB_OUT" ] && printf '%s\\n' "$STUB_OUT"
    [ -n "$STUB_ERR" ] && printf '%s\\n' "$STUB_ERR" >&2
    exit 1 ;;
  esac
done
mark=''
case " $* " in *" --write "*) mark=formatted ;; *" --fix "*) mark=fixed ;; esac
if [ -n "$mark" ]; then
  for file in "$@"; do
    if [ -f "$file" ]; then echo "// $mark" >> "$file"; fi
  done
fi
exit 0
`;

interface Stubs {
  // the file each call is written to
  readonly calls: string;
  // the tools, or the scripts yarn runs, that fail
  readonly red?: readonly string[];
  // what a failing one prints, and what it prints as an error
  readonly out?: string;
  readonly err?: string;
}

function stubbed(folder: string, names: readonly string[]): void {
  fs.mkdirSync(folder, { recursive: true });
  for (const name of names)
    fs.writeFileSync(path.join(folder, name), STUB, { mode: 0o755 });
}

const stubEnv = ({
  calls,
  red = [],
  out = '',
  err = '',
}: Stubs): Readonly<Record<string, string>> => ({
  STUB_CALLS: calls,
  STUB_RED: red.join(' '),
  STUB_OUT: out,
  STUB_ERR: err,
});

const callsIn = (calls: string): readonly string[] =>
  fs.readFileSync(calls, 'utf8').split('\n').filter(Boolean);

export { callsIn, stubbed, stubEnv };
