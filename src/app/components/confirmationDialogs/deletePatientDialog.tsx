import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, title, content, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="warning" variant="contained">
          Sí
        </Button>
        <Button onClick={onCancel} sx={{ color: 'black', backgroundColor: 'white' }} variant="contained">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
