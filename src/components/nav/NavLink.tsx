import React, { useEffect, useRef } from "react";
import { Dispatch, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { setLinkBackgroundPosition } from "../../store/content/actionCreators";

interface NavLinkProps {
  icon: React.ReactElement;
  path?: string;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, path, active }) => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const iconWrapperRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const setButtonBackgroundPosition = React.useCallback(
    (buttonPos: LinkButtonRectPos) =>
      dispatch(setLinkBackgroundPosition(buttonPos)),
    [dispatch]
  );

  // If the link is active => get the background component form NavLinkBackground at the bounding rects position
  useEffect(() => {
    if (active && iconWrapperRef.current) {
      // Gets x and y from the wrappers position
      const { x, y } = iconWrapperRef.current.getBoundingClientRect();
      // Sets the NavLinkBackground components position to the wrappers coordinates
      setButtonBackgroundPosition({ x, y });
    }
  }, [active, setButtonBackgroundPosition]);

  return (
    <IconWrapper
      ref={iconWrapperRef}
      active={active}
      hover={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => path && navigate(path)}
    >
      {icon}
    </IconWrapper>
  );
};

const IconWrapper = styled.div<{ active?: boolean; hover: boolean }>`
  ${({ active, hover }) => css`
    transition: ease-in all 0.1s;
    transition-delay: ${active ? "0.25s" : 0};
    padding: 10px;
    color: ${active ? "white" : "#18a189"};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    border-radius: 20px;
    opacity: ${active || hover ? 1 : 0.4};
    cursor: pointer;
    z-index: 1000;
  `}
`;

export default NavLink;
