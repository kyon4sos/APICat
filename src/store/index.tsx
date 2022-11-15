import { ApiDoc, ApiRequest, ApiResponse, IoError } from "@/type";
import React, { ReactNode, useContext, useReducer } from "react";

const initState: ApiDoc = {
  request: {
    body: null,
    url: "",
    httpMethod: "GET",
  },
  ioError: false,
};

const reducer = (state: ApiDoc, action: RequestAction): ApiDoc => {
  const { type, payload } = action;
  switch (type) {
    case "Set-Request": {
      return {
        ...state,
        request: payload,
      };
    }
    case "Set-Response": {
      return {
        ...state,
        response: payload,
      };
    }
    case "Set-Error": {
      return {
        ...state,
        ioError: payload.ioError,
        errorMessage: payload.errorMessage,
      };
    }
    default:
      return initState;
  }
};

type RequestContext = {
  dispatch: React.Dispatch<RequestAction>;
} & ApiDoc;

// const RequestContext = React.createContext<{ state: ApiDoc; dispatch: React.Dispatch<RequestAction> }>(null as any);
const RequestContext = React.createContext<RequestContext>(null as any);

type RequestAction =
  | { type: "Set-Response"; payload: ApiResponse }
  | { type: "Set-Request"; payload: ApiRequest }
  | { type: "Set-Error"; payload: IoError };

export const RequestRecordProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <RequestContext.Provider value={{ ...(state ?? {}), dispatch }}>{children}</RequestContext.Provider>;
};

export const useRequestRecord = () => {
  return useContext(RequestContext);
};
