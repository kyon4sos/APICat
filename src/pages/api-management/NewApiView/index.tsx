import React from "react";
import styled from "@emotion/styled";
import { Input, Select, Button, Form, Row, Col, Badge } from "antd";
import type { BadgeProps } from "antd";
import { ApiParamForm } from "./components/form";
import { ResponseForm } from "./components/respone";

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

const Padding = styled.div`
  padding: 8px 16px;
  height: calc(100vh - 100px);
  overflow: auto;
  &:hover {
    overflow: auto;
  }
`;

const methodList = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "CONNECT", "TRACE"];

type StatusOption = {
  key: string | number;
  value: string;
  label: string;
  status: BadgeProps["status"];
};

const options: StatusOption[] = [
  {
    key: "1",
    label: "开发",
    value: "开发",
    status: "processing",
  },
  {
    key: "2",
    label: "发布",
    value: "发布",
    status: "success",
  },
  {
    key: "3",
    label: "测试",
    value: "测试",
    status: "default",
  },
  {
    key: "4",
    label: "废弃",
    value: "废弃",
    status: "warning",
  },
];

export const NewApiView: React.FC = () => {
  return (
    <Padding>
      <Form layout="vertical">
        <Input.Group compact style={{ marginBottom: 16 }}>
          <FormItem name="httpMethod" noStyle>
            <Select style={{ width: 120 }}>
              {methodList.map((m) => (
                <Option key={m} value={m}>
                  {m}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem name="url" required rules={[{ required: true, message: "Please input your host!" }]} noStyle>
            <Input
              placeholder="请输入http或 https 起始的完整URL"
              style={{
                width: `calc(100% - 200px)`,
                marginRight: 16,
              }}
            />
          </FormItem>
          <FormItem noStyle>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>
        </Input.Group>
        <Row gutter={12}>
          <Col span={8}>
            <FormItem label="名称" required>
              <Input />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="分组" required>
              <Input />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="状态" required>
              <Select>
                {options.map((opt) => (
                  <Option key={opt.key} value={opt.value}>
                    <Badge status={opt.status as any} text={opt.label} />
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <FormItem label="责任人">
              <Input />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="标签" required>
              <Input />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="服务" required>
              <Select>
                {options.map((opt) => (
                  <Option key={opt.key} value={opt.value}>
                    <Badge status={opt.status} text={opt.label} />
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="说明">
          <TextArea />
        </FormItem>
        <FormItem>
          <ApiParamForm />
        </FormItem>
        <FormItem>
          <ResponseForm />
        </FormItem>
      </Form>
    </Padding>
  );
};
