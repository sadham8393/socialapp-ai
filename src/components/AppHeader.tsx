import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const AppHeader = () => {
  const { t } = useTranslation();

  return (
    <header>
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: 18, sm: 24 },
          px: 2,
          wordBreak: "break-word",
        }}
      >
        {t("socialSupportApplication")}
      </Box>
      <Box
        sx={{
          textAlign: "center",
          fontSize: { xs: 13, sm: 16 },
          color: "text.secondary",
          px: 2,
          wordBreak: "break-word",
        }}
      >
        {t("governmentPortal")}
      </Box>
    </header>
  );
};

export default AppHeader;
