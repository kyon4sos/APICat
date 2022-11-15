import React from "react";
import { Button, Form, Input, Select } from "antd";
import styled from "@emotion/styled";
import "allotment/dist/style.css";
import { I18n } from "@/components";
import { useTranslation } from "react-i18next";
const FormItem = Form.Item;

const HeaderWrap = styled.div`
  width: 100%;
  padding: 0 16px;
  border-bottom: 1px solid #ababab;
`;

const methodList = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "CONNECT", "TRACE"];

const options = methodList.map((item) => ({
  label: item,
  value: item,
}));

export const SendView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <HeaderWrap>
      <Input.Group compact style={{ marginBottom: 0 }}>
        <FormItem name="httpMethod" noStyle>
          <Select style={{ width: 120 }} options={options}></Select>
        </FormItem>
        <FormItem
          name="url"
          required
          validateStatus="error"
          help="Should be combination of numbers & alphabets"
          rules={[{ required: true, message: "Please input your username!" }]}
          noStyle
        >
          <Input style={{ width: `calc(100% - 258px)` }} placeholder={t("urlTip") as string} />
        </FormItem>
        <FormItem noStyle>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            <I18n id="send" />
          </Button>
        </FormItem>
        <FormItem>
          <Button>
            <I18n id="save" />
          </Button>
        </FormItem>
      </Input.Group>
    </HeaderWrap>
  );
};
