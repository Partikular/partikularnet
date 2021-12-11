import React from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";

import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
import { Article } from "@styled-icons/material-rounded/Article";
import { MessageSquareDetail as Chat } from "@styled-icons/boxicons-solid/MessageSquareDetail";
import { Settings } from "@styled-icons/fluentui-system-filled/Settings";
import { InsertChart as Stats } from "@styled-icons/material-rounded/InsertChart";
import NavLink from "./NavLink";

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
`;

export default NavLinks;
