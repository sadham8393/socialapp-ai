import React from "react";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

interface AppTooltipProps extends Omit<TooltipProps, "children"> {
  children: React.ReactElement;
  title: React.ReactNode;
}

const AppTooltip: React.FC<AppTooltipProps> = ({ children, title, ...props }) => {
  return (
    <Tooltip title={title} arrow disableHoverListener={!title} {...props}>
      <span style={{ display: "inline-block", width: "100%" }}>{children}</span>
    </Tooltip>
  );
};

export default AppTooltip;
