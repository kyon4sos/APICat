import { useEffect, useState } from "react";
import { AppCore } from "./components/Application";
import apiManagement from "./pages/api-management";
import setting from "./pages/setting";
import { Resource } from "./components/Resource";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import { AppSetting } from "./components";
import { AppProvider, useAppContext } from "./store/app";
import "./locale/config";

import "./App.css";

function Core() {
  const [locale, setLocal] = useState(enUS);
  const { lang, theme } = useAppContext();

  if (theme.primaryColor) {
    ConfigProvider.config({
      theme: {
        primaryColor: theme.primaryColor,
      },
    });
  }
  useEffect(() => {
    setLocal(getLocal(lang));
  }, [lang]);

  return (
    <ConfigProvider locale={locale}>
      <AppCore>
        <Resource name="api" index {...apiManagement} />
        <Resource name="setting" {...setting} />
      </AppCore>
      <AppSetting />
    </ConfigProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <Core />
    </AppProvider>
  );
}

function getLocal(lang: "en" | "zhCN") {
  switch (lang) {
    case "zhCN":
      return zhCN;
    case "en":
      return enUS;
    default:
      return zhCN;
  }
}

export default App;
