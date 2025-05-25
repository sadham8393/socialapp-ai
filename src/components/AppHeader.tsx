import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const AppHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <header style={{ padding: "0.75rem 0", borderBottom: "1px solid #e5e7eb" }}>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
          mt: 1,
          px: 2,
        }}
      >
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          aria-label={t("selectLanguage") || "Select language"}
          style={{
            fontWeight: "bold",
            background: "#fff",
            border: "1px solid #000",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 15,
            padding: "4px 12px",
            outline: "none",
            minWidth: 60,
            textAlign: "center",
            transition: "all 0.2s",
            margin: 0,
            display: "block",
          }}
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </Box>
    </header>
  );
};

export default AppHeader;
