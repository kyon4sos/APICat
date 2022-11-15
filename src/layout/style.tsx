import styled from "@emotion/styled";

export const Wrap = styled.div`
  display: flex;
`;

export const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 80px;
  background: var(--bg-color-1);
  padding-top: 24px;
  .ant-menu {
    background: var(--bg-color-1);
  }
`;

export const AvatarWrap = styled.div`
  padding: 20px 0;
`;

export const IconWrap = styled.div`
  font-size: 24px;
`;
