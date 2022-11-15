import styled from "@emotion/styled";

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 24px;
  background-color: var(--bg-color);
`;

export const ItemWrap = styled.div`
  cursor: move;
  .ant-list-item-meta {
    align-items: center;
  }
  .ant-list-item-meta-title {
    margin-bottom: 0px;
  }
`;

export const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
`;
