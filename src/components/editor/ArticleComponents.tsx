import styled, { css } from "styled-components";

export const EditorContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  z-index: 10;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 20px 1px #e1efee;
`;

export const ArticleTitle = styled.h1`
  ${() => css`
    font-size: 2.626rem;
  `}
`;
