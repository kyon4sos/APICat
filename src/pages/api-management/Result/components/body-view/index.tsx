import { CodeEditor } from "@/components";
import { useRequestRecord } from "@/store";
import { CopyOutlined, DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Alert, AlertProps, Button, Radio, Space, Tooltip } from "antd";

const Wrap = styled.div`
  margin-bottom: 8px;
`;

const AlertWrap = styled.div`
  .ant-alert {
    padding: 1px 14px;
  }
`;

export const BodyView = () => {
  const { response } = useRequestRecord();
  if (!response) {
    return null;
  }
  const status = response.status ?? 400;
  const size = response?.headers["content-length"] ?? "";
  const time = response?.time ?? 0;
  const message = `status: ${status}  time: ${time}  size: ${size} `;
  let type = "success" as AlertProps["type"];
  if (status >= 400) {
    type = "error";
  }

  return (
    <>
      <Wrap>
        <Space>
          <Radio.Group size="small">
            <Radio.Button value="pretty">Pretty</Radio.Button>
            <Radio.Button value="raw">Raw</Radio.Button>
            <Radio.Button value="preview">Preview</Radio.Button>
          </Radio.Group>
          <Space.Compact block size="small">
            <Tooltip title="copy">
              <Button icon={<CopyOutlined />} />
            </Tooltip>
            <Tooltip title="download">
              <Button icon={<DownloadOutlined />} />
            </Tooltip>
            <Tooltip title="search">
              <Button icon={<SearchOutlined />} />
            </Tooltip>
          </Space.Compact>
          <AlertWrap>
            <Alert message={message} type={type} showIcon />
          </AlertWrap>
        </Space>
      </Wrap>
      <CodeEditor value={JSON.stringify(response?.data)} />
    </>
  );
};
