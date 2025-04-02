import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import home_en from "./en/home.json";

import footer_en from "./en/footer.json";

import tools_en from "./en/tools.json";

import header_en from "./en/header.json";

import aiList_en from "./en/aiList.json";

const messages = {
  en: {
    translation: {
      ...home_en,
      ...footer_en,
      ...tools_en,
      ...header_en,
      ...aiList_en,
    },
  },
};

i18n.use(initReactI18next).init({
  resources: messages,
  fallbackLng: localStorage.getItem("lang") || "en",
  detection: {
    caches: ["localStorage", "sessionStorage", "cookie"],
  },
});

export default i18n;
