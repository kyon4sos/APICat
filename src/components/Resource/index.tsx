import React, { ComponentType, FunctionComponent, ReactElement, ReactNode } from "react";
import { Container } from "../Container";

export type ResourceProps = {
  list: ComponentType | ReactElement;
  content: ComponentType | ReactElement;
  name: string;
  index?: boolean;
};

export const Resource: React.FC<ResourceProps> = (props) => {
  return <Container {...props} />;
};
