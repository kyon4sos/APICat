import React from "react";
import { DoubleLeftOutlined, QuestionCircleOutlined, SkinOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Footer } from "../Container/style";
import AppSetting from "../AppSetting";
import { useEvent } from "@/hooks/use-event";

export const AppFooter: React.FC = () => {
  const { emit } = useEvent();
  function handleClickSkin() {
    emit("showAppSetting");
  }

  return (
    <>
      <Footer>
        <DoubleLeftOutlined />
        <Space>
          <QuestionCircleOutlined />
          <SkinOutlined onClick={handleClickSkin} />
        </Space>
      </Footer>
    </>
  );
};
