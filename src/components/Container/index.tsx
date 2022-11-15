import React, { ComponentType, ReactElement } from "react";
import { Allotment } from "allotment";
import { RequestRecordProvider } from "@/store";
import { DoubleLeftOutlined, QuestionCircleOutlined, SkinOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { ListWrap, ContentWrap, Wrap, Footer } from "./style";
import { Project } from "../Project";
import "allotment/dist/style.css";
import { AppFooter } from "../AppFooter";

export const Container: React.FC<ContainerProps> = ({ list: List, content: Content }) => {
  return (
    <RequestRecordProvider>
      <Allotment proportionalLayout={false}>
        <Allotment.Pane preferredSize="260">
          <ListWrap>
            <Project />
            {React.isValidElement(List) ? List : <List />}
          </ListWrap>
        </Allotment.Pane>
        <Allotment.Pane>
          <ContentWrap>
            <Wrap>{React.isValidElement(Content) ? Content : <Content />}</Wrap>
            <AppFooter />
          </ContentWrap>
        </Allotment.Pane>
      </Allotment>
    </RequestRecordProvider>
  );
};
export type ContainerProps = {
  list: ComponentType | ReactElement;
  content: ComponentType | ReactElement;
};
