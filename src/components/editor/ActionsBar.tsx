import styled from "styled-components";
import { ArticleContentItem } from "../../types/db";
import { Logo } from "../common";

const ActionsBar: React.FC = ({ children }) => {
  return (
    <Container>
      <Logo src="/assets/logo.png" style={{ marginRight: 20 }} />
      {children}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 10px;
  width: 100%;
  position: fixed;
  background: white;
  height: 80px;
  z-index: 1;
  box-shadow: 0 5px 20px 1px #e1efee;
  display: flex;
  align-items: center;
`;

export default ActionsBar;
