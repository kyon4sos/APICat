import { Tabs } from "antd";
import React from "react";
import type { TabsProps } from "antd";

const items: TabsProps["items"] = [
  { label: "文档", key: "document", children: <h1>children</h1> },
  { label: "修改文档", key: "update_document", children: <h1>2</h1> },
  { label: "运行", key: "run", children: <h1>3</h1> },
];

export const ApiView: React.FC = () => {
  return <Tabs items={items} />;
};
