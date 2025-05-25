import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header>
      <Box sx={{ py: 2, textAlign: "center", fontWeight: "bold", fontSize: 24 }}>
        {t("socialSupportApplication")}
      </Box>
      <Box sx={{ textAlign: "center", fontSize: 16, color: "text.secondary" }}>
        {t("governmentPortal")}
      </Box>
    </header>
  );
};

export default Header;
