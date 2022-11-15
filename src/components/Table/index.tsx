import React, { useState } from "react";
import { Input, Table, Typography, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CloseOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { arrayMoveImmutable } from "array-move";
import type { SortableContainerProps, SortEnd } from "react-sortable-hoc";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import styled from "@emotion/styled";
import { getId } from "@/utils";
import { useTranslation } from "react-i18next";
import { I18n } from "../FormattedMessage";

const TableWrap = styled.div`
  width: 100%;
`;

const { Title } = Typography;

type DataType = {
  name: string;
  value: string;
  sort?: number;
  id?: string | number;
};

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: "grab", color: "#999" }} />);

const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />);
const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />);

export type NTableProps = {
  title?: string;
  data?: any[];
  name?: string;
};

export const ParamTable: React.FC<NTableProps> = ({ title, name }) => {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      name: "1",
      value: "2",
      sort: 1,
      id: 1,
    },
  ]);

  const formItemName = name ?? "";

  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "sort",
      width: 30,
      key: "sort",
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      title: <I18n id="paramName" />,
      dataIndex: "name",
      key: "name",
      render: (value, record, index) => (
        <Form.Item name={[formItemName, index, "name"]} noStyle>
          <Input placeholder={t("paramName") as string} />
        </Form.Item>
      ),
    },
    {
      title: <I18n id="paramValue" />,
      dataIndex: "value",
      key: "value",
      render: (value, record, index) => (
        <Form.Item name={[formItemName, index, "value"]} noStyle>
          <Input placeholder={t("paramValue") as string} />
        </Form.Item>
      ),
    },
    {
      key: "operate",
      width: "30px",
      render: () => <CloseOutlined />,
    },
  ];
  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter((el: DataType) => !!el);
      setDataSource(newData);
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody useDragHandle disableAutoscroll helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
  );

  const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
    const index = dataSource.findIndex((x) => x.sort === restProps["data-row-key"]);
    return <SortableItem index={index} {...restProps} />;
  };

  const handleAddRow = () => {
    setDataSource((data) => [...data, { value: "", name: "", id: getId(), sort: data.length + 1 }]);
  };

  return (
    <TableWrap>
      {title ? (
        <Title level={5} type="secondary">
          {title}
        </Title>
      ) : null}
      <Table
        columns={columns}
        size="small"
        rowKey="sort"
        dataSource={dataSource}
        pagination={false}
        summary={() => {
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <PlusOutlined onClick={handleAddRow} />
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </TableWrap>
  );
};
