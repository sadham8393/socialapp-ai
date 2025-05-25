import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

export interface ToastProps {
  open: boolean;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  autoHideDuration?: number;
  onClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AppToast: React.FC<ToastProps> = ({ open, message, severity = "success", autoHideDuration = 4000, onClose }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: isRtl ? "left" : "center"
      }}
      sx={isRtl ? { direction: "rtl" } : {}}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%", textAlign: isRtl ? "right" : "left" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppToast;
