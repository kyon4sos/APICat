import { Tabs, Select, Input, Col, Row, Typography } from "antd";
import React, { useState } from "react";
import { getId } from "@/utils";
import FormItem from "antd/es/form/FormItem";
import { ResponseExample } from "../response-example";

const Title = Typography.Title;

const statusOptions = [200, 400].map((item) => ({
  label: item,
  value: item,
  key: item,
}));

const ResponseEditForm = () => {
  return (
    <>
      <Row gutter={12}>
        <Col span={1.2}>
          <span>HTTP状态码:</span>
        </Col>
        <Col span={2}>
          <FormItem noStyle>
            <Select options={statusOptions} />
          </FormItem>
        </Col>
        <Col span={0.6}>
          <span>名称:</span>
        </Col>
        <Col span={3}>
          <FormItem noStyle>
            <Input />
          </FormItem>
        </Col>
        <Col span={1.2}>
          <span>内容格式:</span>
        </Col>
        <Col span={3}>
          <FormItem noStyle>
            <Select />
          </FormItem>
        </Col>
      </Row>
    </>
  );
};

export const ResponseForm: React.FC = () => {
  const [items, setItems] = useState([
    {
      label: "成功",
      key: "200",
      children: (
        <>
          <ResponseEditForm />
        </>
      ),
    },
    {
      label: "公共响应",
      key: "common",
      children: <>公共响应</>,
    },
  ]);
  const [activeKey, setActiveKey] = useState<string>(items[0].key);
  const handleChange = () => {};

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items?.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items?.filter((item) => item.key !== targetKey) ?? [];
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const add = () => {
    setItems((pre) => {
      return [...(pre ?? []), { key: getId(), label: "新建响应", children: <></> }];
    });
  };

  const handleEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <>
      <Title level={5}>返回响应</Title>
      <Tabs type="editable-card" items={items} onEdit={handleEdit} onChange={handleChange} />
      <ResponseExample />
      <div
        style={{
          background: "red",
          height: 300,
        }}
      ></div>
      <div>1111</div>
    </>
  );
};
