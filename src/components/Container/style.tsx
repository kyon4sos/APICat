import styled from "@emotion/styled";

export const Footer = styled.div`
  height: 36px;
  background-color: transparent;
  background: transparent;
  width: 100%;
  border-top: 1px solid #cdcdcd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;
export const ListWrap = styled.div`
  height: 100%;
  background-color: var(--bg-color-2);
  padding: 24px 6px 6px 6px;
`;

export const ContentWrap = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  background: var(--bg-color);
`;

export const Wrap = styled.div`
  overflow: hidden;
`;

export const TitleWrap = styled.div`
  padding: 4px 4px 0px 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
