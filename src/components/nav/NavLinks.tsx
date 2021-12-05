import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";

import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
import { Article } from "@styled-icons/material-rounded/Article";
import { MessageSquareDetail as Chat } from "@styled-icons/boxicons-solid/MessageSquareDetail";
import { Settings } from "@styled-icons/fluentui-system-filled/Settings";
import { InsertChart as Stats } from "@styled-icons/material-rounded/InsertChart";

const NavLinks = () => {
  const currentPath = useLocation().pathname;

  const links = [
    {
      path: "/",
      icon: <Dashboard size={50} />,
    },
    {
      path: "/artikelvyn",
      icon: <Article size={50} />,
    },
    {
      path: "/statistik",
      icon: <Stats size={50} />,
    },
    {
      path: "/meddelanden",
      icon: <Chat size={50} />,
    },
    {
      path: "/installningar",
      icon: <Settings size={50} />,
    },
  ];
  return (
    <LinksWrapper>
      {links.map((link, i) => {
        return (
          <NavLink
            key={i.toString()}
            path={link.path}
            icon={link.icon}
            active={currentPath === link.path ?? true}
          />
        );
      })}
    </LinksWrapper>
  );
};

const LinksWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

interface NavLinkProps {
  icon: React.ReactElement;
  path: string;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, path, active }) => {
  const [isHovering, setIsHovering] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };

  return (
    <IconWrapper
      active={active}
      hover={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => handleNavigate()}
    >
      {icon}
    </IconWrapper>
  );
};

const IconWrapper = styled.div<{ active: boolean; hover: boolean }>`
  ${({ active, hover }) => css`
    transition: ease-in-out all 0.1s;
    padding: 10px;
    color: ${active ? "white" : "#18a189"};
    background: ${active ? "#18a189" : "white"};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    border-radius: 20px;
    opacity: ${active || hover ? 1 : 0.4};
    box-shadow: ${active && "0 5px 20px 1px #18a18850"};
  `}
`;

export default NavLinks;
