import styled from "styled-components";

interface CardProps {
  header?: boolean;
  headerTitle?: string;
  headerSubText?: string;
  dividers?: boolean;
}

const Card: React.FC<CardProps> = (props, { header }) => {
  return <CardContainer>{props.children}</CardContainer>;
};

const CardContainer = styled.div`
  background: white;
  box-shadow: 0 5px 20px 1px #e1efee;
  padding: 20px;
  border-radius: 20px;
`;

export default Card;
