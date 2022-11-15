import React, { useEffect, useState } from "react";
import { Alert, Radio, RadioChangeEvent, Tabs, Typography, Upload, UploadProps, Form } from "antd";
import { CodeEditor, ParamTable } from "@/components";
import styled from "@emotion/styled";
import { InboxOutlined } from "@ant-design/icons";
import { UploadForm } from "../UploadForm";

const FormItem = Form.Item;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100px;
  display: flex;
  margin-top: 16px;
`;
export const BodyForm = () => {
  const form = Form.useFormInstance();
  const bodyType = Form.useWatch("bodyType", form);

  const onChange = (e: any) => {};

  const onUploadChange = (e: any) => {
    console.log(e);
  };

  const items = [
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
      children: <ParamTable name="body" />,
    },
    {
      key: "json",
      label: "json",
      children: <CodeEditor />,
    },
    {
      key: "xml",
      label: "raw",
      children: <CodeEditor />,
    },
    {
      key: "binary",
      label: "binary",
      children: (
        <Wrap style={{ alignItems: "center", justifyContent: "center" }}>
          <UploadForm onChange={onUploadChange} />
        </Wrap>
      ),
    },
  ];
  // const handleChange = (e: RadioChangeEvent) => {
  //   setKey(e.target.value);
  // };

  const render = (key: string) => {
    return (
      <>
        {key == "form-data" ? (
          items.find((item) => item.key === key)?.children
        ) : (
          <FormItem name="body">{items.find((item) => item.key === key)?.children}</FormItem>
        )}
      </>
    );
  };

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <FormItem name="bodyType">
          <Radio.Group>
            {items.map((item) => (
              <Radio key={item.key} value={item.key}>
                {item.key}
              </Radio>
            ))}
          </Radio.Group>
        </FormItem>
      </div>
      {render(bodyType ?? "none")}
    </>
  );
};
