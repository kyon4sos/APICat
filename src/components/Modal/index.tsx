import { Menu, MenuProps, Modal, Typography } from "antd";
import React, { ReactNode, useState } from "react";
import type { ItemType } from "antd/es/menu/hooks/useItems";
import { BodyWrap, SideWrap, ContentWrap } from "./style";
import styled from "@emotion/styled";

const SideTitle = styled.div`
  background-color: var(--bg-color);
  height: 100%;
  .ant-typography {
    padding: 16px 0 0 20px;
  }
`;

type SideProps = {
  items: ItemType[];
  onClick: (key: string) => void;
  defaultSelectedKeys?: string[];
};

const Side: React.FC<SideProps> = ({ items, onClick, defaultSelectedKeys }) => {
  const defaultKeys = defaultSelectedKeys ?? (items ? [String(items[0]?.key)] : [""]);
  const handleClick: MenuProps["onClick"] = (e) => {
    onClick && onClick(e.key);
  };
  return (
    <SideWrap>
      <Menu
        forceSubMenuRender
        theme="light"
        onClick={handleClick}
        style={{ width: 240 }}
        defaultSelectedKeys={defaultKeys}
        mode="inline"
        items={items}
      />
    </SideWrap>
  );
};

type NModelProps = {
  items: MenuItem[];
  open: boolean;
  title?: ReactNode | string;
  onChange: (open: boolean) => void;
};

const NModal: React.FC<NModelProps> = ({ items, open, title, onChange }) => {
  const [view, setView] = useState(items[0].key);
  const showModal = () => {
    onChange(true);
  };

  const handleOk = () => {
    onChange(false);
  };

  const handleCancel = () => {
    onChange(false);
  };

  const handleClick = (key: string) => {
    setView(key);
  };

  const renderContent = () => {
    return items?.find((item) => item?.key == view)?.view ?? null;
  };

  return (
    <>
      <Modal
        open={open}
        width="90vw"
        style={{
          maxWidth: 900,
        }}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{
          padding: 0,
        }}
      >
        <BodyWrap>
          <SideTitle className="title">
            <Typography.Title className="text-color" level={4}>
              {title}
            </Typography.Title>
            <Side items={items} onClick={handleClick} />
          </SideTitle>
          <ContentWrap>{renderContent()}</ContentWrap>
        </BodyWrap>
      </Modal>
    </>
  );
};

type MenuItem = { view: ReactNode | JSX.Element } & ItemType;

export default NModal;
