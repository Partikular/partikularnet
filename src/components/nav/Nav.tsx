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
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
  margin-top: 60px;
  align-self: center;
`;

export default Nav;
