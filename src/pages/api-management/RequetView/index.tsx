import React from "react";
import { Form } from "antd";
import styled from "@emotion/styled";
import { ResultView } from "../Result";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { ApiDoc, ApiRequest } from "@/type";
import { useRequestRecord } from "@/store";
import { ParamView } from "../ParamView";
import { SendView } from "../SendView";
import { apiRequest } from "@/utils";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

type RequestViewProps = {
  record?: ApiDoc;
};

export const RequestView: React.FC<RequestViewProps> = ({ record }) => {
  const { request, dispatch } = useRequestRecord();
  const [form] = Form.useForm<ApiRequest>();

  const initialValues = request ?? {
    httpMethod: "GET",
  };

  const onFinish = async (val: ApiRequest) => {
    const start = Date.now();
    try {
      const res = await apiRequest(val);
      console.error(res);

      const time = Date.now() - start;
      dispatch({
        type: "Set-Response",
        payload: {
          ...res,
          time,
        },
      });
    } catch (error) {
      dispatch({
        type: "Set-Error",
        payload: {
          ioError: true,
          errorMessage: error,
        },
      });
      throw error;
    }
  };
  return (
    <Form form={form} onFinish={onFinish} initialValues={initialValues}>
      <Wrap>
        <SendView />
        <Allotment vertical>
          <Allotment.Pane minSize={100}>
            <ParamView />
          </Allotment.Pane>
          <Allotment.Pane minSize={100}>
            <ResultView />
          </Allotment.Pane>
        </Allotment>
      </Wrap>
    </Form>
  );
};
