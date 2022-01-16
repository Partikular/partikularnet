import React from "react";
import styled, { css } from "styled-components";

export const Logo = styled.img`
  height: 60px;
  width: 60px;
`;

export const Margin = styled.div<{ x?: number; y?: number }>`
  ${({ x, y }) => css`
    width: ${x ? x : 0}px;
    height: ${y ? y : 0}px;
  `}
`;
