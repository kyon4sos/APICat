import React, { ReactNode } from "react";
import styled from "@emotion/styled";

type WrapProps = {
  active?: boolean;
};

const Wrap = styled.div<WrapProps>`
  padding-left: 16px;
  height: 34px;
  line-height: 34px;
  border-radius: 6px;
  min-width: 140px;
  color: #3d3d3e;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#f1f0ef" : null)};
  &:hover {
    background-color: #f1f0ef;
    
  }
`;

type LongButtonProps = {
  icon: ReactNode;
  label: string | JSX.Element;
  extra?: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

const LongButton: React.FC<LongButtonProps> = ({ icon, label, extra, active, onClick }) => {
  return (
    <Wrap
      active={active}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {icon}
      <span style={{ color: "var(--ant-text-color)" }}>{label}</span>
      {extra && <div>{extra}</div>}
    </Wrap>
  );
};

export default LongButton;
