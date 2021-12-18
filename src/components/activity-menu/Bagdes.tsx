import React, { useRef, useState } from "react";

import styled from "styled-components";
import { Quill } from "@styled-icons/icomoon/Quill";

const Badges = () => {
  const badges = [
    {
      icon: "Quill",
      info: "För att ha skrivit en artikel för Partikular",
    },
    {
      icon: "+1",
      info: "För att ha varit medlem i över ett år",
    },
    {
      icon: "+1",
      info: "För att ha varit medlem i över ett år",
    },
    {
      icon: "+1",
      info: "För att ha varit medlem i över ett år",
    },
    {
      icon: "Quill",
      info: "För att ha varit medlem i över ett år",
    },
    {
      icon: "+1",
      info: "För att ha varit medlem i över ett år",
    },
  ];

  const badgesRef = useRef<any>(null);

  const mouseDownHandler = (e: any) => {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = (e: any) => {
    const rect = badgesRef.current.getBoundingClientRect();
    const x = rect.right - e.clientX;
    console.log(x);

    // Scroll the element
    console.log(badgesRef.current.scrollLeft);
    badgesRef.current.scrollLeft = x;
  };

  const mouseUpHandler = (e: any) => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  return (
    <BadgesContainer ref={badgesRef} onMouseDown={mouseDownHandler}>
      {badges.map((badge) => (
        <Badge icon={badge.icon} info={badge.info} />
      ))}
    </BadgesContainer>
  );
};

const BadgesContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  cursor: grab;
  user-select: none;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface BadgeProps {
  icon: string;
  info: string;
}

const Badge: React.FC<BadgeProps> = ({ icon, info }) => {
  if (icon === "Quill") {
    return (
      <BadgeContainer>
        <Quill size={30} />
      </BadgeContainer>
    );
  } else return <BadgeContainer> {icon} </BadgeContainer>;
};

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  min-width: 60px;
  background: white;
  color: #18a189;
  font-size: 26px;
  font-weight: bold;
  border-radius: 10px;
  margin-right: 10px;
`;

export default Badges;
