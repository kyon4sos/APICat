import styled from "@emotion/styled";

export const BodyWrap = styled.div`
  height: 600px;
  display: flex;
  padding: 0px 0px 0px 0px;
`;

export const TitleWrap = styled.div`
  padding: 0px 4px 0px 8px;
  cursor: pointer;
  .ant-typography {
    margin-right: 8px;
    margin-bottom: 0px;
    display: inline-block;
  }
  .anticon {
    font-size: 12px;
    color: var(--primary-color);
  }
`;
export const SideWrap = styled.div`
  background-color: #f3f5f6;
  padding-left: 16px;
  padding-top: 0px;
  height: calc(100% - 56px);
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 60px 24px 8px;
`;
