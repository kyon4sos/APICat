import { CloseOutlined } from "@ant-design/icons";
import { TableProps, Input, Select, Checkbox, Table, Form, Typography } from "antd";

const FormItem = Form.Item;
const { Text } = Typography;

const typeOptions = [
  {
    label: "string",
    value: "string",
  },
  {
    label: "number",
    value: "number",
  },
  {
    label: "array",
    value: "array",
  },
  {
    label: "integer",
    value: "integer",
  },
];
export const ParamEditTable = () => {
  const dataSource: ParamDataType[] = [
    { id: 1, name: "", type: "string", required: true, example: "example", desc: "说明" },
  ];
  const columns: TableProps<ParamDataType>["columns"] = [
    {
      width: 200,
      title: "参数名",
      dataIndex: "name",
      key: "name",
      render: () => {
        return (
          <FormItem name="name" noStyle>
            <Input placeholder="添加参数" />
          </FormItem>
        );
      },
    },
    {
      title: "类型",
      dataIndex: "type",
      width: 120,
      key: "type",
      render: () => {
        return (
          <FormItem name="type" noStyle>
            <Select options={typeOptions} />
          </FormItem>
        );
      },
    },
    {
      title: "必填",
      dataIndex: "required",
      width: 60,
      key: "required",
      render: () => {
        return (
          <FormItem name="required" valuePropName="checked" noStyle>
            <Checkbox />
          </FormItem>
        );
      },
    },
    {
      title: "示例值",
      dataIndex: "example",
      key: "example",
      render: () => {
        return (
          <FormItem name="example" noStyle>
            <Input />
          </FormItem>
        );
      },
    },
    {
      title: "说明",
      dataIndex: "desc",
      key: "desc",
      render: () => {
        return (
          <FormItem name="desc" noStyle>
            <Input />
          </FormItem>
        );
      },
    },
    {
      title: "",
      width: 60,
      dataIndex: "operate",
      key: "operate",
      render: () => {
        return <CloseOutlined />;
      },
    },
  ];
  return (
    <>
      <Text>Query参数</Text>
      <Table rowKey="id" columns={columns} dataSource={dataSource} size="small" pagination={false} />
    </>
  );
};

type ParamDataType = {
  id: string | number;
  name: string;
  type: string;
  required: boolean;
  example: string;
  desc: string;
};
