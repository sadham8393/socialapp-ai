import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface AppButtonProps extends ButtonProps {
  label?: string;
}

const AppButton: React.FC<AppButtonProps> = ({ label, children, ...props }) => (
  <Button {...props}>{label ?? children}</Button>
);

export default AppButton;
