import { useTranslation } from "react-i18next";

const AppFooter = () => {
  const { t } = useTranslation();

  return (
    <footer
      style={{
        marginTop: "auto",
        background: "var(--footer-bg)",
        color: "var(--footer-color)",
        textAlign: "center",
        padding: "0.75rem 0",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div>
        {t("footerCopyright")}
      </div>
    </footer>
  );
};

export default AppFooter;
