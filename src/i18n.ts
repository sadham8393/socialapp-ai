import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:
      (typeof window !== "undefined" &&
        (new URLSearchParams(window.location.search).get("lng") ||
          new URLSearchParams(window.location.search).get("lang"))) ||
      "en",
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
