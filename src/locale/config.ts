import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import zhCN from "./zh-cn.json";

export type i18nKey = keyof typeof resources.en.translation;

export const resources = {
  en: {
    translation: en,
  },
  zhCN: {
    translation: zhCN,
  },
};

i18next.use(initReactI18next).init({
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});
