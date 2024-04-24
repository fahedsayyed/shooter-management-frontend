// Alert.tsx
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Divider } from "@mui/material";
import BlankCard from "src/components/shared/BlankCard";

interface AlertProps {
  open: boolean;
  disabled?: boolean;
  title: string;
  buttonText?: string;
  message: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertBox: React.FC<AlertProps> = ({ open, title, message, onClose, onConfirm, buttonText,disabled }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <BlankCard>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button color="error" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={onConfirm} disabled={disabled}>
            {buttonText}
          </Button>
        </DialogActions>
      </BlankCard>
    </Dialog>
  );
};

export default AlertBox;
