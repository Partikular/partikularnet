import { useState } from "react";

import styled, { css } from "styled-components";
import { ChevronRight } from "@styled-icons/heroicons-outline/ChevronRight";
import ProfileCard from "./ProfileCard";

interface ActivityMenuProps {
  user: any;
  uid: string;
  // TODO: set better userData type
  userData: any;
}

const ActivityMenu: React.FC<ActivityMenuProps> = ({ user, uid, userData }) => {
  const [isOpen, setIsOpen] = useState(true);
  console.log(user);
  return (
    <Wrapper isOpen={isOpen}>
      <Button
        isOpen={isOpen}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <ChevronRight
          style={{
            transform: isOpen ? "" : "rotate(180deg)",
            transition: "ease-in-out all 0.3s",
          }}
          size={40}
        />
      </Button>
      <ContentContainer>
        <ProfileCard
          profileImgSrc={user.photoURL}
          username={user.displayName}
          role={userData?.role}
        />
      </ContentContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    transition: ease-in-out all 0.3s;
    position: relative;
    height: 100%;
    margin-right: ${isOpen ? 0 : -350}px;
    width: 350px;
    background: #18a189;
    justify-self: right;
    z-index: 0;
    border-top-right-radius: 20px;
  `}
`;

const Button = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    transition: ease-in-out all 0.3s;
    position: absolute;
    height: 50px;
    width: 50px;
    background: #18a189;
    top: 0;
    left: ${isOpen ? -25 : -50}px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  `}
`;

const ContentContainer = styled.div`
  padding: 30px;
`;

export default ActivityMenu;
