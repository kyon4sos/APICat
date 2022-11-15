import { ApiRequest, BodyType, Param } from "@/type";
import { Body, getClient, HttpOptions } from "@tauri-apps/api/http";
import { Response } from "@tauri-apps/api/http";
import { nanoid } from "nanoid";

async function request<T>(option: HttpOptions) {
  const client = await getClient();
  return client.request<T>(option);
}

async function apiRequest(req: ApiRequest) {
  const { url, httpMethod, params, bodyType, body } = req;
  const query = genQuery(params);
  const bodyData = genBody(bodyType, body);
  const cookie = toString(req.cookies);
  const headers: Record<string, any> = {};
  if (cookie) {
    headers.cookie = cookie;
  }  
  return request({
    url: url,
    method: httpMethod,
    query,
    body: bodyData,
    headers,
  });
}

const getId = () => nanoid();

type Tree<T> = {
  key: string;
  children: Tree<T>[];
};

const findInTree = <T = Record<string, any>>(
  target: string,
  array: T[],
  key: keyof T = "key" as any,
  children: keyof T = "children" as any
): T | null => {
  const find = (k: string, arr: T[]): T | null => {
    for (let i = 0; i < arr.length; i++) {
      const t = arr[i];
      if (t[key] == target) {
        return t;
      }
      if (t[children]) {
        const res = find(target, t[children] as T[]);
        if (res) {
          return res;
        }
      }
    }
    return null;
  };
  return find(target, array);
};

const toString = (data?: Param[]) => {
  return data
    ?.filter((item) => Boolean(item.name) && Boolean(item.value))
    .map((item) => {
      const { name, value } = item;
      if (name && value) {
        return `${name}=${value}`;
      }
    })
    .join(";");
};

const genQuery = (params?: Param[]) => {
  return params?.reduce((pre, item) => {
    const { name, value } = item;
    if (name) {
      pre[name] = String(value);
    }
    return pre;
  }, {} as any);
};

const genBody = (type?: BodyType, data?: any) => {
  switch (type) {
    case "none":
      return undefined;
    case "form-data":
      return Body.form(data);
    case "json":
      return Body.json(JSON.parse(data));
    case "xml":
      return Body.text(data);
    case "binary":
      return Body.bytes(data);
    default:
      return undefined;
  }
};

export { request, apiRequest, Response, getId, findInTree, genBody };
