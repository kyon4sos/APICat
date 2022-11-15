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
  background-color: var(--bg-color);
  height: 50px;
  line-height: 50px;
  color: #5b5b5d;
`;
export const IconWrap = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #5b5b5d;
`;

export const ListWrap = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:200px;
  gap: 20px;
`;
