import { Alert, Tabs, Typography } from "antd";
import React from "react";
import styled from "@emotion/styled";
import { useRequestRecord } from "@/store";
import { RawRequest } from "./components/raw-request";
import { BodyView } from "./components/body-view";
import { ResultTable } from "./components/result-table";
import { I18n } from "@/components";

export type ResultViewProps = {};

const ResultViewWrap = styled.div`
  padding: 0 16px;
`;

const ErrorWrap = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ResultView: React.FC<ResultViewProps> = () => {
  const { ioError, errorMessage, response } = useRequestRecord();

  if (ioError) {
    return (
      <ErrorWrap>
        <Typography.Title level={4}>
          <I18n id="responseError" />
        </Typography.Title>
        <Alert type="error" message={errorMessage} />
      </ErrorWrap>
    );
  }
  const items = [
    {
      label: "Body",
      key: "body",
      children: <BodyView />,
    },
    {
      label: "Cookie",
      key: "Cookie",
      children: <ResultTable type="cookie" />,
    },
    {
      label: "Header",
      key: "Header",
      children: <ResultTable type="header" />,
    },
    {
      label: "实际请求",
      key: "实际请求",
      children: <RawRequest />,
    },
  ];
  return (
    <ResultViewWrap>
      {response ? (
        <Tabs items={items} />
      ) : (
        <Typography>
          <I18n id="responseTip" />
        </Typography>
      )}
    </ResultViewWrap>
  );
};
