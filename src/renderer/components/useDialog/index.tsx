import { useBoolean } from 'react-use';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { ReactNode } from 'react';

type ToggleFn = (v?: boolean) => void;

const useDialog = ({
  title,
  cancelLoading,
  onCancel,
  cancelText,
  okText,
  onOk,
  okLoading,
  render,
}: {
  title?: string;
  render?: () => ReactNode;
  okText?: string;
  onOk?: (toggleFn: ToggleFn) => void;
  okLoading?: boolean;
  cancelText?: string;
  onCancel?: (toggleFn: ToggleFn) => void;
  cancelLoading?: boolean;
}): [ReactNode, ToggleFn] => {
  const [open, toggle] = useBoolean(false);

  const node = (
    <Dialog open={open} onClose={toggle} maxWidth="sm" fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{render?.()}</DialogContent>
      <DialogActions>
        <LoadingButton
          loading={cancelLoading}
          onClick={() => onCancel?.(toggle)}
        >
          {cancelText ?? 'Cancel'}
        </LoadingButton>
        <LoadingButton loading={okLoading} onClick={() => onOk?.(toggle)}>
          {okText ?? 'Submit'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
  return [node, toggle];
};

export default useDialog;
