import { Button, Input, Tabs, Typography, List, Row, Col, Avatar, Modal, Form, Radio } from "antd";
import type { TabsProps, MenuProps } from "antd";
import React, { PropsWithChildren, useRef, useState } from "react";
import { HolderOutlined, SearchOutlined } from "@ant-design/icons";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";

import { arrayMoveImmutable } from "array-move";

import "./index.less";
import { AvatarWrap, ContentWrap, ItemWrap } from "./style";

interface DataType {
  name: string;
  id: string | number;
  avatar?: string;
}

type MenuItem = MenuProps["items"];

type SortableItemProps = {
  item: DataType;
};

const DragHandle = SortableHandle(() => (
  <HolderOutlined
    style={{
      cursor: "move",
      fontSize: 20,
      marginRight: 8,
      color: "#a0a0a0",
    }}
  />
));

const SortableItem = SortableElement<PropsWithChildren<SortableItemProps>>((props: { item: DataType }) => {
  const { item } = props;
  return (
    <ItemWrap>
      <List.Item
      // actions={[
      //   <Dropdown>
      //     <EllipsisOutlined />
      //   </Dropdown>,
      // ]}
      >
        <List.Item.Meta
          avatar={
            <AvatarWrap>
              <DragHandle />
              <Avatar src="https://joeschmoe.io/api/v1/random" />
            </AvatarWrap>
          }
          title={<span style={{ color: "#333" }}>{item.name}</span>}
          description={null}
        />
      </List.Item>
    </ItemWrap>
  );
});

const SortableList = SortableContainer<{ items: DataType[] }>((props: { items: DataType[] }) => {
  const { items } = props;
  const menuItems = [
    { label: "菜单项一", key: "item-1" },
    { label: "菜单项二", key: "item-2" },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item, index) => (
        <SortableItem key={`numbers-${index}`} collection="numbers" item={item} index={index}></SortableItem>
      )}
    />
  );
});

const ProjectList: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState<DataType[]>([
    {
      id: "aaaa",
      name: "测试团队1",
    },
    {
      id: "bbb",
      name: "测试团队2",
    },
    {
      id: "cccc",
      name: "测试团队3",
    },
    {
      id: "ddd",
      name: "测试团队4",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const listRef = useRef(list);
  const initialValues = {
    projectName: "",
    private: 0,
  };
  const handleSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const sorted = arrayMoveImmutable(list, oldIndex, newIndex);
    setList(sorted);
    listRef.current = sorted;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.target.value;
    const target = val ? listRef.current.filter((item) => item.name.includes(val)) : listRef.current;
    setList(target);
    setSearchValue(e.target.value);
  };

  const handleNewProject = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleFinish = (e: any) => {};
  const handleSubmit = () => {
    form.submit();
  };
  return (
    <div>
      <Row justify="space-between">
        <Col span={10}>
          <Input placeholder="搜索项目" value={searchValue} prefix={<SearchOutlined />} onChange={handleChange} />
        </Col>
        <Col>
          <Button type="primary" onClick={handleNewProject}>
            新建项目
          </Button>
        </Col>
      </Row>
      <SortableList helperClass="helperClass" items={list} onSortEnd={handleSortEnd} />
      <Modal
        open={open}
        onCancel={handleCancel}
        title="新建团队"
        footer={
          <Form.Item>
            <Button htmlType="button" onClick={handleCancel}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              确认
            </Button>
          </Form.Item>
        }
      >
        <Form layout="horizontal" form={form} onFinish={handleFinish} initialValues={initialValues}>
          <Form.Item
            label="项目名称"
            name="projectName"
            required
            rules={[
              {
                required: true,
                message: "请输入项目名称",
                min: 4,
                max: 10,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="是否公开" name="private" required>
            <Radio.Group
              options={[
                {
                  label: "公开项目",
                  value: 1,
                },
                {
                  label: "私有项目",
                  value: 0,
                },
              ]}
            ></Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const TeamList: React.FC = () => {
  return <>team</>;
};

const Setting: React.FC = () => {
  return <>setting</>;
};

export const Content: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "团队项目",
      children: <ProjectList />,
    },
    {
      key: "2",
      label: "成员/权限",
      children: <TeamList />,
    },
    {
      key: "3",
      label: "团队设置",
      children: <Setting />,
    },
  ];
  return (
    <ContentWrap>
      <Typography.Title level={4}>示例团队</Typography.Title>
      <Tabs items={items} />
    </ContentWrap>
  );
};
