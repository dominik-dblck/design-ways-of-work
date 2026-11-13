/**
 * - `LoginFormWays` · the ways in, one press holding every way while it waits
 */
import { useState } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import type { LoginFormWay } from '../types/loginFormTypes.ts';
import { LoginFormWayButton } from './LoginFormWayButton.tsx';

/** A second round trip never starts · the page leaves on the first. */
export function LoginFormWays({
  ways,
  sx,
}: {
  readonly ways: readonly LoginFormWay[];
  readonly sx: SxProps<Theme>;
}): React.ReactElement {
  const [pressed, setPressed] = useState<string | null>(null);
  return (
    <>
      {ways.map((way) => (
        <LoginFormWayButton
          key={way.key}
          way={way}
          isWaiting={pressed === way.key}
          onPress={() => {
            if (pressed !== null) return;
            setPressed(way.key);
            way.onClick();
          }}
          sx={sx}
        />
      ))}
    </>
  );
}
