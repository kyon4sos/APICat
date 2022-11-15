import { UpOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Modal, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { TitleWrap, BodyWrap, SideWrap } from "./style";
import { Content } from "./components/List";
import styled from "@emotion/styled";
import { I18n } from "../FormattedMessage";

const Side: React.FC = () => {
  const [current, setCurrent] = useState("1");
  const [items, setItems] = useState<MenuItem[]>([
    {
      key: 1,
      label: "我的团队",
      icon: <UserOutlined />,
      children: [
        { key: 11, label: "示例团队" },
        {
          key: 12,
          label: "新建团队",
        },
      ],
    },
    {
      key: 2,
      label: "最近访问",
      icon: <UserOutlined />,
    },
  ]);
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  return (
    <SideWrap>
      <Menu
        theme="light"
        onClick={onClick}
        style={{ width: 240 }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </SideWrap>
  );
};

const IconWrap = styled.span`
  margin-right: 8px;
  font-size: 12px;
`;

export const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip placement="topLeft" title="切换团队或者项目">
        <TitleWrap onClick={showModal}>
          <Typography.Title level={5} type="secondary">
            <I18n id="defaultProject" />
          </Typography.Title>
          {isModalOpen ? <UpOutlined /> : <DownOutlined />}
        </TitleWrap>
      </Tooltip>
      <Modal
        open={isModalOpen}
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
          <Side />
          <Content />
        </BodyWrap>
      </Modal>
    </>
  );
};

type MenuItem = Required<MenuProps>["items"][number];
