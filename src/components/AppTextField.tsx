import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const AppTextField: React.FC<TextFieldProps> = (props) => {
  return <TextField {...props} />;
};

export default AppTextField;
