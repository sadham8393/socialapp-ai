import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface AppButtonProps extends ButtonProps {
  label: string;
}

const AppButton: React.FC<AppButtonProps> = ({ label, ...props }) => (
  <Button {...props}>{label}</Button>
);

export default AppButton;
