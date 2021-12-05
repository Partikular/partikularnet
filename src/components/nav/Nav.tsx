import styled from "styled-components";
import NavLinks from "./NavLinks";

const Nav = () => {
  return (
    <Wrapper>
      <Logo src="/assets/logo.png" alt="" />
      <NavLinks />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
  top: 60px;
  align-self: center;
  position: absolute;
`;

export default Nav;
