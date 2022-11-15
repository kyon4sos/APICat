import { ReactNode } from "react";
import styled from "@emotion/styled";

export const CardWrap = styled.div`
  width: 160px;
  height: 198px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  border: 1px solid transparent;
  background-color: #fafafa;
  cursor: pointer;
  &:hover {
    border: 1px solid #8e8374;
  }
`;

export const TitleWrap = styled.span`
  text-align: center;
  width: 100%;
  background-color: #f3f5f6;
  height: 50px;
  line-height: 50px;
  color: var(--ant-text-color);
`;
export const IconWrap = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #5b5b5d;
`;

export type CardProp = {
  title: string | JSX.Element;
  icon: ReactNode;
  onClick?: () => void;
  id?: string;
};

export const Card: React.FC<CardProp> = ({ icon, title, onClick }) => {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <CardWrap onClick={handleClick}>
      <IconWrap>{icon}</IconWrap>
      <TitleWrap>{title}</TitleWrap>
    </CardWrap>
  );
};
