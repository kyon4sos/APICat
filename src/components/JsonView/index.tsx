import { CopyOutlined, FontColorsOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React from "react";
import ReactJson from "react-json-view";

// To edit a value, try ctrl/cmd + click enter edit mode
// When editing a value, try ctrl/cmd + Enter to submit changes
// When editing a value, try Escape key to cancel

export const JsonView: React.FC<JsonViewProps> = ({ value, onChange }) => {
  const handleAdd = () => {};
  return (
    <>
      <Button.Group size="small">
        <Button icon={<CopyOutlined />}>复制</Button>
        <Button icon={<FontColorsOutlined />}>格式化</Button>
        <Button icon={<FontColorsOutlined />}>数据类型</Button>
        <Button icon={<FontColorsOutlined />}>object size</Button>
      </Button.Group>
      <ReactJson src={value} iconStyle="triangle" enableClipboard onAdd={handleAdd} />
    </>
  );
};

export type JsonViewProps = {
  value: object;
  onChange?: (value: any) => void;
};
