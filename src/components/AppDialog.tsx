import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogProps } from "@mui/material";

interface AppDialogProps extends Omit<DialogProps, "title"> {
  title: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const AppDialog: React.FC<AppDialogProps> = ({ title, children, actions, ...dialogProps }) => (
  <Dialog {...dialogProps}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
);

export default AppDialog;
