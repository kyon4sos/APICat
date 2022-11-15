import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

export type ResultViewProps = {};

export type HeaderResult = {
  name: string;
  value: string;
};
export type CookieResult = {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: string;
  maxAge: string | number;
  httpOnly: boolean;
  secure: any;
};

const cookieColumns: ColumnsType<HeaderResult> = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "值",
    dataIndex: "value",
  },
];

const headerColumns: ColumnsType<CookieResult> = [
  {
    title: "name",
    dataIndex: "name",
  },
  {
    title: "value",
    dataIndex: "value",
  },
  {
    title: "domain",
    dataIndex: "domain",
  },
  {
    title: "expires",
    dataIndex: "expires",
  },
  {
    title: "maxAge",
    dataIndex: "maxAge",
  },
  {
    title: "httpOnly",
    dataIndex: "httpOnly",
  },
  {
    title: "secure",
    dataIndex: "secure",
  },
];

export type ResultTableProps = {
  type: string;
};

export const ResultTable: React.FC<ResultTableProps> = ({ type }) => {
  const columnsMap: Record<string, any> = {
    cookie: cookieColumns,
    header: headerColumns,
  };

  return <Table columns={columnsMap[type]} />;
};
