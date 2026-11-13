/**
 * - `Notification` · one notice of the stack at the top centre
 */
import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import type { AlertProps } from '@mui/material/Alert';
import type { SxProps, Theme } from '@mui/material/styles';
import { sxListOf } from '../../../utils/sxListUtils.ts';

export type NotificationProps = {
  readonly message: ReactNode;
  readonly severity: NonNullable<AlertProps['severity']>;
  readonly icon?: ReactNode;
  readonly onClose?: () => void;
  readonly sx?: SxProps<Theme>;
  readonly testId?: string;
};

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  function Notification({ message, severity, icon, onClose, sx, testId }, ref) {
    return (
      <Alert
        ref={ref}
        data-testid={testId}
        severity={severity}
        variant="filled"
        onClose={onClose}
        icon={icon}
        sx={[{ borderColor: 'transparent' }, ...sxListOf(sx)]}
      >
        {message}
      </Alert>
    );
  },
);
