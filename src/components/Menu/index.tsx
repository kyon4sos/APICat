import React, { ReactNode } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import styled from "@emotion/styled";
import "./index.less";

export type ItemType = {
  key: string;
  icon: ReactNode;
  label: string;
};

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 60;
`;

const Item = ({ icon, label }: ItemType) => {
  return (
    <ItemWrap>
      <span style={{ marginBottom: 8 }}>{icon}</span>
      <span
        style={{ opacity: 1, color: "#5c5c5c", fontSize: 12, marginLeft: 0 }}
      >
        {label ?? ""}
      </span>
    </ItemWrap>
  );
};

export type MenuClickEventHandler = MenuProps["onClick"];
export type NMenuProps = {
  items: ItemType[];
  defaultSelectedKeys: string[];
  onClick: MenuClickEventHandler;
};

export const NMenu: React.FC<NMenuProps> = ({
  items: _items,
  defaultSelectedKeys,
  onClick,
}) => {
  const items = _items.map((item) => {
    const { key } = item;
    return {
      key,
      icon: <Item {...item} />,
    };
  });

  return (
    <Menu
      className="menu"
      onClick={onClick}
      theme="light"
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      items={items}
    ></Menu>
  );
};
