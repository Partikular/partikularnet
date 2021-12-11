import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RootState } from "../../store/reducer";

const LinkBackground = () => {
  const { x, y } = useSelector(
    (state: RootState) => state.linkButtonBackgroundPos
  );
  return <Background x={x} y={y} />;
};

const Background = styled.div<{ x: number; y: number }>`
  ${({ x, y }) => css`
    background: #18a189;
    box-shadow: 0 5px 20px 1px #18a18850;
    cursor: pointer;
    position: absolute;
    height: 70px;
    width: 70px;
    border-radius: 20px;
    left: ${x}px;
    top: ${y}px;
    z-index: 1;
    transition: ease-in-out all 0.3s;
  `}
`;

export default LinkBackground;
