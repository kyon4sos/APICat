import { HttpVerb } from "@tauri-apps/api/http";
import type { DataNode } from "antd/es/tree";

export type Param = {
  id?: string | number;
  value?: string | number;
  name?: string;
  sort?: number;
};

type HttpMethod = HttpVerb;

export type BodyType = "none" | "form-data" | "json" | "xml" | "binary";

export interface ApiRequest {
  params?: Param[];
  body?: any;
  bodyType?: BodyType;
  headers?: Param[];
  cookies?: Param[];
  url: string;
  httpMethod: HttpMethod;
}

export interface ApiResponse {
  data?: any;
  cookie?: any;
  headers?: any;
  status: number;
  time?: number;
  ok: boolean;
  url: string;
  rawHeaders?: any;
}

export type IoError = {
  ioError: boolean;
  errorMessage?: any;
};

export interface ApiDoc {
  request?: ApiRequest;
  response?: ApiResponse;
  ioError: boolean;
  errorMessage?: any;
}

export interface ApiModel {
  model: string;
}

export interface TreeNode<T = any> extends DataNode {
  type?: TreeNodeType;
  children?: TreeNode<T>[];
  id?: string;
  value?: T;
}

export type TreeNodeType = "dir" | "api" | "model" | "fastRequest";

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE";
