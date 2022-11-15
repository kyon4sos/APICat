import React, { PropsWithChildren, useEffect } from "react";
import { Avatar, Divider } from "antd";
import {
  ApartmentOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MenuClickEventHandler, NMenu } from "../components/Menu";
import { Wrap, Side, AvatarWrap, IconWrap } from "./style";
import { Content } from "@/components/Content";
import { useEvent } from "@/hooks/use-event";

const iconStyle = { fontSize: 20 };

export const Layout: React.FC<PropsWithChildren> = () => {
  const navigate = useNavigate();
  const { emit } = useEvent();
  const { t } = useTranslation();
  const defaultSelectedKeys = ["api"];
  const items = [
    {
      key: "api",
      icon: <ApartmentOutlined style={iconStyle} />,
      label: t("apis"),
    },
  ];
  useEffect(() => {
    navigate(defaultSelectedKeys[0]);
  }, []);

  const handleClick: MenuClickEventHandler = (menu) => {
    navigate(menu.key);
  };

  const handleClickSetting = () => {
    emit("showAppSetting");
  };

  return (
    <Wrap className="layout">
      <Side>
        <AvatarWrap>
          <Avatar size={36} icon={<UserOutlined />} />
        </AvatarWrap>
        <NMenu
          items={items}
          defaultSelectedKeys={defaultSelectedKeys}
          onClick={handleClick}
        />
        <IconWrap>
          <Divider />
          <SettingOutlined onClick={handleClickSetting} />
        </IconWrap>
      </Side>
      <Content style={{ flex: 1 }}>
        <Outlet />
      </Content>
    </Wrap>
  );
};
