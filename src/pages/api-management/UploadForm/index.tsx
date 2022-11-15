import { Upload, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const uploadProps: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
    }
    if (status === "done") {
    } else if (status === "error") {
    }
  },
  onDrop(e) {},
};

export const UploadForm = ({ onChange }: { onChange: (val: any) => void }) => {
  return (
    <Dragger {...uploadProps} onChange={onChange}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p style={{ padding: "0 16px" }}>点击按钮或拖动文件上传</p>
    </Dragger>
  );
};
