import styled from "styled-components";
import NavLinks from "./NavLinks";
import { SignOutAlt as Logout } from "@styled-icons/fa-solid/SignOutAlt";
import { auth } from "../../lib/firebase";
import toast from "react-hot-toast";

import LinkBackground from "./NavLinkBackground";

const Nav = () => {
  const handleLogout = () => {
    auth.signOut();
    toast.success("Du är nu utloggad. Vi ses igen!", {
      icon: "🙈",
      style: { fontWeight: "600" },
    });
  };

  return (
    <Wrapper>
      <Logo src="/assets/logo.png" alt="" />
      <NavLinks />
      <LogoutWrapper onClick={handleLogout}>
        <Logout size={40} />
      </LogoutWrapper>
      <LinkBackground />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const LogoutWrapper = styled.div`
  transition: all ease-in-out 0.1s;
  position: absolute;
  bottom: 60px;
  align-self: center;
  color: #18a18950;
  cursor: pointer;
  &:hover {
    color: #18a189;
  }
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
  top: 60px;
  align-self: center;
  position: absolute;
`;

export default Nav;
