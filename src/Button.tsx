import styled, { css } from "styled-components";

interface ButtonProps {
  onClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  height?: number;
  width?: string;
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  backgroundColor,
  textColor,
  height,
  width,
  children,
}) => {
  return (
    <StyledButton onClick={onClick} backgroundColor={backgroundColor}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  backgroundColor?: string;
  textColor?: string;
  height?: number;
  width?: number;
}>`
  ${({ backgroundColor, textColor, height, width }) => css`
    outline: none;
    border: none;
    border-radius: 20px;
    padding: 10px;
    font-size: 1.125rem;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;

    color: ${textColor ? textColor : "white"};
    background-color: ${backgroundColor ? `${backgroundColor}` : "#18a189"};
  `}
`;

export default Button;
