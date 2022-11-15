import { Alert, Tabs, Typography } from "antd";
import React from "react";
import type { TabsProps } from "antd";
import { ParamEditTable } from "../form-table";
import styled from "@emotion/styled";

const { Title } = Typography;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100px;
  display: flex;
  margin-top: 16px;
`;

const Body = () => {
  const items: TabsProps["items"] = [
    {
      key: "none",
      label: "none",
      children: (
        <Wrap style={{ justifyContent: "center" }}>
          <Alert style={{ width: "100%" }} message="该请求体没有Body" />
        </Wrap>
      ),
    },
    {
      key: "form-data",
      label: "form-data",
      children: <ParamEditTable />,
    },
    {
      key: "json",
      label: "json",
      children: <></>,
    },
    {
      key: "xml",
      label: "raw",
      children: <></>,
    },
    {
      key: "binary",
      label: "binary",
      children: <></>,
    },
  ];
  return <Tabs items={items} />;
};

export const ApiParamForm: React.FC = () => {
  const items: TabsProps["items"] = [
    { label: "Params", key: "Params", children: <ParamEditTable /> },
    { label: "Body", key: "Body", children: <Body /> },
    { label: "Headers", key: "Headers", children: <ParamEditTable /> },
    { label: "Cookies", key: "Cookies", children: <ParamEditTable /> },
    { label: "Auth", key: "Auth", children: <Typography>暂未实现</Typography> },
  ];

  return (
    <div>
      <Title level={5}>请求参数</Title>
      <Tabs items={items} />
    </div>
  );
};
