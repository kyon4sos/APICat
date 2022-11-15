import React from "react";
import { Tabs, Typography, Upload } from "antd";
import { ParamTable } from "@/components";
import styled from "@emotion/styled";
import { BodyForm } from "../BodyForm";

export const ParamsForm: React.FC = () => {
  return <ParamTable name="params" />;
};

const HeadersForm = () => {
  return <ParamTable name="header" />;
};

const ParamViewWrap = styled.div`
  padding: 0 16px;
`;

export const ParamView: React.FC = () => {
  const items = [
    {
      label: "Params",
      key: "Params",
      children: <ParamsForm />,
    },
    { label: "Body", key: "Body", children: <BodyForm /> },
    { label: "Headers", key: "Headers", children: <HeadersForm /> },
    { label: "Cookies", key: "Cookies", children: <ParamTable name="cookies" /> },
    { label: "Auth", key: "Auth", children: <Typography>暂未实现</Typography> },
  ];
  return (
    <ParamViewWrap>
      <Tabs items={items} />
    </ParamViewWrap>
  );
};
